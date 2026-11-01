#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/agent"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"

# Optional arguments for server IP/Host and Discovery configuration
SERVER_HOST=""
DISCOVERY_PORT=5098
DISCOVERY_MULTICAST="239.210.1.5"
DISCOVERY_BROADCAST="255.255.255.255"

for arg in "$@"; do
    case "$arg" in
        --server=*)
            SERVER_HOST="${arg#*=}"
            ;;
        --server|-s)
            SERVER_HOST="$2"
            ;;
        --discovery-port=*)
            DISCOVERY_PORT="${arg#*=}"
            ;;
        --discovery-multicast=*)
            DISCOVERY_MULTICAST="${arg#*=}"
            ;;
        --discovery-broadcast=*)
            DISCOVERY_BROADCAST="${arg#*=}"
            ;;
    esac
done

if [ -z "$SERVER_HOST" ] && [ -t 0 ]; then
    read -p "Enter Central Server IP/Hostname (Default: AUTO for Autonomous Discovery) [AUTO]: " input_host
    SERVER_HOST="${input_host:-AUTO}"
    if [ "${SERVER_HOST^^}" = "AUTO" ]; then
        read -p "Enter Discovery UDP Port [$DISCOVERY_PORT]: " input_port
        DISCOVERY_PORT="${input_port:-$DISCOVERY_PORT}"
        read -p "Enter Discovery Multicast Group Address [$DISCOVERY_MULTICAST]: " input_mcast
        DISCOVERY_MULTICAST="${input_mcast:-$DISCOVERY_MULTICAST}"
    fi
fi
SERVER_HOST="${SERVER_HOST:-AUTO}"

echo "--> Stopping running agent services if any..."
systemctl stop itb-agent.service 2>/dev/null || true

echo "--> Deploying application files to $INSTALL_ROOT..."
mkdir -p "$INSTALL_ROOT/service" "$INSTALL_ROOT/worker" "/var/lib/itb-screen-recorder/certificates"
cp -r "$CURRENT_DIR/service/"* "$INSTALL_ROOT/service/"
cp -r "$CURRENT_DIR/worker/"* "$INSTALL_ROOT/worker/"

# Configure server endpoints and discovery settings with encryption (HTTPS / RTMPS)
if [ -n "$SERVER_HOST" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Configuring agent encryption endpoints (Mode: $SERVER_HOST, DiscoveryPort: $DISCOVERY_PORT, Multicast: $DISCOVERY_MULTICAST)..."
    for json_file in "$INSTALL_ROOT/service/appsettings.json" "$INSTALL_ROOT/service/appsettings.Linux.json" "$INSTALL_ROOT/worker/appsettings.json" "$INSTALL_ROOT/worker/appsettings.Linux.json"; do
        if [ -f "$json_file" ]; then
            python3 - <<EOF
import json
try:
    with open("$json_file", "r", encoding="utf-8") as f:
        cfg = json.load(f)

    srv = "$SERVER_HOST".strip()
    if srv.upper() == "AUTO" or not srv:
        cfg["DashboardApiUrl"] = "AUTO"
        cfg["RtmpServerBaseUrl"] = "AUTO"
    else:
        host_only = srv.split(':')[0]
        cfg["DashboardApiUrl"] = f"https://{host_only}:5090/api/v1/agent/telemetry"
        cfg["RtmpServerBaseUrl"] = f"rtmps://{host_only}:19350/live/"

    cfg["DiscoveryPort"] = int("$DISCOVERY_PORT")
    cfg["DiscoveryMulticastAddress"] = "$DISCOVERY_MULTICAST"
    cfg["DiscoveryBroadcastAddress"] = "$DISCOVERY_BROADCAST"

    with open("$json_file", "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)
except Exception:
    pass
EOF
        fi
    done
fi

echo "--> Applying execution permissions to binaries..."
chmod +x "$INSTALL_ROOT/service/ITB-SCREEN-RECORDER.AgentService"
chmod +x "$INSTALL_ROOT/worker/ITB-SCREEN-RECORDER.AgentWorker"
chmod 755 "/var/lib/itb-screen-recorder/certificates"

if [ -f "$INSTALL_ROOT/worker/ffmpeg" ]; then
    chmod +x "$INSTALL_ROOT/worker/ffmpeg"
fi

echo "--> Registering Systemd daemon..."
cp "$CURRENT_DIR/itb-agent.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-agent.service
systemctl restart itb-agent.service