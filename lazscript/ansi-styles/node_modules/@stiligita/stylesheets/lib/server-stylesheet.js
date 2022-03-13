'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('@stiligita/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    _classCallCheck(this, ServerStyleSheet);
  }

  _createClass(ServerStyleSheet, [{
    key: 'getStyleTag',
    value: function getStyleTag() {
      return '<style>' + this.getStyles() + '</style>';
    }
  }, {
    key: 'getStyles',
    value: function getStyles() {
      return _store2.default.getStyles();
    }
  }]);

  return ServerStyleSheet;
}();

exports.default = ServerStyleSheet;