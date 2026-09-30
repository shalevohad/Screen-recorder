#!/bin/bash
set -e

INSTALL_ROOT="/opt/itb-screen-recorder/server"
CURRENT_DIR="$(dirname "$(readlink -f "$0")")"
CONFIG_DIR="/etc/itb-screen-recorder"
FEATURES_SRC_DIR="$CURRENT_DIR/features"
FEATURES_DEST_DIR="$INSTALL_ROOT/Features"

# בדיקת דגלי התקנה שקטה לפי כל המוסכמות המקובלות בלינוקס
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

if [ "$IS_UNATTENDED" = true ]; then
    echo "--> Running in UNATTENDED / SILENT mode. Accepting all defaults."
fi

# נתיבי ברירת מחדל תקניים
DATA_DIR="/var/lib/itb-screen-recorder/data"
EXPORTS_DIR="/var/lib/itb-screen-recorder/exports"
RECORDINGS_DIR="/var/lib/itb-screen-recorder/recordings"
NETAPP_MOUNT="/mnt/netapp/capturerecordings"
LOGS_DIR="/var/log/itb-screen-recorder"

# --- תפריט אינטראקטיבי לבחירת נתיבים (מופעל רק במצב רגיל) ---
if [ "$IS_UNATTENDED" = false ]; then
    echo ""
    echo "Default storage & database layout:"
    echo "  • Database Data:       $DATA_DIR"
    echo "  • Export Archives:     $EXPORTS_DIR"
    echo "  • Local Fallback:      $RECORDINGS_DIR"
    echo "  • NetApp Mount:        $NETAPP_MOUNT"
    echo "  • Server Logs:         $LOGS_DIR"
    echo ""

    read -p "Do you want to customize these storage paths? [y/N]: " customize_choice
    case "$customize_choice" in
        y|Y|[yY][eE][sS])
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
            echo "--> Proceeding with standard default paths."
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

TARGET_CONFIG="$CONFIG_DIR/appsettings.json"
if [ ! -f "$TARGET_CONFIG" ] && [ -n "$CONFIG_SOURCE" ]; then
    cp "$CONFIG_SOURCE" "$TARGET_CONFIG"
fi

# עדכון הנתיבים שנבחרו בתוך קובץ ה-JSON
if [ -f "$TARGET_CONFIG" ] && command -v python3 >/dev/null 2>&1; then
    echo "--> Syncing storage paths into $TARGET_CONFIG..."
    python3 - <<EOF
import json

config_path = "$TARGET_CONFIG"
try:
    with open(config_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    cfg.setdefault("Database", {})["BaseDirectory"] = "$DATA_DIR"
    cfg.setdefault("Extractor", {})["ExportPath"] = "$EXPORTS_DIR"

    sys_cfg = cfg.setdefault("SystemConfig", {})
    storage = sys_cfg.setdefault("Storage", {})
    storage["NetAppUncPath"] = "$NETAPP_MOUNT"
    storage["LocalFallbackPath"] = "$RECORDINGS_DIR"
    storage["ChunkEventLogPath"] = "$LOGS_DIR/chunk-events.log"

    app_cfg = cfg.setdefault("AppConfig", {})
    app_cfg["LogFilePath"] = "$LOGS_DIR/server.log"

    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2, ensure_ascii=False)
except Exception as ex:
    print(f"Warning: Could not automatically sync paths into JSON: {ex}")
EOF
fi

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

# הרשאות ריצה עבור כלי Linux המובנים (ffprobe ו-mediamtx תחת Tools/Linux)
if [ -d "$INSTALL_ROOT/Tools/Linux" ]; then
    chmod +x "$INSTALL_ROOT/Tools/Linux/ffprobe" 2>/dev/null || true
    chmod +x "$INSTALL_ROOT/Tools/Linux/mediamtx" 2>/dev/null || true
fi

# הרשאות ריצה עבור MediaMTX בתיקיית היעד MediaMTX/
if [ -f "$INSTALL_ROOT/MediaMTX/mediamtx" ]; then
    chmod +x "$INSTALL_ROOT/MediaMTX/mediamtx"
elif [ -f "$INSTALL_ROOT/mediamtx" ]; then
    chmod +x "$INSTALL_ROOT/mediamtx"
fi

# הרשאות ריצה עבור תוכנות עזר במודולים (כגון FFmpeg ב-Extractor)
if [ -d "$FEATURES_DEST_DIR" ]; then
    find "$FEATURES_DEST_DIR" -type f \( -name "ffmpeg" -o -name "ffprobe" -o -executable \) -exec chmod +x {} + 2>/dev/null || true
fi

echo "--> Registering and starting Systemd service..."
cp "$CURRENT_DIR/itb-server.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable itb-server.service
systemctl restart itb-server.service

echo ""
echo "=== ITB Server & Features successfully installed and active! ==="
exit 0