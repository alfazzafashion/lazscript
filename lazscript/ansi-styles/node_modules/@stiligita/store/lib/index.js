'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('@stiligita/utils');

var _stylesheets = require('@stiligita/stylesheets');

var _stylesheets2 = _interopRequireDefault(_stylesheets);

var _dom = require('@stiligita/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.__STYLES__ = {};
    this.__KEYFRAMES__ = {};
    this.__KEYS__ = [];
    this.__STYLE_TAG__ = document.createElement('style');
    document.head.appendChild(this.__STYLE_TAG__);
  }

  _createClass(Store, [{
    key: 'diff',
    value: function diff(key) {
      if ((0, _utils.isFalsy)(key, this.__KEYS__)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'update',
    value: function update() {
      this.__STYLE_TAG__.innerHTML = (0, _stylesheets2.default)(this.__STYLES__, this.__KEYFRAMES__);
    }
  }, {
    key: 'getName',
    value: function getName(hash) {
      return _dom.render.getName(hash, this.__KEYS__);
    }
  }, {
    key: 'addStyles',
    value: function addStyles(obj, prop) {
      var _Object$keys = Object.keys(obj),
          _Object$keys2 = _slicedToArray(_Object$keys, 1),
          key = _Object$keys2[0];

      if (this.diff(key)) {
        this.__KEYS__.push(key);
        var newObj = _defineProperty({}, this.getName(key), obj[key]);
        this[prop] = _extends({}, this[prop], newObj);
        this.update();
      }
      // Styles have already been written
      // no need for operations
    }
  }, {
    key: 'addRules',
    value: function addRules(obj) {
      this.addStyles(obj, '__STYLES__');
    }
  }, {
    key: 'addKeyframes',
    value: function addKeyframes(obj) {
      this.addStyles(obj, '__KEYFRAMES__');
    }
  }]);

  return Store;
}();

var store = new Store();
exports.store = store;
exports.default = store;