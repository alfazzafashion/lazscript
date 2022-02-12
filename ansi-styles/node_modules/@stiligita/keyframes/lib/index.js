'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashCode = require('@stiligita/hash-code');

var _hashCode2 = _interopRequireDefault(_hashCode);

var _store = require('@stiligita/store');

var _templates = require('@stiligita/templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simple keyframe helper. Creates kayframes, writes them to the store and
 * returns its name as id
 *
 * @param {Array} strings
 *   everything that is not an interpolation
 * @param {Array} args
 *   The interpolations
 * @return {String} The id can be used to link this animation
 */
var keyframes = function keyframes(strings) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var css = (0, _templates.templateWithVars)(strings, args);
  var id = (0, _hashCode2.default)(css);
  _store.store.addKeyframes(_defineProperty({}, id, css));
  return _store.store.getName(id);
};

exports.default = keyframes;