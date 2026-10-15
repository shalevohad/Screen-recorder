#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/agent"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"

# Optional argument for server IP/Host
SERVER_HOST=""
for arg in "$@"; do
    case "$arg" in
        --server=*)
            SERVER_HOST="${arg#*=}"
            ;;
        --server|-s)
            SERVER_HOST="$2"
            ;;
    esac
done

if [ -z "$SERVER_HOST" ] && [ -t 0 ]; then
    read -p "Enter Central Server IP/Hostname [127.0.0.1]: " input_host
    SERVER_HOST="${input_host:-127.0.0.1}"
fi

echo "--> Stopping running agent services if any..."
systemctl stop itb-agent.service 2>/dev/null || true

echo "--> Deploying application files to $INSTALL_ROOT..."
mkdir -p "$INSTALL_ROOT/service" "$INSTALL_ROOT/worker" "/var/lib/itb-screen-recorder/certificates"
cp -r "$CURRENT_DIR/service/"* "$INSTALL_ROOT/service/"
cp -r "$CURRENT_DIR/worker/"* "$INSTALL_ROOT/worker/"

# Configure server endpoints with encryption (HTTPS / RTMPS)
if [ -n "$SERVER_HOST" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Configuring agent encryption endpoints for server: $SERVER_HOST..."
    for json_file in "$INSTALL_ROOT/service/appsettings.json" "$INSTALL_ROOT/worker/appsettings.json"; do
        if [ -f "$json_file" ]; then
            python3 - <<EOF
import json
try:
    with open("$json_file", "r", encoding="utf-8") as f:
        cfg = json.load(f)
    cfg["DashboardApiUrl"] = "https://$SERVER_HOST:5090/api/v1/agent/telemetry"
    cfg["RtmpServerBaseUrl"] = "rtmps://$SERVER_HOST:19350/live/"
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