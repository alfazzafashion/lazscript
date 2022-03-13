'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateWithVars = exports.templateWithProps = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('@stiligita/utils');

/**
 * Creates CSS from a list of strings and interpolations.
 * If interpolations are functions they may be called with `props`
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @param {Object} props
 *   The properties used to resolve the interpolated functions
 * @return {String}
 */
var templateWithProps = exports.templateWithProps = function templateWithProps(strings, args) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return strings.map(function (str, i) {
    var dynamic = (0, _utils.ensureTruthy)(args[i]);
    switch (typeof dynamic === 'undefined' ? 'undefined' : _typeof(dynamic)) {
      case 'function':
        return '' + str + (0, _utils.ensureTruthy)(dynamic(props));
      case 'string':
        return '' + str + dynamic;
      default:
        throw new TypeError('Cannot create stylesheet from ' + (typeof dynamic === 'undefined' ? 'undefined' : _typeof(dynamic)));
    }
  }).join('');
};

/**
 * Creates CSS from a list of strings and interpolations.
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @return {String}
 */
var templateWithVars = exports.templateWithVars = function templateWithVars(strings, args) {
  return strings.map(function (str, i) {
    var dynamic = (0, _utils.ensureTruthy)(args[i]);
    switch (typeof dynamic === 'undefined' ? 'undefined' : _typeof(dynamic)) {
      case 'string':
        return '' + str + dynamic;
      default:
        throw new TypeError('Cannot create stylesheet from ' + (typeof dynamic === 'undefined' ? 'undefined' : _typeof(dynamic)));
    }
  }).join('');
};

exports.default = {
  templateWithProps: templateWithProps,
  templateWithVars: templateWithVars
};