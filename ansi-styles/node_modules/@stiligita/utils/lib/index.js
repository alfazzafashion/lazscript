'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Determines if truthy.
 *
 * @param {*} input
 *   The input
 * @param {Array} reject
 *   A list of items that will be rejected if they match
 * @return {boolean} True if truthy, False otherwise.
 */
var isTruthy = exports.isTruthy = function isTruthy(input) {
  var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined, null, false];
  return reject.indexOf(input) < 0;
};

/**
 * Determines if falsy.
 *
 * @param {*} input
 *   The input
 * @param {Array} reject
 *   A list of items that will be rejected if they match
 * @return {boolean} True if falsy, False otherwise.
 */
var isFalsy = exports.isFalsy = function isFalsy(input) {
  var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [undefined, null, false];
  return !isTruthy(input, reject);
};

/**
 * { lambda_description }
 *
 * @param {*} input
 *   The input
 * @param {string} fallback
 *   The fallback
 * @param {Array} reject
 *   A list of items that will be rejected if they match
 * @return {*}
 */
var ensureTruthy = exports.ensureTruthy = function ensureTruthy(input) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [undefined, null, false];
  return isFalsy(input, reject) ? fallback : input;
};

/**
 * Filters an object by its falsy props
 *
 * @param {Object} obj
 *   The object original object
 * @return {Object} The filtered object
 */
var filterObject = exports.filterObject = function filterObject(obj) {
  return Object.keys(obj).filter(function (key) {
    return isTruthy(obj[key]);
  }).map(function (prop) {
    return _defineProperty({}, prop, obj[prop]);
  }).reduce(function (a, b) {
    return Object.assign({}, a, b);
  }, {});
};

/**
 * Claens an object by a list of removals
 *
 * @param {Object} obj
 *   The object original object
 * @param {Array} removals
 *   A list of items that will be removed if they match
 * @return {Object} The cleaned object
 */
var cleanObject = exports.cleanObject = function cleanObject(obj, removals) {
  return Object.keys(obj).filter(function (key) {
    return isTruthy(key, removals);
  }).map(function (prop) {
    return _defineProperty({}, prop, obj[prop]);
  }).reduce(function (a, b) {
    return Object.assign({}, a, b);
  }, {});
};