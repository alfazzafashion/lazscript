"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const os = require("os");
const path = require("path");
const util_1 = require("util");
const Color = require("color");
const is_1 = require("@marionebl/is");
const requireFromString = require("require-from-string");
const AggregateError = require("aggregate-error");
const resolveFrom = require("resolve-from");
const REQUIRED_KEYS = ['cursorColor', 'foregroundColor', 'backgroundColor', 'colors'];
const EXTRA_COLORS = ['cursorColor', 'foregroundColor', 'backgroundColor'];
const REQUIRED_COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'lightBlack', 'lightRed', 'lightGreen', 'lightYellow', 'lightBlue', 'lightMagenta', 'lightCyan', 'lightWhite'];
const DEFAULTS = {
    cursorColor: 'rgb(217, 0, 189)',
    foregroundColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(0, 0, 0)',
    black: 'rgb(0, 0, 0)',
    red: 'rgb(255, 0, 0)',
    green: 'rgb(0, 255, 0)',
    yellow: 'rgb(253, 255, 0)',
    blue: 'rgb(0, 97, 255)',
    magenta: 'rgb(224, 0, 255)',
    cyan: 'rgb(0, 255, 255)',
    white: 'rgb(208, 208, 208)',
    lightBlack: 'rgb(128, 128, 128)',
    lightRed: 'rgb(255, 0, 0)',
    lightGreen: 'rgb(0, 255, 255)',
    lightYellow: 'rgb(253, 255, 0)',
    lightBlue: 'rgb(0, 97, 255)',
    lightMagenta: 'rgb(224, 0, 255)',
    lightCyan: 'rgb(0, 255, 255)',
    lightWhite: 'rgb(255, 255, 255)',
};
function hyper(input, parserConfig) {
    if (!is_1.default.string(input) || is_1.default.emptyOrWhitespace(input)) {
        throw new TypeError(`hyper: input must be non-empty string`);
    }
    if (!is_1.default.plainObject(parserConfig)) {
        throw new TypeError(`hyper: parserConfig must be object`);
    }
    if (typeof parserConfig.filename !== 'string') {
        throw new TypeError(`hyper: parserConfig.filename must be string`);
    }
    const data = resolveHyperConfig(input, { filename: parserConfig.filename });
    const errs = getHyperConfigErrors(data);
    if (errs.length > 0) {
        throw new TypeError(`hyper: input is invalid: ${new AggregateError(errs)}`);
    }
    const { backgroundColor, colors, cursorColor, foregroundColor } = normalizeHyperConfig(data);
    return {
        0: get(colors.black),
        1: get(colors.red),
        2: get(colors.green),
        3: get(colors.yellow),
        4: get(colors.blue),
        5: get(colors.magenta),
        6: get(colors.cyan),
        7: get(colors.white),
        8: get(colors.lightBlack),
        9: get(colors.lightRed),
        10: get(colors.lightGreen),
        11: get(colors.lightYellow),
        12: get(colors.lightBlue),
        13: get(colors.lightMagenta),
        14: get(colors.lightCyan),
        15: get(colors.lightWhite),
        background: get(backgroundColor),
        bold: get(colors.lightBlack),
        cursor: get(cursorColor),
        text: get(foregroundColor)
    };
}
exports.hyper = hyper;
function get(value) {
    const { r, g, b } = Color(value).object();
    return [r, g, b];
}
function isHyperColor(color) {
    if (!color) {
        return false;
    }
    if (typeof color !== 'string') {
        return false;
    }
    try {
        const parsed = Color(color);
        return true;
    }
    catch (err) {
        return false;
    }
}
function getHyperConfigErrors(data) {
    if (is_1.default.empty(data)) {
        return [new TypeError(`expected non-empty object, received ${util_1.inspect(data)}`)];
    }
    if (!('config' in data) || typeof data.config !== 'object') {
        return [new TypeError(`expected .config, received ${util_1.inspect(data)}`)];
    }
    const { config = {} } = data;
    const { colors = {} } = config;
    const errors = [];
    EXTRA_COLORS
        .filter(key => (key in config))
        .filter(key => !isHyperColor(config[key]))
        .forEach((key) => {
        errors.push(new TypeError(`"config.${key}" must be valid color, received "${config[key]}"`));
    });
    REQUIRED_COLORS
        .filter(key => (key in colors))
        .filter(key => !isHyperColor(colors[key]))
        .forEach((key) => {
        errors.push(new TypeError(`"config.colors.${key}" must be valid color, received "${colors[key]}"`));
    });
    return errors;
}
function normalizeHyperConfig(data) {
    const { config } = data;
    const colors = Array.isArray(config.colors) ?
        config.colors.reduce((acc, color, index) => {
            const name = REQUIRED_COLORS[index];
            acc[name] = color;
            return acc;
        }, {}) :
        config.colors || {};
    REQUIRED_COLORS.forEach(required => {
        if (!(required in colors)) {
            colors[required] = DEFAULTS[required];
        }
    });
    return {
        backgroundColor: config.backgroundColor || DEFAULTS.backgroundColor,
        cursorColor: config.cursorColor || DEFAULTS.cursorColor,
        colors,
        foregroundColor: config.foregroundColor || DEFAULTS.foregroundColor
    };
}
function resolveHyperConfig(source, config) {
    const PRELUDE = `
    var _require = require;
    require = function(id) {
      switch (id) {
        case 'electron':
          return {};
        default:
          return _require(id);
      }
    };
  `;
    let base = requireFromString(source, config.filename);
    if (Array.isArray(base.plugins)) {
        base.plugins.forEach((p) => {
            const hyperPrefix = path.join(os.homedir(), ".hyper_plugins");
            const pluginPath = resolveFrom(hyperPrefix, p);
            const pluginSource = fs.readFileSync(pluginPath);
            const plugin = requireFromString([PRELUDE, pluginSource].join('\n'), pluginPath);
            if (plugin.decorateConfig) {
                base.config = plugin.decorateConfig(base.config);
            }
        });
    }
    return base;
}
