// ==========================================
// File: Installers/Windows/ITB-SCREEN-RECORDER.Server.Installer/PreloadSettings.js
// ==========================================
try {
    var fso = new ActiveXObject("Scripting.FileSystemObject");

    var candidateDirs = [];

    // 1. בדיקת ספריית התקנה קודמת שאותרה על ידי ComponentSearch
    var prevInstall = "";
    try {
        prevInstall = Session.Property("PREVIOUS_INSTALLFOLDER");
    } catch (e) { }
    if (prevInstall && prevInstall.length > 0) {
        candidateDirs.push(prevInstall);
    }

    // 2. בדיקת ה-INSTALLFOLDER המוגדר כעת
    var currInstall = "";
    try {
        currInstall = Session.Property("INSTALLFOLDER");
    } catch (e) { }
    if (currInstall && currInstall.length > 0) {
        candidateDirs.push(currInstall);
    }

    // 3. ברירת מחדל תקנית
    candidateDirs.push("C:\\Program Files\\ITB-ScreenRecorder-Server\\");

    for (var i = 0; i < candidateDirs.length; i++) {
        var dir = candidateDirs[i];
        if (!dir || dir.length === 0) continue;

        if (dir.charAt(dir.length - 1) !== "\\" && dir.charAt(dir.length - 1) !== "/") {
            dir += "\\";
        }

        var files = [dir + "appsettings.Windows.json", dir + "appsettings.json"];
        var found = false;

        for (var j = 0; j < files.length; j++) {
            var filePath = files[j];
            if (fso.FileExists(filePath)) {
                var file = fso.OpenTextFile(filePath, 1);
                var text = file.ReadAll();
                file.Close();

                // שליפת פורט HTTPS / HTTP
                var mHttp = text.match(/"HttpPort"\s*:\s*(\d+)/i) || text.match(/https?:\/\/0\.0\.0\.0:(\d+)/i);
                if (mHttp && mHttp[1]) Session.Property("HTTP_PORT") = mHttp[1];

                // שליפת פורטי MediaMTX
                var mRtmp = text.match(/"RtmpPort"\s*:\s*(\d+)/i);
                if (mRtmp && mRtmp[1]) Session.Property("RTMP_PORT") = mRtmp[1];

                var mApi = text.match(/"ApiPort"\s*:\s*(\d+)/i);
                if (mApi && mApi[1]) Session.Property("API_PORT") = mApi[1];

                var mHls = text.match(/"HlsPort"\s*:\s*(\d+)/i);
                if (mHls && mHls[1]) Session.Property("HLS_PORT") = mHls[1];

                // שליפת נתיב האחסון הראשי (DATA_DIR)
                var mData = text.match(/"LocalFallbackPath"\s*:\s*"([^"]+)"/i) || text.match(/"BaseDirectory"\s*:\s*"([^"]+)"/i);
                if (mData && mData[1]) {
                    var cleanPath = mData[1].replace(/\\\\/g, "\\");
                    cleanPath = cleanPath.replace(/\\(Recordings|Data)$/i, "");
                    Session.Property("DATA_DIR") = cleanPath;
                }

                // שליפת תפקיד ועדיפות של השרת
                var mRole = text.match(/"Role"\s*:\s*"([^"]+)"/i);
                if (mRole && mRole[1]) {
                    var rVal = mRole[1];
                    if (/aggregate|aggrigate|agg|super/i.test(rVal)) Session.Property("SERVER_ROLE") = "Aggregate";
                    else if (/secondary|standby|sec|backup/i.test(rVal)) Session.Property("SERVER_ROLE") = "Secondary";
                    else Session.Property("SERVER_ROLE") = "Primary";
                }

                var mPriority = text.match(/"Priority"\s*:\s*(\d+)/i);
                if (mPriority && mPriority[1]) Session.Property("SERVER_PRIORITY") = mPriority[1];

                // שליפת פורט ומולטיקאסט של Discovery
                var mDiscPort = text.match(/"Port"\s*:\s*(\d+)/i);
                if (mDiscPort && mDiscPort[1]) Session.Property("DISCOVERY_PORT") = mDiscPort[1];

                var mMcast = text.match(/"MulticastAddress"\s*:\s*"([^"]+)"/i);
                if (mMcast && mMcast[1]) Session.Property("DISCOVERY_MULTICAST") = mMcast[1];

                // שליפת הגדרות Virtual IP (VIP) ו-Partner URL
                var mVip = text.match(/"VirtualIp"\s*:\s*"([^"]+)"/i);
                if (mVip && mVip[1]) Session.Property("VIRTUAL_IP") = mVip[1];

                var mEnVip = text.match(/"EnableVirtualIp"\s*:\s*(true|false)/i);
                if (mEnVip && mEnVip[1]) Session.Property("ENABLE_VIP") = (mEnVip[1].toLowerCase() === "true" ? "1" : "0");

                var mPartner = text.match(/"PartnerServerUrl"\s*:\s*"([^"]+)"/i);
                if (mPartner && mPartner[1]) Session.Property("PARTNER_URL") = mPartner[1];

                // עדכון INSTALLFOLDER לנתיב שנמצא בו הקונפיגורציה
                Session.Property("INSTALLFOLDER") = dir;

                found = true;
                break;
            }
        }
        if (found) break;
    }

    // 4. אם מדובר בהתקנה נקייה - ביצוע גילוי רשתי אוטונומי לאיתור שרת Primary קיים
    if (!found) {
        try {
            var shell = new ActiveXObject("WScript.Shell");
            var psScript = "$u=New-Object Net.Sockets.UdpClient; $u.Client.ReceiveTimeout=1200; " +
                "$p=[Text.Encoding]::UTF8.GetBytes('{\"magic\":\"ITB_DISCOVERY_PROBE\"}'); " +
                "$u.Send($p,$p.Length,'239.255.10.90',5098); $u.Send($p,$p.Length,'255.255.255.255',5098); " +
                "$e=New-Object Net.IPEndPoint([Net.IPAddress]::Any,0); " +
                "$r=$u.Receive([ref]$e); [Text.Encoding]::UTF8.GetString($r)";

            var exec = shell.Exec("powershell.exe -NoProfile -ExecutionPolicy Bypass -Command \"" + psScript + "\"");
            var output = exec.StdOut.ReadAll();

            if (output && output.indexOf("ITB_DISCOVERY_RESPONSE") !== -1) {
                var mRole = output.match(/"role"\s*:\s*"([^"]+)"/i);
                if (mRole && mRole[1].toLowerCase() === "primary") {
                    // זוהה שרת Primary פעיל ברשת - מצרפים את השרת הנוכחי כ-Secondary!
                    Session.Property("SERVER_ROLE") = "Secondary";
                    Session.Property("SERVER_PRIORITY") = "2";

                    var mIp = output.match(/"serverIps"\s*:\s*\[\s*"([^"]+)"/i);
                    if (mIp && mIp[1]) {
                        Session.Property("PARTNER_URL") = "http://" + mIp[1] + ":5090";
                    }

                    var mDiscVip = output.match(/"virtualIp"\s*:\s*"([^"]+)"/i);
                    if (mDiscVip && mDiscVip[1]) {
                        Session.Property("VIRTUAL_IP") = mDiscVip[1];
                        Session.Property("ENABLE_VIP") = "1";
                    }
                }
            }
        } catch (probeErr) {
            // אם הבדיקה נכשלה, נשמרים ערכי ברירת המחדל
        }
    }
} catch (err) {
    // בהתקנה נקייה ישמרו ערכי ברירת המחדל
}