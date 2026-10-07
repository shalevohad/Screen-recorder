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

                // שליפת פורט HTTP
                var mHttp = text.match(/"HttpPort"\s*:\s*(\d+)/i) || text.match(/http:\/\/0\.0\.0\.0:(\d+)/i);
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

                // עדכון INSTALLFOLDER לנתיב שנמצא בו הקונפיגורציה
                Session.Property("INSTALLFOLDER") = dir;

                found = true;
                break;
            }
        }
        if (found) break;
    }
} catch (err) {
    // בהתקנה נקייה ישמרו ערכי ברירת המחדל
}