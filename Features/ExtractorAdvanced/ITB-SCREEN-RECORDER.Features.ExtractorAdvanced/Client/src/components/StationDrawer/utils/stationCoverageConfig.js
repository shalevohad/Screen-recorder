// Client/src/components/StationDrawer/utils/stationCoverageConfig.js

/**
 * Station recording coverage percentage thresholds for traffic-light health status.
 */
export const COVERAGE_THRESHOLDS = {
    // 95% and above (without significant gaps) - Optimal green
    optimalMinPct: 95,
    // 70% to 94% - Warning amber (minor gaps or partial coverage)
    warningMinPct: 70,
    // Below 70% - Critical rose (critical missing intervals)
};

/**
 * Evaluates traffic-light health level for a station based on coverage percentage and gap status.
 * 
 * @param {number} coveragePct - Percentage of time covered (0-100).
 * @param {boolean} hasGaps - Whether recording has detected internal gaps.
 * @param {typeof COVERAGE_THRESHOLDS} [thresholds=COVERAGE_THRESHOLDS] - Custom threshold levels.
 * @returns {{ level: 'optimal'|'warning'|'critical', color: string, label: string, badgeClass: string }}
 */
export function evaluateTrafficLight(coveragePct, hasGaps, thresholds = COVERAGE_THRESHOLDS) {
    if (coveragePct >= thresholds.optimalMinPct && !hasGaps) {
        return {
            level: 'optimal',
            color: '#10b981',
            label: 'FULL',
            badgeClass: 'status-optimal'
        };
    }

    if (coveragePct >= thresholds.warningMinPct) {
        return {
            level: 'warning',
            color: '#f59e0b',
            label: 'PARTIAL',
            badgeClass: 'status-warning'
        };
    }

    return {
        level: 'critical',
        color: '#f43f5e',
        label: 'CRITICAL',
        badgeClass: 'status-critical'
    };
}