"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const is_1 = require("@marionebl/is");
const AggregateError = require("aggregate-error");
const { parse } = require("plist");
const { parseBuffer } = require("bplist-parser");
const { terminal: terminalDefaults } = require("terminal-default-colors");
const ADDITIONAL_DEFAULTS = {
    BackgroundColor: { rgb: [255, 255, 255] },
    TextBoldColor: { rgb: [0, 0, 0] },
    CursorColor: { rgb: [146, 146, 146] },
    CursorTextColor: { rgb: [0, 0, 0] },
    TextColor: { rgb: [0, 0, 0] }
};
function terminal(input) {
    if (!is_1.default.string(input) || is_1.default.emptyOrWhitespace(input)) {
        throw new TypeError(`terminal: input must be non-empty string`);
    }
    const raw = parse(input);
    if (!is_1.default.plainObject(raw)) {
        if (is_1.default.array(raw) && raw.length === 0) {
            throw new TypeError(`terminal: input must be non-empty p-list, received []`);
        }
        throw new TypeError(`expected type object, received ${is_1.default(raw)}`);
    }
    return {
        0: toRGB(raw.ANSIBlackColor, "black"),
        1: toRGB(raw.ANSIRedColor, "red"),
        2: toRGB(raw.ANSIGreenColor, "green"),
        3: toRGB(raw.ANSIYellowColor, "yellow"),
        4: toRGB(raw.ANSIBlueColor, "blue"),
        5: toRGB(raw.ANSIMagentaColor, "magenta"),
        6: toRGB(raw.ANSICyanColor, "cyan"),
        7: toRGB(raw.ANSIWhiteColor, "white"),
        8: toRGB(raw.ANSIBrightBlackColor, "brightBlack"),
        9: toRGB(raw.ANSIBrightRedColor, "brightRed"),
        10: toRGB(raw.ANSIBrightGreenColor, "brightGreen"),
        11: toRGB(raw.ANSIBrightYellowColor, "brightYellow"),
        12: toRGB(raw.ANSIBrightBlueColor, "brightBlue"),
        13: toRGB(raw.ANSIBrightMagentaColor, "brightMagenta"),
        14: toRGB(raw.ANSIBrightCyanColor, "brightCyan"),
        15: toRGB(raw.ANSIBrightWhiteColor, "brightWhite"),
        background: toRGB(raw.BackgroundColor, "BackgroundColor"),
        bold: toRGB(raw.TextBoldColor, "TextBoldColor"),
        cursor: toRGB(raw.CursorColor, "CursorColor"),
        text: toRGB(raw.TextColor, "TextColor")
    };
}
exports.terminal = terminal;
/** Convert a NSArchiver base64-encoded Buffer containing NSColor to TermSchemeColor  */
function toRGB(archive, name) {
    if (is_1.default.undefined(archive)) {
        const defaultColor = terminalDefaults.colors.find((c) => c.name === name) || ADDITIONAL_DEFAULTS[name];
        if (!defaultColor) {
            throw new TypeError(`Missing ${name}`);
        }
        return defaultColor.rgb;
    }
    if (!is_1.default.buffer(archive)) {
        throw new TypeError(`NSArchiver archive must be buffer, was ${is_1.default(archive)}`);
    }
    const [err, result] = parseBplist(archive);
    if (err) {
        throw new AggregateError([
            new TypeError(`Parsing ${name} failed`),
            err
        ]);
    }
    if (!Array.isArray(result)) {
        throw new TypeError(`Unexpected archive type in ${name}: ${is_1.default(result)}`);
    }
    if (result.length === 0) {
        throw new TypeError(`Unexpected zero length archive in ${name}`);
    }
    const [value] = result;
    if (!("$objects" in value)) {
        throw new TypeError(`Missing $objects key in ${name}`);
    }
    const objects = value["$objects"];
    if (!Array.isArray(objects)) {
        throw new TypeError(`Unexpected $objects type of ${name}: ${is_1.default(result)}`);
    }
    if (objects.length < 1) {
        throw new TypeError(`Unexpected $objects length ${result.length} of ${name}`);
    }
    const color = objects[1];
    return parseNSColor(color, name);
}
function parseBplist(input) {
    try {
        return [null, parseBuffer(input)];
    }
    catch (err) {
        return [err, null];
    }
}
function parseNSColor(color, name) {
    switch (color.NSColorSpace) {
        case 1:
        case 2: {
            return color.NSRGB.toString()
                .replace("\u0000", "")
                .split(" ")
                .map((item) => parseFloat(item))
                .map((num) => Math.round(num * 255));
        }
        case 3: {
            const val = parseFloat(String(color.NSWhite));
            const result = Math.round(val * 255);
            return [result, result, result];
        }
        default:
            throw new TypeError(`Unknown NSColorSpace ${color.NSColorSpace} in color ${name}: ${util.inspect(color)}`);
    }
}
