#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-forensic-player"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"

echo "--> Deploying application files to $INSTALL_ROOT..."
mkdir -p "$INSTALL_ROOT"
cp -r "$CURRENT_DIR/bin/"* "$INSTALL_ROOT/"
chmod +x "$INSTALL_ROOT/itb-player" 2>/dev/null || true

echo "--> Creating command-line symlink in /usr/local/bin/itb-player..."
mkdir -p /usr/local/bin
ln -sf "$INSTALL_ROOT/itb-player" /usr/local/bin/itb-player

echo "--> Registering MIME types and desktop shortcuts..."
mkdir -p /usr/share/mime/packages
cp "$CURRENT_DIR/itb-package.xml" /usr/share/mime/packages/
if command -v update-mime-database >/dev/null 2>&1; then
    update-mime-database /usr/share/mime || true
fi

mkdir -p /usr/share/applications
cp "$CURRENT_DIR/itb-forensic-player.desktop" /usr/share/applications/
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database /usr/share/applications || true
fi

echo "--> Installation completed: ITB Forensic Player is ready."
echo "    Run from terminal: itb-player <path-to-archive.tar|path-to-archive.itbp>"
exit 0
