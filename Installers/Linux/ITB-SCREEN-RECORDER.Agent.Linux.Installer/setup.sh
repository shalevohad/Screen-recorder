#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/agent"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"

echo "--> Stopping running agent services if any..."
systemctl stop itb-agent.service 2>/dev/null || true

echo "--> Deploying application files to $INSTALL_ROOT..."
mkdir -p "$INSTALL_ROOT/service" "$INSTALL_ROOT/worker"
cp -r "$CURRENT_DIR/service/"* "$INSTALL_ROOT/service/"
cp -r "$CURRENT_DIR/worker/"* "$INSTALL_ROOT/worker/"

echo "--> Applying execution permissions to binaries..."
chmod +x "$INSTALL_ROOT/service/ITB-SCREEN-RECORDER.AgentService"
chmod +x "$INSTALL_ROOT/worker/ITB-SCREEN-RECORDER.AgentWorker"

if [ -f "$INSTALL_ROOT/worker/ffmpeg" ]; then
    chmod +x "$INSTALL_ROOT/worker/ffmpeg"
fi

echo "--> Registering Systemd daemon..."
cp "$CURRENT_DIR/itb-agent.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-agent.service
systemctl restart itb-agent.service