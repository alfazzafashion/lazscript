'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var elementAttributes = _domElements.htmlAttributes[props.tag] || [];
  // Check for svg elements and add valid svg attributes
  if ((0, _utils.isFalsy)(props.tag, _domElements.svgElements)) {
    elementAttributes.push.apply(elementAttributes, _toConsumableArray(_domElements.htmlAttributes.svg));
  }
  var validAttributes = [].concat(_toConsumableArray(_domElements.htmlAttributes['*']), _toConsumableArray(elementAttributes), ['children']);
  return Object.keys(props)
  // Keep anything that is invalid
  .filter(function (prop) {
    return validAttributes.indexOf(prop) < 0 && !(0, _utils2.isListener)(prop);
  })
  // Remove data and aria attributes
  .filter(function (prop) {
    return (0, _utils.isTruthy)(prop.substring(0, 5), ['data-', 'aria-']);
  });
};

var _utils = require('@stiligita/utils');

var _domElements = require('./dom-elements');

var _utils2 = require('./utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }