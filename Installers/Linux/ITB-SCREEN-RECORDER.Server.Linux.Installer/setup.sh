#!/bin/bash
set -e

echo "=== Deploying ITB Server Container via Podman ==="

# בדיקת קיום Podman
if ! command -v podman &> /dev/null; then
    echo "Error: Podman is not installed on this system."
    exit 1
fi

CURRENT_DIR="$(dirname "$(readlink -f "$0")")"
QUADLET_DIR="/etc/containers/systemd"
CONFIG_DIR="/etc/itb-server"
DATA_DIR="/var/lib/itb-server/data"

echo "--> Stopping previous instance if running..."
systemctl stop itb-server.service 2>/dev/null || true
podman stop itb-server 2>/dev/null || true
podman rm itb-server 2>/dev/null || true

echo "--> Building offline local Podman image (itb-screenrecorder-server:latest)..."
podman build -t itb-screenrecorder-server:latest -f "$CURRENT_DIR/Containerfile" "$CURRENT_DIR"

echo "--> Creating storage & configuration directories..."
mkdir -p "$DATA_DIR"
mkdir -p "$CONFIG_DIR"
mkdir -p "$QUADLET_DIR"

if [ -f "$CURRENT_DIR/server/appsettings.json" ] && [ ! -f "$CONFIG_DIR/appsettings.json" ]; then
    cp "$CURRENT_DIR/server/appsettings.json" "$CONFIG_DIR/appsettings.json"
fi

echo "--> Registering Systemd Quadlet..."
cp "$CURRENT_DIR/itb-server.container" "$QUADLET_DIR/"

echo "--> Reloading Systemd daemons..."
systemctl daemon-reload
systemctl enable itb-server.service
systemctl restart itb-server.service

echo "=== ITB Server Container deployed and running successfully! ==="
podman ps -f name=itb-server
exit 0