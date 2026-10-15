// ==========================================
// File: Features/ExtractorAdvanced/Client/src/utils/virtualKeyMap.js
// ==========================================

/**
 * מילון מקיף לכלל מקשי המקלדת (Virtual Key Codes 0–255)
 * כולל מקשים סטנדרטיים, מקשי עריכה וניווט, מקשי Numpad, פונקציות F1-F24,
 * מקשי מדיה, דפדפן ומקשי פיסוק וסימנים מיוחדים (OEM).
 */
export const VK_MAP = {
    // עכבר ומקשי שליטה
    1: 'LButton',
    2: 'RButton',
    3: 'Cancel',
    4: 'MButton',
    5: 'XButton1',
    6: 'XButton2',
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Esc',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    41: 'Select',
    42: 'Print',
    43: 'Execute',
    44: 'Print Screen',
    45: 'Insert',
    46: 'Delete',
    47: 'Help',

    // ספרות עליונות (0-9)
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
    53: '5', 54: '6', 55: '7', 56: '8', 57: '9',

    // אותיות לטיניות (A-Z)
    65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F',
    71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L',
    77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R',
    83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X',
    89: 'Y', 90: 'Z',

    // מקשי מערכת / Windows
    91: 'Win',
    92: 'RWin',
    93: 'Apps',
    95: 'Sleep',

    // Numpad
    96: 'Num 0',
    97: 'Num 1',
    98: 'Num 2',
    99: 'Num 3',
    100: 'Num 4',
    101: 'Num 5',
    102: 'Num 6',
    103: 'Num 7',
    104: 'Num 8',
    105: 'Num 9',
    106: 'Num *',
    107: 'Num +',
    108: 'Separator',
    109: 'Num -',
    110: 'Num .',
    111: 'Num /',

    // מקשי פונקציה (F1 - F24)
    112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4',
    116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8',
    120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
    124: 'F13', 125: 'F14', 126: 'F15', 127: 'F16',
    128: 'F17', 129: 'F18', 130: 'F19', 131: 'F20',
    132: 'F21', 133: 'F22', 134: 'F23', 135: 'F24',

    // נעילות
    144: 'Num Lock',
    145: 'Scroll Lock',

    // מקשי Modifiers פרטניים (שמאל וימין)
    160: 'Shift',
    161: 'RShift',
    162: 'Ctrl',
    163: 'RCtrl',
    164: 'Alt',
    165: 'RAlt',

    // מקשי דפדפן
    166: 'Browser Back',
    167: 'Browser Forward',
    168: 'Browser Refresh',
    169: 'Browser Stop',
    170: 'Browser Search',
    171: 'Browser Favorites',
    172: 'Browser Home',

    // מקשי שליטה במדיה ועוצמת שמע
    173: 'Mute',
    174: 'Vol -',
    175: 'Vol +',
    176: 'Next Track',
    177: 'Prev Track',
    178: 'Stop',
    179: 'Play/Pause',
    180: 'Mail',
    181: 'Media Select',
    182: 'App 1',
    183: 'App 2',

    // מקשי פיסוק וסימנים מיוחדים (OEM)
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: "'",
    226: '\\'
};

/**
 * מנרמל חלק בודד בצירוף מקשים
 */
export function normalizeKeyPart(part) {
    if (!part) return '';
    const trimmed = part.trim();

    // בדיקת תבנית Key(XXX)
    const match = trimmed.match(/^Key\((\d+)\)$/i);
    if (match) {
        const code = parseInt(match[1], 10);
        return VK_MAP[code] || `Key(${code})`;
    }

    // נרמול שמות Modifiers
    const lower = trimmed.toLowerCase();
    if (lower === 'ctrl' || lower === 'control') return 'Ctrl';
    if (lower === 'shift') return 'Shift';
    if (lower === 'alt') return 'Alt';
    if (lower === 'win' || lower === 'windows') return 'Win';
    if (lower === 'rctrl') return 'Ctrl';
    if (lower === 'rshift') return 'Shift';
    if (lower === 'ralt') return 'Alt';
    if (lower === 'backspace') return 'Backspace';
    if (lower === 'enter' || lower === 'return') return 'Enter';
    if (lower === 'escape' || lower === 'esc') return 'Esc';
    if (lower === 'space') return 'Space';
    if (lower === 'delete' || lower === 'del') return 'Delete';
    if (lower === 'capslock' || lower === 'caps lock') return 'Caps Lock';

    return trimmed;
}

/**
 * מפרק צירוף מקשים ומסיר כפילויות (למשל: Ctrl+Key(162) -> ['Ctrl'])
 */
export function parseKeyCombination(rawCombo) {
    if (!rawCombo || typeof rawCombo !== 'string') return [];

    const parts = rawCombo.split('+').map(p => p.trim()).filter(Boolean);
    const normalized = parts.map(normalizeKeyPart);

    // הסרת כפילויות תוך שמירה על סדר המקשים
    const seen = new Set();
    const result = [];

    for (const k of normalized) {
        if (!k) continue;
        if (!seen.has(k)) {
            seen.add(k);
            result.push(k);
        }
    }

    return result;
}

/**
 * מחזיר מחרוזת נקייה, מעוצבת וקריאה של צירוף המקשים
 * @param {string} rawCombo 
 * @param {string} joiner ברירת מחדל: ' + '
 */
export function cleanKeyCombination(rawCombo, joiner = ' + ') {
    const keys = parseKeyCombination(rawCombo);
    return keys.join(joiner);
}

/**
 * עזר ייעודי לתגיות ו-Badges בציר הזמן (חיבור קומפקטי ללא רווחים)
 */
export function cleanKeyName(rawKey) {
    return cleanKeyCombination(rawKey, '+');
}
