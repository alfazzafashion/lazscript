"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@marionebl/is");
const ini_1 = require("ini");
const AggregateError = require("aggregate-error");
const hexRgb = require("hex-rgb");
const REMINNA_KEYS = [
    'background',
    'colorBD',
    'cursor',
    'foreground',
    'color0',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color14',
    'color15'
];
const EXACT_HEX_MATCH = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
const HEX_MATCH = /= (#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{6})/g;
exports.remmina = createParser('remmina', {
    group: 'ssh_colors',
    wrap: true
});
function createParser(name, opts) {
    const normalize = createNormalizer(name, { group: opts.group });
    return (raw) => {
        if (!is_1.default.string(raw) || is_1.default.emptyOrWhitespace(raw)) {
            throw new TypeError(`${name}: input must be non-empty string`);
        }
        // Wrap hex colors in quotes
        const input = opts.wrap ? raw.replace(HEX_MATCH, '= "$1"') : raw;
        const data = ini_1.decode(input);
        const [err, n] = normalize(data);
        if (err) {
            throw err;
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
            bold: n.bold,
            cursor: n.cursor,
            text: n.foreground,
            background: n.background
        };
    };
}
exports.createParser = createParser;
function createNormalizer(name, opts) {
    return function normalize(raw) {
        if (is_1.default.empty(raw)) {
            throw new TypeError(`${name}: input must be non-empty colors`);
        }
        if (!(opts.group in raw)) {
            throw new TypeError(`${name}: expected ${opts.group} group in colorscheme`);
        }
        const data = raw[opts.group];
        if (is_1.default.empty(data)) {
            throw new TypeError(`${name}: input must be non-empty colors, ${opts.group} was empty`);
        }
        const errors = [];
        REMINNA_KEYS
            .filter((key) => {
            if (!(key in data)) {
                errors.push(new TypeError(`${name}: missing "${key}"`));
                return false;
            }
            return true;
        })
            .filter((key) => {
            const val = data[key];
            if (!is_1.default.string(val)) {
                errors.push(new TypeError(`${name}: expected "${key}" to be string, received "${typeof val}"`));
                return false;
            }
            return true;
        })
            .filter((key) => {
            const val = data[key];
            if (!val.match(EXACT_HEX_MATCH)) {
                errors.push(new TypeError(`${name}: expected "${key}" to be hex color, received "${val}"`));
                return false;
            }
            return true;
        });
        if (errors.length > 0) {
            return [new AggregateError(errors), null];
        }
        return [null, {
                color0: toRgb(data.color0),
                color1: toRgb(data.color1),
                color2: toRgb(data.color2),
                color3: toRgb(data.color3),
                color4: toRgb(data.color4),
                color5: toRgb(data.color5),
                color6: toRgb(data.color6),
                color7: toRgb(data.color7),
                color8: toRgb(data.color8),
                color9: toRgb(data.color9),
                color10: toRgb(data.color10),
                color11: toRgb(data.color11),
                color12: toRgb(data.color12),
                color13: toRgb(data.color13),
                color14: toRgb(data.color14),
                color15: toRgb(data.color15),
                background: toRgb(data.background),
                bold: toRgb(data.colorBD),
                cursor: toRgb(data.cursor),
                foreground: toRgb(data.foreground)
            }];
    };
}
function toRgb(input) {
    return hexRgb(input);
}
