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
        var serverRole = parts[6] || "Active-Active";
        var serverPriority = parts[7] || "1";
        var discPort = parts[8] || "5098";
        var discMcast = parts[9] || "239.255.10.90";
        var enableVip = (parts[10] === "1" || parts[10] === "true");
        var virtualIp = parts[11] || "";
        var partnerUrl = parts[12] || "";
        var vipSubnet = parts[13] || "255.255.255.0";
        var discBcast = parts[14] || "255.255.255.255";
        if (virtualIp.length > 0) enableVip = true;

        // נירמול תפקיד השרת ועדיפות תקנית
        var cleanRole = (serverRole + "").toLowerCase().replace(/^\s+|\s+$/g, "");
        if (cleanRole === "aggregate" || cleanRole === "aggrigate" || cleanRole === "agg" || cleanRole === "super") {
            serverRole = "Aggregate";
            if (serverPriority === "1" || !serverPriority) {
                serverPriority = "0";
            }
        } else if (cleanRole === "standalone" || cleanRole === "single") {
            serverRole = "Standalone";
            if (!serverPriority || serverPriority === "0") {
                serverPriority = "1";
            }
        } else {
            // כלל צמתי האשכול הם Active-Active
            serverRole = "Active-Active";
            if (!serverPriority || serverPriority === "0") {
                serverPriority = "1";
            }
        }

        // ניקוי לוכסנים עודפים
        while (installDir.length > 0 && (installDir.charAt(installDir.length - 1) === "\\" || installDir.charAt(installDir.length - 1) === "/")) {
            installDir = installDir.substring(0, installDir.length - 1);
        }
        while (dataDir.length > 0 && (dataDir.charAt(dataDir.length - 1) === "\\" || dataDir.charAt(dataDir.length - 1) === "/")) {
            dataDir = dataDir.substring(0, dataDir.length - 1);
        }

        var dataDirJson = dataDir.split("\\").join("\\\\");

        log("Parsed settings: HTTP=" + httpPort + ", RTMP=" + rtmpPort + ", API=" + apiPort + ", HLS=" + hlsPort + ", Role=" + serverRole + ", Priority=" + serverPriority + ", DiscPort=" + discPort + ", DiscMcast=" + discMcast);
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

                // פורט Kestrel - שמירה ואכיפה של HTTPS
                content = content.replace(/"Url"\s*:\s*"https?:\/\/0\.0\.0\.0:\d+"/gi, '"Url": "https://0.0.0.0:' + httpPort + '"');
                content = content.replace(/"Endpoints"\s*:\s*\{\s*"Http"\s*:/gi, '"Endpoints": {\r\n      "Https":');

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

                // תפקיד ועדיפות בארכיטקטורת שרתים (Discovery)
                if (/"Role"\s*:\s*"[^"]*"/i.test(content)) {
                    content = content.replace(/"Role"\s*:\s*"[^"]*"/gi, '"Role": "' + serverRole + '"');
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "Role": "' + serverRole + '",');
                }

                if (/"Priority"\s*:\s*\d+/i.test(content)) {
                    content = content.replace(/"Priority"\s*:\s*\d+/gi, '"Priority": ' + serverPriority);
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "Priority": ' + serverPriority + ',');
                }

                // פורט ומולטיקאסט של Discovery
                if (/"Port"\s*:\s*\d+/i.test(content)) {
                    content = content.replace(/"Port"\s*:\s*\d+/gi, '"Port": ' + discPort);
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "Port": ' + discPort + ',');
                }

                if (/"MulticastAddress"\s*:\s*"[^"]*"/i.test(content)) {
                    content = content.replace(/"MulticastAddress"\s*:\s*"[^"]*"/gi, '"MulticastAddress": "' + discMcast + '"');
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "MulticastAddress": "' + discMcast + '",');
                }

                if (/"BroadcastAddress"\s*:\s*"[^"]*"/i.test(content)) {
                    content = content.replace(/"BroadcastAddress"\s*:\s*"[^"]*"/gi, '"BroadcastAddress": "' + discBcast + '"');
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "BroadcastAddress": "' + discBcast + '",');
                }

                // Virtual IP (VIP) and Partner Server URL
                if (/"EnableVirtualIp"\s*:\s*(true|false)/i.test(content)) {
                    content = content.replace(/"EnableVirtualIp"\s*:\s*(true|false)/gi, '"EnableVirtualIp": ' + (enableVip ? "true" : "false"));
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "EnableVirtualIp": ' + (enableVip ? "true" : "false") + ',');
                }

                if (/"VirtualIp"\s*:\s*"[^"]*"/i.test(content)) {
                    content = content.replace(/"VirtualIp"\s*:\s*"[^"]*"/gi, '"VirtualIp": "' + virtualIp + '"');
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "VirtualIp": "' + virtualIp + '",');
                }

                if (/"VirtualIpSubnetMask"\s*:\s*"[^"]*"/i.test(content)) {
                    content = content.replace(/"VirtualIpSubnetMask"\s*:\s*"[^"]*"/gi, '"VirtualIpSubnetMask": "' + vipSubnet + '"');
                } else {
                    content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "VirtualIpSubnetMask": "' + vipSubnet + '",');
                }

                if (partnerUrl && partnerUrl.length > 0) {
                    if (/"PartnerServerUrl"\s*:\s*"[^"]*"/i.test(content)) {
                        content = content.replace(/"PartnerServerUrl"\s*:\s*"[^"]*"/gi, '"PartnerServerUrl": "' + partnerUrl + '"');
                    } else {
                        content = content.replace(/("Discovery"\s*:\s*\{)/i, '$1\r\n      "PartnerServerUrl": "' + partnerUrl + '",');
                    }
                }

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

        // 3. הבטחת ספריית התעודות של ה-Server
        var certsDir = "C:\\ProgramData\\ITB-SCREEN-RECORDER\\Certificates";
        if (!fso.FolderExists(certsDir)) {
            try {
                var pData = "C:\\ProgramData\\ITB-SCREEN-RECORDER";
                if (!fso.FolderExists(pData)) fso.CreateFolder(pData);
                fso.CreateFolder(certsDir);
                log("Created certificates directory: " + certsDir);
            } catch (eCerts) { }
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