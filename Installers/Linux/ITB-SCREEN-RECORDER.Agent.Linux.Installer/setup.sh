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

echo "--> Deploying FFmpeg RPM dependency..."
RPM_PKG=$(find "$CURRENT_DIR/packages" -name "*.rpm" | head -n 1)
if [ -n "$RPM_PKG" ] && [ -f "$RPM_PKG" ]; then
    rpm -Uvh --replacepkgs --nodeps "$RPM_PKG" || true
fi

echo "--> Setting up FFmpeg symlinks for AgentWorker..."
FFMPEG_SYS=$(command -v ffmpeg || echo "/usr/bin/ffmpeg")
FFPROBE_SYS=$(command -v ffprobe || echo "/usr/bin/ffprobe")

if [ -f "$FFMPEG_SYS" ]; then
    ln -sf "$FFMPEG_SYS" "$INSTALL_ROOT/worker/ffmpeg"
    ln -sf "$FFPROBE_SYS" "$INSTALL_ROOT/worker/ffprobe"
    echo "Linked $FFMPEG_SYS -> $INSTALL_ROOT/worker/ffmpeg"
else
    echo "Warning: FFmpeg binary not found in system paths."
fi

chmod +x "$INSTALL_ROOT/service/ITB-SCREEN-RECORDER.AgentService"
chmod +x "$INSTALL_ROOT/worker/ITB-SCREEN-RECORDER.AgentWorker"

echo "--> Registering Systemd daemon..."
cp "$CURRENT_DIR/itb-agent.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-agent.service
systemctl restart itb-agent.service