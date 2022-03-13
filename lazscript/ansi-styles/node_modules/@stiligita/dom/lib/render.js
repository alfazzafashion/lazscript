'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('@stiligita/constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A simple CSS processor that simply wraps rules in a selector if present
 *
 * @param {String|boolean} key
 *   The selector
 * @param {String} content
 * The style rules
 * @return {String}
 */
var simpleProcessor = function simpleProcessor(key, content) {
  return key ? key + '{' + content + '}' : content;
};
var simplePreProcessor = function simplePreProcessor(rules) {
  return rules;
};
var simpleGetName = function simpleGetName(name) {
  return name;
};
// @todo Add something more meaningfull here
var simpleCreateComponent = function simpleCreateComponent() {
  return function () {};
};

/**
 * Default createSelector implementation emitting [data-styled="id"] selectors
 * @param {String} id
 * @param {String} mode
 */
var simpleCreateSelector = function simpleCreateSelector(id, mode) {
  switch (mode) {
    case 'css':
      return '[data-styled="' + id + '"]';
    case 'html':
      return { 'data-styled': id };
    default:
      throw new TypeError('Unknown createSelector case "' + mode + '". Use "css" or "html"');
  }
};

/**
 * Private render class. Hnadles the entire rendering logic.
 * Provides a plugin mechanism that allows to set different processors or
 * renderers
 *
 * @private
 * @class Renderer
 */

var Renderer = function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this[_constants.PRE_PROCESSOR] = simplePreProcessor;
    this[_constants.PROCESSOR] = simpleProcessor;
    this[_constants.GET_NAME] = simpleGetName;
    this[_constants.CREATE_COMPONENT] = simpleCreateComponent;
    this[_constants.CREATE_SELECTOR] = simpleCreateSelector;
    this.processCSS = this.processCSS.bind(this);
    this.createComponent = this.createComponent.bind(this);
    this.use = this.use.bind(this);
    this.before = this.before.bind(this);
  }

  /**
   * Adds plugin into instance
   *
   * @param {function} plugin
   *   The plugin function
   * @return {Object}
   */


  _createClass(Renderer, [{
    key: 'use',
    value: function use(plugin) {
      this[plugin.stiligita] = plugin;
      return this.methods;
    }

    /**
     * Adds plugin into instance
     *
     * @param {function} plugin
     *   The plugin function
     * @return {Object}
     */

  }, {
    key: 'before',
    value: function before(plugin) {
      switch (plugin.stiligita) {
        case _constants.PROCESSOR:
          this[_constants.PRE_PROCESSOR] = plugin;
          break;
        default:
          break;
      }
      return this.methods;
    }
  }, {
    key: 'preProcessCSS',


    /**
     * Calls assigned pre-processor with arguments
     *
     * @param {Array} args
     * @return {function}
     */
    value: function preProcessCSS() {
      return this[_constants.PRE_PROCESSOR].apply(this, arguments);
    }

    /**
     * Calls assigned processor with arguments
     *
     * @param {Array} args
     * @return {function}
     */

  }, {
    key: 'processCSS',
    value: function processCSS() {
      return this[_constants.PROCESSOR].apply(this, arguments);
    }

    /**
     * Calls assigned processor with arguments
     *
     * @param {Array} args
     * @return {function}
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this[_constants.GET_NAME].apply(this, arguments);
    }

    /**
     * Calls assigned renderer with arguments
     *
     * @param {Array} args
     * @return {function}
     */

  }, {
    key: 'createComponent',
    value: function createComponent() {
      return this[_constants.CREATE_COMPONENT].apply(this, arguments);
    }
  }, {
    key: 'methods',
    get: function get() {
      return {
        before: this.before,
        use: this.use
      };
    }
  }]);

  return Renderer;
}();

// Export one instance


exports.default = new Renderer();