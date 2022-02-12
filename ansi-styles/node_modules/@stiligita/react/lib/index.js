'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Element = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _dom = require('@stiligita/dom');

var _utils = require('@stiligita/utils');

var _hashCode = require('@stiligita/hash-code');

var _hashCode2 = _interopRequireDefault(_hashCode);

var _constants = require('@stiligita/constants');

var _templates = require('@stiligita/templates');

var _store = require('@stiligita/store');

var _getInvalidAttributes = require('./get-invalid-attributes');

var _getInvalidAttributes2 = _interopRequireDefault(_getInvalidAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Element = exports.Element = function Element(props) {
  return (0, _react.createElement)(props.tag, _extends({}, (0, _utils.cleanObject)(props, (0, _getInvalidAttributes2.default)(props)), _dom.render[_constants.CREATE_SELECTOR](props.hash, 'html')));
};
Element.displayName = 'Stiligita';

var createReactComponent = function createReactComponent(strings, args, tag, defaultProps) {
  var Component = function Component(props) {
    props = _extends({}, defaultProps, props);
    var css = _dom.render.preProcessCSS((0, _templates.templateWithProps)(strings, args, props));
    var hash = (0, _hashCode2.default)(css);
    _store.store.addRules(_defineProperty({}, hash, css));
    return (0, _react.createElement)(Element, _extends({}, props, { tag: tag, hash: _store.store.getName(hash) }), props.children);
  };
  Component.displayName = 'styled-' + tag;
  return Component;
};

createReactComponent.stiligita = _constants.CREATE_COMPONENT;

exports.default = createReactComponent;