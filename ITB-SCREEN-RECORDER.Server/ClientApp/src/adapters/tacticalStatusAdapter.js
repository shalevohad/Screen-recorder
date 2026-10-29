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
 * Translates station activity state (OFFLINE / REC / STANDBY / MONITOR ONLY).
 * Preserves operational rule: REC receives pulsing indicator, critical red reserved for communication failures.
 * 
 * @param {Object} station - Workstation telemetry snapshot.
 * @param {boolean} station.isOnline - Connectivity status.
 * @param {boolean} station.isStreaming - Video streaming activity.
 * @param {string} [recordingDuration=''] - Formatted duration string.
 * @returns {BadgeConfig} Tactical badge visual properties.
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

    if (station.isRecording) {
        const timeText = recordingDuration ? ` ${recordingDuration}` : '';
        return {
            variant: 'danger',
            label: `REC${timeText}`,
            pulse: true,
            ariaLabel: `Recording active${timeText}`
        };
    }

    if (station.isStreaming) {
        return {
            variant: 'warning',
            label: 'MONITOR ONLY',
            pulse: false,
            ariaLabel: 'Station streaming live in monitor-only mode, not recording'
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
 * Returns dedicated badge configuration for dropped frames.
 * Displayed adjacent to recording badge only when frame drops are detected.
 * 
 * @param {number} [droppedFrames=0] - Total dropped frames count.
 * @returns {BadgeConfig | null} Badge config or null if zero drops.
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
 * Translates WASAPI audio status to appropriate inspector badge.
 * 
 * @param {boolean} hasAudio - Whether audio track is captured.
 * @returns {BadgeConfig} Badge configuration object.
 */
export function getAudioStatusBadgeConfig(hasAudio = false) {
    return {
        variant: hasAudio ? 'success' : 'neutral',
        label: hasAudio ? 'ONLINE' : 'MUTED',
        pulse: false,
        ariaLabel: `Audio stream is ${hasAudio ? 'online' : 'muted'}`
    };
}