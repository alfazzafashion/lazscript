"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@marionebl/is");
const AggregateError = require("aggregate-error");
const hexRgb = require("hex-rgb");
const XRESOURCES_KEY = [
    "background",
    "colorBD",
    "cursorColor",
    "foreground",
    "color0",
    "color1",
    "color2",
    "color3",
    "color4",
    "color5",
    "color6",
    "color7",
    "color8",
    "color9",
    "color10",
    "color11",
    "color12",
    "color13",
    "color14",
    "color15",
];
const EXACT_HEX_MATCH = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
const LINE_MATCH = /(?:\r\n|\r|\n)/g;
function xresources(raw) {
    if (!is_1.default.string(raw) || is_1.default.emptyOrWhitespace(raw)) {
        throw new TypeError(`xresources: input must be non-empty string`);
    }
    const data = parse(raw);
    const [error, n] = normalize(data);
    if (error) {
        throw error;
    }
    return {
        0: n.color0,
        1: n.color1,
        2: n.color2,
        3: n.color3,
        4: n.color4,
        5: n.color5,
        6: n.color6,
        7: n.color7,
        8: n.color8,
        9: n.color9,
        10: n.color10,
        11: n.color11,
        12: n.color12,
        13: n.color13,
        14: n.color14,
        15: n.color15,
        background: n.background,
        bold: n.colorBD,
        cursor: n.cursorColor,
        text: n.foreground,
    };
}
exports.xresources = xresources;
function parse(raw) {
    if (!is_1.default.string(raw)) {
        return {};
    }
    const lines = raw
        .split(LINE_MATCH)
        .filter(Boolean)
        .filter((line) => line.charAt(0) !== '!');
    return lines.reduce((acc, line) => {
        const segments = line
            .split(':')
            .filter(Boolean)
            .map((s) => s.trim());
        if (segments.length !== 2) {
            return acc;
        }
        const [rawKey, value] = segments;
        const keySegments = rawKey.split('.');
        const key = keySegments[keySegments.length - 1];
        acc[key] = value;
        return acc;
    }, {});
}
function normalize(data) {
    if (is_1.default.empty(data)) {
        return [new TypeError(`xresources: input must be non-empty config`), null];
    }
    const errors = XRESOURCES_KEY
        .map(key => {
        if (!(key in data)) {
            return new TypeError(`xresources: missing "${key}"`);
        }
        const val = data[key];
        if (!is_1.default.string(val)) {
            return new TypeError(`xresources: "${key}" must be string, received "${typeof val}"`);
        }
        if (!val.match(EXACT_HEX_MATCH)) {
            return new TypeError(`xresources: expected "${key}" to be hex color, received "${val}"`);
        }
    })
        .filter(Boolean);
    if (errors.length > 0) {
        return [new AggregateError(errors), null];
    }
    return [
        null,
        {
            background: hexRgb(data.background),
            colorBD: hexRgb(data.colorBD),
            cursorColor: hexRgb(data.cursorColor),
            foreground: hexRgb(data.foreground),
            color0: hexRgb(data.color0),
            color1: hexRgb(data.color1),
            color2: hexRgb(data.color2),
            color3: hexRgb(data.color3),
            color4: hexRgb(data.color4),
            color5: hexRgb(data.color5),
            color6: hexRgb(data.color6),
            color7: hexRgb(data.color7),
            color8: hexRgb(data.color8),
            color9: hexRgb(data.color9),
            color10: hexRgb(data.color10),
            color11: hexRgb(data.color11),
            color12: hexRgb(data.color12),
            color13: hexRgb(data.color13),
            color14: hexRgb(data.color14),
            color15: hexRgb(data.color15),
        },
    ];
}
