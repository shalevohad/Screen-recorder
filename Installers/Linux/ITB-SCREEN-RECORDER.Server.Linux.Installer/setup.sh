#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/server"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"
CONFIG_DIR="/etc/itb-server"
DATA_DIR="/var/lib/itb-server/data"
FEATURES_SRC_DIR="$CURRENT_DIR/features"
FEATURES_DEST_DIR="$INSTALL_ROOT/Features"

echo "=== Deploying ITB Server & Modular Features ==="

echo "--> Stopping running server services if any..."
systemctl stop itb-server.service 2>/dev/null || true

echo "--> Creating base directories..."
mkdir -p "$INSTALL_ROOT" "$CONFIG_DIR" "$DATA_DIR" "$FEATURES_DEST_DIR"

echo "--> Deploying central server binaries..."
cp -r "$CURRENT_DIR/server/"* "$INSTALL_ROOT/"

# ניהול קובץ הקונפיגורציה
if [ -f "$CURRENT_DIR/server/appsettings.json" ] && [ ! -f "$CONFIG_DIR/appsettings.json" ]; then
    cp "$CURRENT_DIR/server/appsettings.json" "$CONFIG_DIR/appsettings.json"
fi
ln -sf "$CONFIG_DIR/appsettings.json" "$INSTALL_ROOT/appsettings.json"

# === מנגנון בחירת Features דינמי (בדומה ל-FeatureTree של WiX) ===
if [ -d "$FEATURES_SRC_DIR" ] && [ "$(ls -A "$FEATURES_SRC_DIR")" ]; then
    echo "--------------------------------------------------"
    echo "Modular Features Selection:"
    echo "--------------------------------------------------"

    for feature_path in "$FEATURES_SRC_DIR"/*; do
        if [ -d "$feature_path" ]; then
            feature_name=$(basename "$feature_path")
            
            # אם המשתמש הריץ עם דגל --unattended או --yes, נתקין אוטומטית את הכל
            if [[ " $@ " =~ " --yes " ]] || [[ " $@ " =~ " -y " ]]; then
                install_feature="Y"
            else
                read -p "Do you want to install feature '$feature_name'? [Y/n]: " choice
                choice=${choice:-Y} # ברירת מחדל היא כן
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
else
    echo "--> No modular features found to install."
fi

echo "--> Applying execution permissions..."
chmod +x "$INSTALL_ROOT/ITB-SCREEN-RECORDER.Server"

if [ -f "$INSTALL_ROOT/mediamtx" ]; then
    chmod +x "$INSTALL_ROOT/mediamtx"
fi

# הענקת הרשאות ריצה לכל הבינאריים תחת תיקיית הפיצ'רים (כגון ffmpeg של ה-Extractor)
if [ -d "$FEATURES_DEST_DIR" ]; then
    find "$FEATURES_DEST_DIR" -type f \( -name "ffmpeg" -o -name "ffprobe" -o -executable \) -exec chmod +x {} +
fi

echo "--> Registering Systemd daemon..."
cp "$CURRENT_DIR/itb-server.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-server.service
systemctl restart itb-server.service

echo "=== ITB Server & Features deployed successfully! ==="
exit 0