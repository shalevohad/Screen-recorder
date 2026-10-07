// ==========================================
// File: Installers/Windows/ITB-SCREEN-RECORDER.Server.Installer/ApplySettings.js
// ==========================================
try {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var logPath = "C:\\Windows\\Temp\\itb-server-setup.log";

    function log(msg) {
        try {
            var lf = fso.OpenTextFile(logPath, 8, true);
            lf.WriteLine("[" + new Date().toUTCString() + "] " + msg);
            lf.Close();
        } catch (e) { }
    }

    log("=== Setup Configuration Action Started ===");

    // שליפת הנתונים שהועברו מה-MSI בצורה בטוחה
    var rawData = Session.Property("CustomActionData");
    log("Received CustomActionData: " + rawData);

    if (!rawData) {
        log("ERROR: CustomActionData is empty. Exiting.");
        // לא זורקים שגיאה כדי לא להכשיל את ההתקנה אם הנתונים לא הועברו
    } else {
        var parts = rawData.split("|");
        var installDir = parts[0] || "";
        var httpPort = parts[1] || "5090";
        var rtmpPort = parts[2] || "19350";
        var apiPort = parts[3] || "9997";
        var hlsPort = parts[4] || "8888";
        var dataDir = parts[5] || "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Server";

        // ניקוי לוכסנים עודפים
        while (installDir.length > 0 && (installDir.charAt(installDir.length - 1) === "\\" || installDir.charAt(installDir.length - 1) === "/")) {
            installDir = installDir.substring(0, installDir.length - 1);
        }
        while (dataDir.length > 0 && (dataDir.charAt(dataDir.length - 1) === "\\" || dataDir.charAt(dataDir.length - 1) === "/")) {
            dataDir = dataDir.substring(0, dataDir.length - 1);
        }

        var dataDirJson = dataDir.split("\\").join("\\\\");

        log("Parsed settings: HTTP=" + httpPort + ", RTMP=" + rtmpPort + ", API=" + apiPort + ", HLS=" + hlsPort);
        log("InstallDir: " + installDir);
        log("DataDir: " + dataDir);

        // 1. עדכון קובצי ה-JSON (appsettings.json, appsettings.Windows.json)
        var jsonFiles = [
            installDir + "\\appsettings.json",
            installDir + "\\appsettings.Windows.json"
        ];

        for (var i = 0; i < jsonFiles.length; i++) {
            var jp = jsonFiles[i];
            if (fso.FileExists(jp)) {
                log("Processing JSON file: " + jp);
                var jf = fso.OpenTextFile(jp, 1);
                var content = jf.ReadAll();
                jf.Close();

                // פורט Kestrel
                content = content.replace(/"Url"\s*:\s*"http:\/\/0\.0\.0\.0:\d+"/gi, '"Url": "http://0.0.0.0:' + httpPort + '"');

                // SystemConfig.HttpPort
                if (/"HttpPort"\s*:\s*\d+/i.test(content)) {
                    content = content.replace(/"HttpPort"\s*:\s*\d+/gi, '"HttpPort": ' + httpPort);
                } else {
                    content = content.replace(/("SystemConfig"\s*:\s*\{)/i, '$1\r\n    "HttpPort": ' + httpPort + ',');
                }

                // פורטי MediaMTX
                content = content.replace(/"RtmpPort"\s*:\s*\d+/gi, '"RtmpPort": ' + rtmpPort);
                content = content.replace(/"ApiPort"\s*:\s*\d+/gi, '"ApiPort": ' + apiPort);
                content = content.replace(/"HlsPort"\s*:\s*\d+/gi, '"HlsPort": ' + hlsPort);

                // נתיבי אחסון ודאטה
                content = content.replace(/"LocalFallbackPath"\s*:\s*"[^"]*"/gi, '"LocalFallbackPath": "' + dataDirJson + '\\\\Recordings"');
                content = content.replace(/"BaseDirectory"\s*:\s*"[^"]*"/gi, '"BaseDirectory": "' + dataDirJson + '\\\\Data"');
                content = content.replace(/"ExportPath"\s*:\s*"[^"]*"/gi, '"ExportPath": "' + dataDirJson + '\\\\Exports"');
                content = content.replace(/"ChunkEventLogPath"\s*:\s*"[^"]*"/gi, '"ChunkEventLogPath": "' + dataDirJson + '\\\\Logs\\\\chunk-events.log"');

                var outJ = fso.CreateTextFile(jp, true);
                outJ.Write(content);
                outJ.Close();
                log("Successfully updated " + jp);
            } else {
                log("Skipping (not found): " + jp);
            }
        }

        // 2. עדכון קובץ mediamtx.yml שורה-אחר-שורה
        var yamlCandidates = [
            installDir + "\\MediaMTX\\mediamtx.yml",
            installDir + "\\mediamtx.yml"
        ];

        for (var k = 0; k < yamlCandidates.length; k++) {
            var yp = yamlCandidates[k];
            if (fso.FileExists(yp)) {
                log("Processing YAML file: " + yp);
                var yf = fso.OpenTextFile(yp, 1);
                var yContent = yf.ReadAll();
                yf.Close();

                var lines = yContent.split(/\r?\n/);
                for (var l = 0; l < lines.length; l++) {
                    var line = lines[l];
                    if (/^[ \t]*#?[ \t]*api\s*:/i.test(line) && !/apiAddress/i.test(line) && !/apiAllowOrigins/i.test(line)) {
                        lines[l] = "api: yes";
                    } else if (/^[ \t]*#?[ \t]*apiAddress\s*:/i.test(line)) {
                        lines[l] = "apiAddress: :" + apiPort;
                    } else if (/^[ \t]*#?[ \t]*rtmpAddress\s*:/i.test(line)) {
                        lines[l] = "rtmpAddress: :" + rtmpPort;
                    } else if (/^[ \t]*#?[ \t]*hlsAddress\s*:/i.test(line)) {
                        lines[l] = "hlsAddress: :" + hlsPort;
                    }
                }

                var outY = fso.CreateTextFile(yp, true);
                outY.Write(lines.join("\r\n"));
                outY.Close();
                log("Successfully updated " + yp);
            }
        }

        log("=== Setup Configuration Action Finished Successfully ===");
    }
} catch (ex) {
    try {
        var lfErr = fso.OpenTextFile("C:\\Windows\\Temp\\itb-server-setup.log", 8, true);
        lfErr.WriteLine("[ERROR] Exception occurred: " + ex.message);
        lfErr.Close();
    } catch (e2) { }
}