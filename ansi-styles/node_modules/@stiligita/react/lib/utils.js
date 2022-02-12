'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Determines if listener.
 *
 * @param {string} onEvent  eventname
 * @return {boolean} True if listener, False otherwise.
 */
var isListener = exports.isListener = function isListener(onEvent) {
  var _onEvent = _slicedToArray(onEvent, 3),
      o = _onEvent[0],
      n = _onEvent[1],
      Event = _onEvent[2];

  return o === 'o' && n === 'n' & Event === Event.toUpperCase();
};