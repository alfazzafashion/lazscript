'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerStyleSheet = undefined;

var _serverStylesheet = require('./server-stylesheet');

Object.defineProperty(exports, 'ServerStyleSheet', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_serverStylesheet).default;
  }
});

exports.default = function (rules, keyframes) {
  return (0, _minify2.default)(Object.keys(rules).map(function (key) {
    return _dom.render.processCSS(_dom.render[_constants.CREATE_SELECTOR](key, 'css'), '' + rules[key]);
  }).concat(Object.keys(keyframes).map(function (key) {
    return _dom.render.processCSS('', '@keyframes ' + key + '{' + keyframes[key] + '}');
  })).join(''));
};

var _constants = require('@stiligita/constants');

var _dom = require('@stiligita/dom');

var _minify = require('./minify');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sends style rules and keyframes into a processor and returns the result
 *
 * @param {String} rules
 *   The rules
 * @param {String} keyframes
 *   The keyframes
 * @return {String} A proccesed css string
 */