'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var elementAttributes = _attributes2.default[props.tag] || [];
  var validAttributes = [].concat(_toConsumableArray(_attributes2.default['*']), _toConsumableArray(elementAttributes));
  return Object.keys(props)
  // Keep anything that is invalid
  .filter(function (prop) {
    return validAttributes.indexOf(prop) < 0 && !(0, _utils.isListener)(prop);
  })
  // Remove data and aria attributes
  .filter(function (prop) {
    return (0, _utils.isTruthy)(prop.substring(0, 5), ['data-', 'aria-']);
  });
};

var _utils = require('@stiligita/utils');

var _attributes = require('./attributes');

var _attributes2 = _interopRequireDefault(_attributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }