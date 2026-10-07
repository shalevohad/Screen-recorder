#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/server"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"
CONFIG_DIR="/etc/itb-screen-recorder"
TARGET_CONFIG="$CONFIG_DIR/appsettings.json"
FEATURES_SRC_DIR="$CURRENT_DIR/features"
FEATURES_DEST_DIR="$INSTALL_ROOT/Features"

# בדיקת דגלי התקנה שקטה
IS_UNATTENDED=false
for arg in "$@"; do
    case "$arg" in
        --silent|-s|--quiet|-q|--unattended|--non-interactive|-y|--yes)
            IS_UNATTENDED=true
            break
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
    db_cfg = cfg.get("Database", {})
    extractor_cfg = cfg.get("Extractor", {})
    app_cfg = cfg.get("AppConfig", {})

    kestrel_url = cfg.get("Kestrel", {}).get("Endpoints", {}).get("Http", {}).get("Url", "")
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

    print(f"HTTP_PORT={http_p}")
    print(f"RTMP_PORT={rtmp_p}")
    print(f"API_PORT={api_p}")
    print(f"HLS_PORT={hls_p}")
    print(f"DATA_DIR='{data_d}'")
    print(f"EXPORTS_DIR='{exports_d}'")
    print(f"RECORDINGS_DIR='{rec_d}'")
    print(f"NETAPP_MOUNT='{netapp_m}'")
    print(f"LOGS_DIR='{logs_d}'")
except Exception:
    pass
EOF
)"
fi

# 💡 2. תפריט אינטראקטיבי להתאמת פורטים ונתיבים
if [ "$IS_UNATTENDED" = false ]; then
    echo ""
    echo "Current Configuration Layout:"
    echo "  [Network Ports]"
    echo "  • HTTP Dashboard Port: $HTTP_PORT"
    echo "  • MediaMTX RTMP Port:  $RTMP_PORT"
    echo "  • MediaMTX API Port:   $API_PORT"
    echo "  • MediaMTX HLS Port:   $HLS_PORT"
    echo ""
    echo "  [Storage & Data Layout]"
    echo "  • Database Data:       $DATA_DIR"
    echo "  • Export Archives:     $EXPORTS_DIR"
    echo "  • Local Recordings:    $RECORDINGS_DIR"
    echo "  • NetApp Mount:        $NETAPP_MOUNT"
    echo "  • Server Logs:         $LOGS_DIR"
    echo ""

    read -p "Do you want to customize network ports or paths? [y/N]: " customize_choice
    case "$customize_choice" in
        y|Y|[yY][eE][sS])
            echo ""
            echo "--- Network Configuration ---"
            read -p "  Enter HTTP Dashboard Port [$HTTP_PORT]: " custom_val
            HTTP_PORT="${custom_val:-$HTTP_PORT}"

            read -p "  Enter MediaMTX RTMP Port [$RTMP_PORT]: " custom_val
            RTMP_PORT="${custom_val:-$RTMP_PORT}"

            read -p "  Enter MediaMTX API Port [$API_PORT]: " custom_val
            API_PORT="${custom_val:-$API_PORT}"

            read -p "  Enter MediaMTX HLS Port [$HLS_PORT]: " custom_val
            HLS_PORT="${custom_val:-$HLS_PORT}"

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
            echo "--> Proceeding with current configuration."
            ;;
    esac
fi

echo ""
echo "--> Stopping running server service if active..."
systemctl stop itb-server.service 2>/dev/null || true

echo "--> Provisioning directories..."
mkdir -p "$INSTALL_ROOT" \
         "$CONFIG_DIR" \
         "$DATA_DIR" \
         "$EXPORTS_DIR" \
         "$RECORDINGS_DIR" \
         "$LOGS_DIR" \
         "$NETAPP_MOUNT" \
         "$FEATURES_DEST_DIR"

echo "--> Applying access permissions..."
chmod 755 "$CONFIG_DIR"
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

    # 1. Kestrel Port
    cfg.setdefault("Kestrel", {}).setdefault("Endpoints", {}).setdefault("Http", {})["Url"] = "http://0.0.0.0:$HTTP_PORT"

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