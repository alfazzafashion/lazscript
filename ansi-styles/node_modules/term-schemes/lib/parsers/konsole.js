"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const is_1 = require("@marionebl/is");
const ini_1 = require("ini");
const AggregateError = require("aggregate-error");
const KONSOLE_KEYS = [
    'Color0',
    'Color0Intense',
    'Color1',
    'Color1Intense',
    'Color2',
    'Color3Intense',
    'Color4',
    'Color4Intense',
    'Color5',
    'Color5Intense',
    'Color6',
    'Color6Intense',
    'Color7',
    'Color7Intense',
    'Background',
    'Foreground'
];
function konsole(input) {
    if (!is_1.default.string(input) || is_1.default.emptyOrWhitespace(input)) {
        throw new TypeError(`konsole: input must be non-empty string`);
    }
    const data = ini_1.decode(input);
    const [err, n] = normalize(data);
    if (err) {
        throw err;
    }
    return {
        1: n.Color1,
        0: n.Color0,
        2: n.Color2,
        3: n.Color3,
        4: n.Color4,
        5: n.Color5,
        6: n.Color6,
        7: n.Color7,
        8: n.Color0Intense,
        9: n.Color1Intense,
        10: n.Color2Intense,
        11: n.Color3Intense,
        12: n.Color4Intense,
        13: n.Color5Intense,
        14: n.Color6Intense,
        15: n.Color7Intense,
        bold: n.Foreground,
        cursor: n.Foreground,
        text: n.Foreground,
        background: n.Background
    };
}
exports.konsole = konsole;
function normalize(data) {
    if (is_1.default.empty(data)) {
        throw new TypeError(`konsole: input must be non-empty colorscheme`);
    }
    const errors = [];
    KONSOLE_KEYS
        .filter((key) => {
        if (!(key in data)) {
            errors.push(new TypeError(`konsole: missing "${key}"`));
            return false;
        }
        return true;
    })
        .filter((key) => {
        const val = data[key];
        if (!is_1.default.plainObject(val)) {
            errors.push(new TypeError(`konsole: expected "${key}" to be object, received "${typeof val}"`));
            return false;
        }
        if (!('Color' in val)) {
            errors.push(new TypeError(`konsole: missing "Color" in "${key}", received "${util_1.inspect(val)}"`));
            return false;
        }
        return true;
    })
        .filter((key) => {
        const val = data[key].Color;
        const fragments = val.split(',');
        if (fragments.length !== 3) {
            errors.push(new TypeError(`konsole: expected "${key}" to be comma-separated rgb, received "${val}"`));
            return false;
        }
        const nums = fragments.map((f) => Number(f));
        if (nums.length !== 3) {
            errors.push(new TypeError(`konsole: expected "${key}" to be comma-separated rgb, received "${val}"`));
            return false;
        }
        const invalid = nums.filter((n) => !is_1.default.inRange(n, 255));
        if (invalid.length > 0) {
            errors.push(new TypeError(`konsole: expected "${key}" to be comma-separated rgb, received "${val}"`));
            return false;
        }
    });
    if (errors.length > 0) {
        return [new AggregateError(errors), null];
    }
    return [null, {
            Color0: toRgb(data.Color0.Color),
            Color0Intense: toRgb(data.Color0Intense.Color),
            Color1: toRgb(data.Color1.Color),
            Color1Intense: toRgb(data.Color1Intense.Color),
            Color2: toRgb(data.Color2.Color),
            Color2Intense: toRgb(data.Color2Intense.Color),
            Color3: toRgb(data.Color3.Color),
            Color3Intense: toRgb(data.Color3Intense.Color),
            Color4: toRgb(data.Color4.Color),
            Color4Intense: toRgb(data.Color4Intense.Color),
            Color5: toRgb(data.Color5.Color),
            Color5Intense: toRgb(data.Color5Intense.Color),
            Color6: toRgb(data.Color6.Color),
            Color6Intense: toRgb(data.Color6Intense.Color),
            Color7: toRgb(data.Color7.Color),
            Color7Intense: toRgb(data.Color7Intense.Color),
            Background: toRgb(data.Background.Color),
            Foreground: toRgb(data.Foreground.Color)
        }];
}
function toRgb(input) {
    const f = input.split(',').map((i) => Number(i));
    return [f[0], f[1], f[2]];
}
