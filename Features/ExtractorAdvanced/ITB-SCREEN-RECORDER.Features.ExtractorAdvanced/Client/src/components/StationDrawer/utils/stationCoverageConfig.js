// Client/src/components/StationDrawer/utils/stationCoverageConfig.js

/**
 * ספי הכיסוי באחוזים לשיטת הרמזור (ניתנים לשינוי והתאמה מערכתית)
 */
export const COVERAGE_THRESHOLDS = {
    // 95% ומעלה (ללא פערים משמעותיים) - ירוק
    optimalMinPct: 95,
    // 70% עד 94% - צהוב (פערים קלים/תקינות חלקית)
    warningMinPct: 70,
    // מתחת ל-70% - אדום (פערים קריטיים)
};

/**
 * קובע את רמת הרמזור עבור עמדה לפי אחוז הכיסוי וקיום פערים
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