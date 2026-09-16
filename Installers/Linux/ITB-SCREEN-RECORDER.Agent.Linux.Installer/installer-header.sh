#!/bin/bash
set -e

echo "============================================="
echo "  ITB Screen Recorder Agent - Linux Setup"
echo "============================================="

if [ "$EUID" -ne 0 ]; then
    echo "Error: Installation requires root privileges. Please run with sudo."
    exit 1
fi

TMP_DIR=$(mktemp -d /tmp/itb-agent-setup.XXXXXX)
ARCHIVE_LINE=$(awk '/^__PAYLOAD_BEGINS__/ {print NR + 1; exit 0; }' "$0")

echo "==> Extracting installer payload..."
tail -n +$ARCHIVE_LINE "$0" | tar -xz -C "$TMP_DIR"

echo "==> Running deployment engine..."
chmod +x "$TMP_DIR/setup.sh"
bash "$TMP_DIR/setup.sh"

echo "==> Cleaning temporary cache..."
rm -rf "$TMP_DIR"

echo "=== Agent installation completed successfully! ==="
exit 0

__PAYLOAD_BEGINS__