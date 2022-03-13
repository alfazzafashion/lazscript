'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Prefixes a string with an underscore if the first character is a number
 *
 * @param {String} selector
 * @return {String}
 */
var ensureSelector = function ensureSelector(selector) {
  return selector[0].match(/[0-9]/) ? '_' + selector : selector;
};

/**
 * Creates a hash from a String and then converts it to a base 36 String.
 *
 * @param {String} str
 * The string that should be converted to a hash
 * @todo This is not safe 🤡
 * @return {String}
 */
var hashCode = function hashCode(str) {
  return ensureSelector(str.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0).toString(36).replace('-', '_'));
};

exports.default = hashCode;