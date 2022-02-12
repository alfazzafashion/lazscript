"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@marionebl/is");
const lodash_1 = require("lodash");
const util_1 = require("util");
const AggregateError = require("aggregate-error");
const { parse } = require("plist");
var Iterm2ColorName;
(function (Iterm2ColorName) {
    Iterm2ColorName["Black"] = "Ansi 0 Color";
    Iterm2ColorName["Red"] = "Ansi 1 Color";
    Iterm2ColorName["Green"] = "Ansi 2 Color";
    Iterm2ColorName["Yellow"] = "Ansi 3 Color";
    Iterm2ColorName["Blue"] = "Ansi 4 Color";
    Iterm2ColorName["Magenta"] = "Ansi 5 Color";
    Iterm2ColorName["Cyan"] = "Ansi 6 Color";
    Iterm2ColorName["White"] = "Ansi 7 Color";
    Iterm2ColorName["LightBlack"] = "Ansi 8 Color";
    Iterm2ColorName["LightRed"] = "Ansi 9 Color";
    Iterm2ColorName["LightGreen"] = "Ansi 10 Color";
    Iterm2ColorName["LightYellow"] = "Ansi 11 Color";
    Iterm2ColorName["LightBlue"] = "Ansi 12 Color";
    Iterm2ColorName["LightMagenta"] = "Ansi 13 Color";
    Iterm2ColorName["LightCyan"] = "Ansi 14 Color";
    Iterm2ColorName["LightWhite"] = "Ansi 15 Color";
    Iterm2ColorName["Background"] = "Background Color";
    Iterm2ColorName["Bold"] = "Bold Color";
    Iterm2ColorName["Cursor"] = "Cursor Color";
    Iterm2ColorName["CursorText"] = "Cursor Text Color";
    Iterm2ColorName["Foreground"] = "Foreground Color";
})(Iterm2ColorName || (Iterm2ColorName = {}));
const COLOR_KEYS = ["Red Component", "Green Component", "Blue Component"];
const COLOR_NAMES = lodash_1.values(Iterm2ColorName);
/* Convert a string to TermScheme */
function iterm2(input) {
    if (!is_1.default.string(input) || is_1.default.emptyOrWhitespace(input)) {
        throw new TypeError(`iterm2: input must be non-empty string`);
    }
    const data = parse(input);
    if (!isIterm2Data(data)) {
        const errs = getIterm2DataErrrors(data);
        throw new TypeError(`iterm2: input ${util_1.inspect(data)} is invalid: ${new AggregateError(errs)}`);
    }
    const get = getColor(data);
    return {
        0: get(Iterm2ColorName.Black),
        1: get(Iterm2ColorName.Red),
        2: get(Iterm2ColorName.Green),
        3: get(Iterm2ColorName.Yellow),
        4: get(Iterm2ColorName.Blue),
        5: get(Iterm2ColorName.Magenta),
        6: get(Iterm2ColorName.Cyan),
        7: get(Iterm2ColorName.White),
        8: get(Iterm2ColorName.LightBlack),
        9: get(Iterm2ColorName.LightRed),
        10: get(Iterm2ColorName.LightGreen),
        11: get(Iterm2ColorName.LightYellow),
        12: get(Iterm2ColorName.LightBlue),
        13: get(Iterm2ColorName.LightMagenta),
        14: get(Iterm2ColorName.LightCyan),
        15: get(Iterm2ColorName.LightWhite),
        background: get(Iterm2ColorName.Background),
        bold: get(Iterm2ColorName.Bold),
        cursor: get(Iterm2ColorName.Cursor),
        text: get(Iterm2ColorName.Foreground)
    };
}
exports.iterm2 = iterm2;
/** Check if data is valid and complete iTerm2 colors profile  */
function isIterm2Data(data) {
    if (!is_1.default.plainObject(data)) {
        return false;
    }
    const present = Object.keys(data);
    const missing = COLOR_NAMES.filter((name) => typeof name === "string").some((name) => !lodash_1.includes(present, name));
    if (missing) {
        return false;
    }
    const malformed = lodash_1.values(data).some((color) => !isIterm2Color(color));
    if (malformed) {
        return false;
    }
    return true;
}
/** Check if data is valid iTerm2Color */
function isIterm2Color(data) {
    if (!is_1.default.plainObject(data)) {
        return false;
    }
    const missing = COLOR_KEYS.some((key) => !(key in data));
    if (missing) {
        return false;
    }
    const malformed = lodash_1.entries(data)
        .filter(([name]) => lodash_1.includes(COLOR_KEYS, name))
        .some(([, color]) => !is_1.default.inRange(color, 1));
    if (malformed) {
        return false;
    }
    return true;
}
function getColor(data) {
    return function get(name) {
        const color = data[name];
        return [
            toColor(color["Red Component"]),
            toColor(color["Green Component"]),
            toColor(color["Blue Component"])
        ];
    };
}
function toColor(input) {
    return Math.round(input * 255);
}
function getIterm2DataErrrors(data) {
    if (!is_1.default.plainObject(data)) {
        if (is_1.default.array(data) && data.length === 0) {
            return [new TypeError(`iterm2: input must be non-empty plist, received []`)];
        }
        return [new TypeError(`expected type object, received ${is_1.default(data)}`)];
    }
    const errors = [];
    const present = Object.keys(data);
    COLOR_NAMES.filter((name) => !lodash_1.includes(present, name)).forEach((name) => errors.push(new TypeError(`Missing ${name}`)));
    const colorErrors = Object.keys(data)
        .filter((name) => typeof name === "string")
        .filter((name) => lodash_1.includes(COLOR_NAMES, name))
        .reduce((acc, colorName) => {
        const color = data[colorName];
        const errs = getIterm2ColorErrors(color, colorName);
        return [...acc, ...errs];
    }, []);
    return [...errors, ...colorErrors];
}
function getIterm2ColorErrors(data, id) {
    if (!is_1.default.plainObject(data)) {
        return [
            new TypeError(`expected type object, received ${is_1.default(data)} for ${id}`)
        ];
    }
    const errors = [];
    const present = Object.keys(data);
    COLOR_KEYS.filter((name) => !lodash_1.includes(present, name)).forEach((key) => errors.push(new TypeError(`Missing "${key}" in "${id}"`)));
    lodash_1.entries(data)
        .filter(([name]) => lodash_1.includes(COLOR_KEYS, name))
        .forEach(([name, color]) => {
        if (!is_1.default.number(color)) {
            errors.push(new TypeError(`"${name}" in "${id}" must be number, received ${is_1.default(color)}`));
        }
        if (!is_1.default.inRange(color, 1)) {
            errors.push(new TypeError(`"${name}" in "${id}" must range between 0 and 1 in ${name} in ${name}, was ${color}`));
        }
    });
    return errors;
}
