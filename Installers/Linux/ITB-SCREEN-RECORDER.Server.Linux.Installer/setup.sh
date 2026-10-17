#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/server"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"
CONFIG_DIR="/etc/itb-screen-recorder"
TARGET_CONFIG="$CONFIG_DIR/appsettings.json"
FEATURES_SRC_DIR="$CURRENT_DIR/features"
FEATURES_DEST_DIR="$INSTALL_ROOT/Features"

# בדיקת דגלי התקנה שקטה ופרמטרים משורת הפקודה
IS_UNATTENDED=false
CLI_ROLE_PASSED=false
DISCOVERY_PORT=5098
DISCOVERY_MULTICAST="239.255.10.90"
DISCOVERY_BROADCAST="${DISCOVERY_BROADCAST:-255.255.255.255}"
ENABLE_VIP=false
VIRTUAL_IP=""
VIRTUAL_IP_SUBNET="255.255.255.0"
NETWORK_INTERFACE=""
PARTNER_URL=""

for arg in "$@"; do
    case "$arg" in
        --silent|-s|--quiet|-q|--unattended|--non-interactive|-y|--yes)
            IS_UNATTENDED=true
            ;;
        --role=*|-r=*)
            CLI_ROLE_PASSED=true
            raw_role="${arg#*=}"
            raw_role_clean="$(echo "$raw_role" | tr '[:upper:]' '[:lower:]' | xargs)"
            case "$raw_role_clean" in
                3|aggregate|aggrigate|agg|super)
                    SERVER_ROLE="Aggregate"
                    SERVER_PRIORITY=0
                    ;;
                2|standalone|single)
                    SERVER_ROLE="Standalone"
                    SERVER_PRIORITY=1
                    ;;
                *)
                    SERVER_ROLE="Active-Active"
                    SERVER_PRIORITY=1
                    ;;
            esac
            ;;
        --priority=*|-p=*)
            SERVER_PRIORITY="${arg#*=}"
            ;;
        --discovery-port=*)
            DISCOVERY_PORT="${arg#*=}"
            ;;
        --discovery-multicast=*)
            DISCOVERY_MULTICAST="${arg#*=}"
            ;;
        --virtual-ip=*|-vip=*)
            VIRTUAL_IP="${arg#*=}"
            ENABLE_VIP=true
            ;;
        --enable-vip)
            ENABLE_VIP=true
            ;;
        --enable-vip=*)
            val="${arg#*=}"
            val_clean="$(echo "$val" | tr '[:upper:]' '[:lower:]')"
            if [ "$val_clean" = "true" ] || [ "$val_clean" = "1" ] || [ "$val_clean" = "yes" ]; then
                ENABLE_VIP=true
            else
                ENABLE_VIP=false
            fi
            ;;
        --virtual-ip-subnet=*)
            VIRTUAL_IP_SUBNET="${arg#*=}"
            ;;
        --network-interface=*)
            NETWORK_INTERFACE="${arg#*=}"
            ;;
        --partner-url=*)
            PARTNER_URL="${arg#*=}"
            ;;
    esac
done

echo "========================================================"
echo "    ITB Screen Recorder Server - Deployment Engine"
echo "========================================================"

# ערכי ברירת מחדל להתקנה נקייה
HTTP_PORT=5090
RTMP_PORT=19350
API_PORT=9997
HLS_PORT=8888

DATA_DIR="/var/lib/itb-screen-recorder/data"
EXPORTS_DIR="/var/lib/itb-screen-recorder/exports"
RECORDINGS_DIR="/var/lib/itb-screen-recorder/recordings"
NETAPP_MOUNT="/mnt/netapp/capturerecordings"
LOGS_DIR="/var/log/itb-screen-recorder"
SERVER_ROLE="${SERVER_ROLE:-Active-Active}"
SERVER_PRIORITY="${SERVER_PRIORITY:-1}"
ENABLE_VIP="${ENABLE_VIP:-false}"
VIRTUAL_IP="${VIRTUAL_IP:-}"
VIRTUAL_IP_SUBNET="${VIRTUAL_IP_SUBNET:-255.255.255.0}"
NETWORK_INTERFACE="${NETWORK_INTERFACE:-}"
PARTNER_URL="${PARTNER_URL:-}"

# 💡 1. טעינת הגדרות קודמות מתוך הקובץ הקיים (שדרוג / התקנה חוזרת - SSOT)
if [ -f "$TARGET_CONFIG" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Existing configuration detected at $TARGET_CONFIG. Preloading active settings..."
    eval "$(python3 - <<EOF
import json
try:
    with open("$TARGET_CONFIG", "r", encoding="utf-8") as f:
        cfg = json.load(f)

    sys_cfg = cfg.get("SystemConfig", {})
    mtx_cfg = sys_cfg.get("MediaMtx", {})
    storage_cfg = sys_cfg.get("Storage", {})
    disc_cfg = sys_cfg.get("Discovery", {})
    db_cfg = cfg.get("Database", {})
    extractor_cfg = cfg.get("Extractor", {})
    app_cfg = cfg.get("AppConfig", {})

    k_endpoints = cfg.get("Kestrel", {}).get("Endpoints", {})
    kestrel_url = k_endpoints.get("Https", {}).get("Url", "") or k_endpoints.get("Http", {}).get("Url", "")
    import re
    m_url = re.search(r':(\d+)', kestrel_url)

    http_p = sys_cfg.get("HttpPort") or (m_url.group(1) if m_url else 5090)
    rtmp_p = mtx_cfg.get("RtmpPort", 19350)
    api_p = mtx_cfg.get("ApiPort", 9997)
    hls_p = mtx_cfg.get("HlsPort", 8888)

    data_d = db_cfg.get("BaseDirectory", "$DATA_DIR")
    exports_d = extractor_cfg.get("ExportPath", "$EXPORTS_DIR")
    rec_d = storage_cfg.get("LocalFallbackPath", "$RECORDINGS_DIR")
    netapp_m = storage_cfg.get("NetAppUncPath", "$NETAPP_MOUNT")
    log_file = app_cfg.get("LogFilePath", "$LOGS_DIR/server.log")
    import os
    logs_d = os.path.dirname(log_file) if log_file else "$LOGS_DIR"

    srv_role_raw = disc_cfg.get("Role", "Active-Active")
    srv_priority = disc_cfg.get("Priority", 1)
    disc_port = disc_cfg.get("Port", 5098)
    disc_mcast = disc_cfg.get("MulticastAddress", "239.255.10.90")
    disc_bcast = disc_cfg.get("BroadcastAddress", "255.255.255.255")
    en_vip = disc_cfg.get("EnableVirtualIp", False)
    vip_addr = disc_cfg.get("VirtualIp", "")
    vip_sub = disc_cfg.get("VirtualIpSubnetMask", "255.255.255.0")
    iface_name = disc_cfg.get("NetworkInterfaceName", "")
    partner_u = disc_cfg.get("PartnerServerUrl", "")

    if re.search(r'aggregate|aggrigate|agg|super', str(srv_role_raw), re.I):
        srv_role = "Aggregate"
    elif re.search(r'standalone|single', str(srv_role_raw), re.I):
        srv_role = "Standalone"
    else:
        srv_role = "Active-Active"

    print(f"HTTP_PORT={http_p}")
    print(f"RTMP_PORT={rtmp_p}")
    print(f"API_PORT={api_p}")
    print(f"HLS_PORT={hls_p}")
    print(f"DATA_DIR='{data_d}'")
    print(f"EXPORTS_DIR='{exports_d}'")
    print(f"RECORDINGS_DIR='{rec_d}'")
    print(f"NETAPP_MOUNT='{netapp_m}'")
    print(f"LOGS_DIR='{logs_d}'")
    print(f"SERVER_ROLE='{srv_role}'")
    print(f"SERVER_PRIORITY={srv_priority}")
    print(f"DISCOVERY_PORT={disc_port}")
    print(f"DISCOVERY_MULTICAST='{disc_mcast}'")
    print(f"DISCOVERY_BROADCAST='{disc_bcast}'")
    print(f"ENABLE_VIP={'true' if en_vip else 'false'}")
    print(f"VIRTUAL_IP='{vip_addr or ''}'")
    print(f"VIRTUAL_IP_SUBNET='{vip_sub or '255.255.255.0'}'")
    print(f"NETWORK_INTERFACE='{iface_name or ''}'")
    print(f"PARTNER_URL='{partner_u or ''}'")
except Exception:
    pass
EOF
)"
# 💡 1.5 אם מדובר בהתקנה נקייה - ביצוע גילוי רשתי אוטונומי לאיתור צבר או שרת Active-Active קיים
elif [ ! -f "$TARGET_CONFIG" ] && [ "$CLI_ROLE_PASSED" != "true" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Running autonomous network discovery probe to check for existing Active-Active cluster..."
    eval "$(python3 - <<EOF
import socket
import json

found_cluster = False
server_ip = ""
virtual_ip = ""
virtual_ip_subnet = "255.255.255.0"

try:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    sock.settimeout(1.2)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

    probe_payload = json.dumps({"magic": "ITB_DISCOVERY_PROBE"}).encode('utf-8')

    try:
        sock.sendto(probe_payload, ("$DISCOVERY_MULTICAST", int("$DISCOVERY_PORT")))
    except Exception:
        pass
    try:
        sock.sendto(probe_payload, ("$DISCOVERY_BROADCAST", int("$DISCOVERY_PORT")))
    except Exception:
        pass

    while True:
        try:
            data, addr = sock.recvfrom(4096)
            resp = json.loads(data.decode('utf-8'))
            if resp.get("magic") == "ITB_DISCOVERY_RESPONSE":
                found_cluster = True
                ips = resp.get("serverIps", [])
                server_ip = ips[0] if ips else addr[0]
                virtual_ip = resp.get("virtualIp", "") or ""
                virtual_ip_subnet = resp.get("virtualIpSubnetMask", "") or "255.255.255.0"
                break
        except socket.timeout:
            break
        except Exception:
            break
    sock.close()
except Exception:
    pass

if found_cluster:
    print("AUTODETECT_CLUSTER=true")
    print("SERVER_ROLE='Active-Active'")
    print("SERVER_PRIORITY=2")
    if server_ip:
        print(f"PARTNER_URL='http://{server_ip}:5090'")
    if virtual_ip:
        print(f"VIRTUAL_IP='{virtual_ip}'")
        print(f"VIRTUAL_IP_SUBNET='{virtual_ip_subnet}'")
        print("ENABLE_VIP=true")
EOF
)"
    if [ "$AUTODETECT_CLUSTER" = "true" ]; then
        echo "  [Discovery] Active cluster node detected on the network!"
        echo "  [Discovery] Joining Active-Active cluster mesh with Partner URL: $PARTNER_URL"
        if [ -n "$VIRTUAL_IP" ]; then
            echo "  [Discovery] Cluster Virtual IP inherited: $VIRTUAL_IP (Subnet: $VIRTUAL_IP_SUBNET)"
        fi
    fi
fi

# 💡 2. תפריט אינטראקטיבי להתאמת תפקיד שרת, פורטים ונתיבים
if [ "$IS_UNATTENDED" = false ]; then
    echo ""
    echo "========================================================"
    echo "  Server Cluster Architecture & Role Selection"
    echo "========================================================"
    echo "  Please specify the role for this server:"
    echo "    1) Active-Active - Distributed multi-node recording cluster (Default)"
    echo "    2) Standalone    - Single independent recording server"
    echo "    3) Aggregate     - Super-Server (Aggregation Studio & Multi-Site Dashboard)"
    echo ""
    read -p "  Select Server Role [1=Active-Active, 2=Standalone, 3=Aggregate] (Current: $SERVER_ROLE): " role_choice

    role_choice_clean="$(echo "${role_choice:-$SERVER_ROLE}" | tr '[:upper:]' '[:lower:]' | xargs)"
    case "$role_choice_clean" in
        1|active*|act*|primary|main)
            SERVER_ROLE="Active-Active"
            if [ "$SERVER_PRIORITY" -eq 0 ] || [ -z "$SERVER_PRIORITY" ]; then
                SERVER_PRIORITY=1
            fi
            ;;
        2|standalone|single|secondary|sec)
            SERVER_ROLE="Standalone"
            if [ "$SERVER_PRIORITY" -eq 0 ] || [ -z "$SERVER_PRIORITY" ]; then
                SERVER_PRIORITY=1
            fi
            ;;
        3|aggregate|aggrigate|agg|super)
            SERVER_ROLE="Aggregate"
            SERVER_PRIORITY=0
            ;;
        *)
            echo "  --> Unrecognized role '$role_choice', keeping current role: $SERVER_ROLE"
            ;;
    esac

    echo ""
    echo "  Configured Role: $SERVER_ROLE (Priority Level: $SERVER_PRIORITY)"
    if [ -n "$PARTNER_URL" ]; then
        echo "  • Partner Peer Server: $PARTNER_URL"
    fi
    if [ "$ENABLE_VIP" = "true" ] && [ -n "$VIRTUAL_IP" ]; then
        echo "  • Cluster Virtual IP (VIP): $VIRTUAL_IP (Subnet: $VIRTUAL_IP_SUBNET)"
    fi
    echo ""
    echo "Current Configuration Layout:"
    echo "  [Network Ports]"
    echo "  • HTTPS Dashboard Port: $HTTP_PORT"
    echo "  • MediaMTX RTMPS Port:  $RTMP_PORT"
    echo "  • MediaMTX API Port:    $API_PORT"
    echo "  • MediaMTX HLS Port:    $HLS_PORT"
    echo ""
    echo "  [Storage & Data Layout]"
    echo "  • Database Data:       $DATA_DIR"
    echo "  • Export Archives:     $EXPORTS_DIR"
    echo "  • Local Recordings:    $RECORDINGS_DIR"
    echo "  • NetApp Mount:        $NETAPP_MOUNT"
    echo "  • Server Logs:         $LOGS_DIR"
    echo ""

    read -p "Do you want to customize network ports, priority level, or storage paths? [y/N]: " customize_choice
    case "$customize_choice" in
        y|Y|[yY][eE][sS])
            echo ""
            echo "--- Network Configuration (Encrypted TLS/PKI) ---"
            read -p "  Enter HTTPS Dashboard Port [$HTTP_PORT]: " custom_val
            HTTP_PORT="${custom_val:-$HTTP_PORT}"

            read -p "  Enter MediaMTX RTMPS Port [$RTMP_PORT]: " custom_val
            RTMP_PORT="${custom_val:-$RTMP_PORT}"

            read -p "  Enter MediaMTX API Port [$API_PORT]: " custom_val
            API_PORT="${custom_val:-$API_PORT}"

            read -p "  Enter MediaMTX HLS Port [$HLS_PORT]: " custom_val
            HLS_PORT="${custom_val:-$HLS_PORT}"

            echo ""
            echo "--- Cluster Architecture & VIP Redundancy ---"
            read -p "  Enter Cluster VIP Election Priority (1 = Preferred VIP Leader, 2+ = Secondary) [$SERVER_PRIORITY]: " custom_val
            SERVER_PRIORITY="${custom_val:-$SERVER_PRIORITY}"

            if [ -n "$PARTNER_URL" ] || [ "$SERVER_ROLE" = "Active-Active" ]; then
                read -p "  Enter Partner Peer Server URL [$PARTNER_URL]: " custom_val
                PARTNER_URL="${custom_val:-$PARTNER_URL}"
            fi

            read -p "  Enable Cluster Virtual IP (VIP)? (y/n) [Current: $ENABLE_VIP]: " custom_vip_choice
            case "$custom_vip_choice" in
                y|Y|[yY][eE][sS]) ENABLE_VIP="true" ;;
                n|N|[nN][oO]) ENABLE_VIP="false" ;;
            esac

            if [ "$ENABLE_VIP" = "true" ]; then
                read -p "  Enter Cluster Virtual IP (VIP) [$VIRTUAL_IP]: " custom_val
                VIRTUAL_IP="${custom_val:-$VIRTUAL_IP}"

                read -p "  Enter VIP Subnet Mask [$VIRTUAL_IP_SUBNET]: " custom_val
                VIRTUAL_IP_SUBNET="${custom_val:-$VIRTUAL_IP_SUBNET}"

                read -p "  Enter Network Interface Name (leave empty for auto) [$NETWORK_INTERFACE]: " custom_val
                NETWORK_INTERFACE="${custom_val:-$NETWORK_INTERFACE}"
            fi

            read -p "  Enter Discovery UDP Port [$DISCOVERY_PORT]: " custom_val
            DISCOVERY_PORT="${custom_val:-$DISCOVERY_PORT}"

            read -p "  Enter Discovery Multicast Group Address [$DISCOVERY_MULTICAST]: " custom_val
            DISCOVERY_MULTICAST="${custom_val:-$DISCOVERY_MULTICAST}"

            echo ""
            echo "--- Storage & Directories ---"
            read -p "  Enter Database Path [$DATA_DIR]: " custom_val
            DATA_DIR="${custom_val:-$DATA_DIR}"

            read -p "  Enter Export Archives Path [$EXPORTS_DIR]: " custom_val
            EXPORTS_DIR="${custom_val:-$EXPORTS_DIR}"

            read -p "  Enter Local Fallback Recordings Path [$RECORDINGS_DIR]: " custom_val
            RECORDINGS_DIR="${custom_val:-$RECORDINGS_DIR}"

            read -p "  Enter NetApp / Remote Mount Path [$NETAPP_MOUNT]: " custom_val
            NETAPP_MOUNT="${custom_val:-$NETAPP_MOUNT}"

            read -p "  Enter Server Logs Path [$LOGS_DIR]: " custom_val
            LOGS_DIR="${custom_val:-$LOGS_DIR}"
            ;;
        *)
            echo "--> Proceeding with configuration."
            ;;
    esac
fi

echo ""
echo "--> Stopping running server service if active..."
systemctl stop itb-server.service 2>/dev/null || true

CERTS_DIR="/var/lib/itb-screen-recorder/certificates"

echo "--> Provisioning directories..."
mkdir -p "$INSTALL_ROOT" \
         "$CONFIG_DIR" \
         "$DATA_DIR" \
         "$EXPORTS_DIR" \
         "$RECORDINGS_DIR" \
         "$LOGS_DIR" \
         "$NETAPP_MOUNT" \
         "$CERTS_DIR" \
         "$FEATURES_DEST_DIR"

echo "--> Applying access permissions..."
chmod 755 "$CONFIG_DIR"
chmod 700 "$CERTS_DIR"
chmod 755 "$DATA_DIR" "$EXPORTS_DIR" "$RECORDINGS_DIR" "$LOGS_DIR"

echo "--> Deploying central server binaries..."
cp -r "$CURRENT_DIR/server/"* "$INSTALL_ROOT/"

# בחירת מקור הקונפיגורציה
CONFIG_SOURCE=""
if [ -f "$CURRENT_DIR/server/appsettings.Linux.json" ]; then
    CONFIG_SOURCE="$CURRENT_DIR/server/appsettings.Linux.json"
elif [ -f "$CURRENT_DIR/server/appsettings.json" ]; then
    CONFIG_SOURCE="$CURRENT_DIR/server/appsettings.json"
fi

if [ ! -f "$TARGET_CONFIG" ] && [ -n "$CONFIG_SOURCE" ]; then
    cp "$CONFIG_SOURCE" "$TARGET_CONFIG"
fi

# 💡 3. עדכון כלל הפורטים והנתיבים בתוך ה-JSON (SSOT)
if [ -f "$TARGET_CONFIG" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Syncing ports and storage paths into $TARGET_CONFIG..."
    python3 - <<EOF
import json

config_path = "$TARGET_CONFIG"
try:
    with open(config_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    # 1. Kestrel Port (Encrypted HTTPS)
    endpoints = cfg.setdefault("Kestrel", {}).setdefault("Endpoints", {})
    endpoints.setdefault("Https", {})["Url"] = "https://0.0.0.0:$HTTP_PORT"
    endpoints.pop("Http", None)

    # 2. SystemConfig Ports
    sys_cfg = cfg.setdefault("SystemConfig", {})
    sys_cfg["HttpPort"] = int("$HTTP_PORT")

    mtx_cfg = sys_cfg.setdefault("MediaMtx", {})
    mtx_cfg["RtmpPort"] = int("$RTMP_PORT")
    mtx_cfg["ApiPort"] = int("$API_PORT")
    mtx_cfg["HlsPort"] = int("$HLS_PORT")

    # 3. Storage & Database Paths
    cfg.setdefault("Database", {})["BaseDirectory"] = "$DATA_DIR"
    cfg.setdefault("Extractor", {})["ExportPath"] = "$EXPORTS_DIR"

    storage = sys_cfg.setdefault("Storage", {})
    storage["NetAppUncPath"] = "$NETAPP_MOUNT"
    storage["LocalFallbackPath"] = "$RECORDINGS_DIR"
    storage["ChunkEventLogPath"] = "$LOGS_DIR/chunk-events.log"

    disc = sys_cfg.setdefault("Discovery", {})
    disc["Role"] = "$SERVER_ROLE"
    disc["Priority"] = int("$SERVER_PRIORITY")
    disc["Port"] = int("$DISCOVERY_PORT")
    disc["MulticastAddress"] = "$DISCOVERY_MULTICAST"
    disc["BroadcastAddress"] = "$DISCOVERY_BROADCAST"
    disc["EnableBroadcastFallback"] = True
    disc["PartnerServerUrl"] = "$PARTNER_URL"
    disc["EnableVirtualIp"] = str("$ENABLE_VIP").lower() in ("true", "1", "yes", "y")
    disc["VirtualIp"] = "$VIRTUAL_IP"
    disc["VirtualIpSubnetMask"] = "$VIRTUAL_IP_SUBNET"
    disc["NetworkInterfaceName"] = "$NETWORK_INTERFACE"

    app_cfg = cfg.setdefault("AppConfig", {})
    app_cfg["LogFilePath"] = "$LOGS_DIR/server.log"

    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2, ensure_ascii=False)
    print("--> Successfully synced JSON settings.")
except Exception as ex:
    print(f"Warning: Could not sync JSON configuration: {ex}")
EOF
fi

# 💡 4. עדכון קובץ mediamtx.yml עם הפורטים שנבחרו
YAML_PATHS=("$INSTALL_ROOT/MediaMTX/mediamtx.yml" "$INSTALL_ROOT/mediamtx.yml")
for ypath in "${YAML_PATHS[@]}"; do
    if [ -f "$ypath" ]; then
        echo "--> Configuring ports in $ypath..."
        python3 - <<EOF
import re

ypath = "$ypath"
try:
    with open(ypath, "r", encoding="utf-8") as f:
        content = f.read()

    # מחיקת כפילויות בראש הקובץ אם הוזרקו בעבר
    lines = content.splitlines()
    cleaned = []
    for i, line in enumerate(lines):
        if i < 10 and (line.strip().startswith("api:") or line.strip().startswith("apiAddress:")):
            continue
        cleaned.append(line)
    content = "\n".join(cleaned)

    content = re.sub(r'(?m)^\s*#?\s*api\s*:.*$', 'api: yes', content)
    content = re.sub(r'(?m)^\s*#?\s*apiAddress\s*:.*$', 'apiAddress: :$API_PORT', content)
    content = re.sub(r'(?m)^\s*#?\s*rtmpAddress\s*:.*$', 'rtmpAddress: :$RTMP_PORT', content)
    content = re.sub(r'(?m)^\s*#?\s*hlsAddress\s*:.*$', 'hlsAddress: :$HLS_PORT', content)

    with open(ypath, "w", encoding="utf-8") as f:
        f.write(content)
    print("--> MediaMTX YAML updated successfully.")
except Exception as e:
    print(f"Warning: Could not configure MediaMTX YAML: {e}")
EOF
    fi
done

# יצירת קישורים סימבוליים עבור שירות השרת
ln -sf "$TARGET_CONFIG" "$INSTALL_ROOT/appsettings.json"
ln -sf "$TARGET_CONFIG" "$INSTALL_ROOT/appsettings.Linux.json"

# === מנגנון בחירת Features דינמי ===
if [ -d "$FEATURES_SRC_DIR" ] && [ "$(ls -A "$FEATURES_SRC_DIR")" ]; then
    echo "--------------------------------------------------"
    echo "Modular Features Selection:"
    echo "--------------------------------------------------"

    for feature_path in "$FEATURES_SRC_DIR"/*; do
        if [ -d "$feature_path" ]; then
            feature_name=$(basename "$feature_path")

            if [ "$IS_UNATTENDED" = true ]; then
                install_feature="Y"
            else
                read -p "Do you want to install feature '$feature_name'? [Y/n]: " choice
                choice=${choice:-Y}
                case "$choice" in
                    y|Y|[yY][eE][sS]) install_feature="Y" ;;
                    *) install_feature="N" ;;
                esac
            fi

            if [ "$install_feature" = "Y" ]; then
                echo "--> Installing feature: $feature_name"
                mkdir -p "$FEATURES_DEST_DIR/$feature_name"
                cp -r "$feature_path/"* "$FEATURES_DEST_DIR/$feature_name/"
            else
                echo "--> Skipping feature: $feature_name"
            fi
        fi
    done
    echo "--------------------------------------------------"
fi

echo "--> Applying binary execution permissions..."
chmod +x "$INSTALL_ROOT/ITB-SCREEN-RECORDER.Server"

# הרשאות ריצה עבור כלי Linux
if [ -d "$INSTALL_ROOT/Tools/Linux" ]; then
    chmod +x "$INSTALL_ROOT/Tools/Linux/ffprobe" 2>/dev/null || true
    chmod +x "$INSTALL_ROOT/Tools/Linux/mediamtx" 2>/dev/null || true
fi

if [ -f "$INSTALL_ROOT/MediaMTX/mediamtx" ]; then
    chmod +x "$INSTALL_ROOT/MediaMTX/mediamtx"
elif [ -f "$INSTALL_ROOT/mediamtx" ]; then
    chmod +x "$INSTALL_ROOT/mediamtx"
fi

if [ -d "$FEATURES_DEST_DIR" ]; then
    find "$FEATURES_DEST_DIR" -type f \( -name "ffmpeg" -o -name "ffprobe" -o -executable \) -exec chmod +x {} + 2>/dev/null || true
fi

echo "--> Registering and starting Systemd service..."
cp "$CURRENT_DIR/itb-server.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-server.service
systemctl restart itb-server.service

echo ""
echo "=== ITB Server & Features successfully installed and active on port $HTTP_PORT! ==="
exit 0