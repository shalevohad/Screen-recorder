/**
 * @typedef {'neutral' | 'info' | 'success' | 'warning' | 'critical'} BadgeVariant
 * 
 * @typedef {Object} BadgeConfig
 * @property {BadgeVariant} variant
 * @property {string} label
 * @property {boolean} pulse
 * @property {string} ariaLabel
 */

/**
 * מתרגם את מצב הפעילות של העמדה (OFFLINE / REC / STANDBY)
 * שמירה על עיקרון מבצעי: REC מקבל info פועם, אדום נשמר לתקלות תקשורת בלבד.
 * 
 * @param {Object} station
 * @param {boolean} station.isOnline
 * @param {boolean} station.isStreaming
 * @param {string} [recordingDuration='']
 * @returns {BadgeConfig}
 */
export function getStationTacticalBadgeConfig(station, recordingDuration = '') {
    if (!station || !station.isOnline) {
        return {
            variant: 'critical',
            label: 'OFFLINE',
            pulse: false,
            ariaLabel: 'Station is offline'
        };
    }

    if (station.isStreaming) {
        const timeText = recordingDuration ? ` ${recordingDuration}` : '';
        return {
            variant: 'info',
            label: `REC${timeText}`,
            pulse: true,
            ariaLabel: `Recording active${timeText}`
        };
    }

    return {
        variant: 'neutral',
        label: 'STANDBY',
        pulse: false,
        ariaLabel: 'Station is in standby'
    };
}

/**
 * מחזיר קונפיגורציית Badge ייעודית עבור איבודי פריימים (Drops)
 * מופיע לצד באדג' ההקלטה אך ורק כאשר קיימים drops בפועל.
 * 
 * @param {number} [droppedFrames=0]
 * @returns {BadgeConfig | null}
 */
export function getDropFramesBadgeConfig(droppedFrames = 0) {
    if (!droppedFrames || droppedFrames <= 0) {
        return null;
    }

    const isCritical = droppedFrames > 5;

    return {
        variant: isCritical ? 'critical' : 'warning',
        label: `DROP: ${droppedFrames}`,
        pulse: false,
        ariaLabel: `${isCritical ? 'Critical warning' : 'Warning'}: ${droppedFrames} dropped frames detected`
    };
}

/**
 * מתרגם סטטוס שמע (WASAPI) לתגית מתאימה ב-Inspector
 * 
 * @param {boolean} hasAudio
 * @returns {BadgeConfig}
 */
export function getAudioStatusBadgeConfig(hasAudio = false) {
    return {
        variant: hasAudio ? 'success' : 'neutral',
        label: hasAudio ? 'ONLINE' : 'MUTED',
        pulse: false,
        ariaLabel: `Audio stream is ${hasAudio ? 'online' : 'muted'}`
    };
}