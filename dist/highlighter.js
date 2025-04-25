"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _fabrictool = _interopRequireDefault(require("./fabrictool"));
var _utils = require("./utils");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = (0, _getPrototypeOf2.default)(t); if (r) { var s = (0, _getPrototypeOf2.default)(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return (0, _possibleConstructorReturn2.default)(this, e); }; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
var Highlighter = /*#__PURE__*/function (_FabricCanvasTool) {
  (0, _inherits2.default)(Highlighter, _FabricCanvasTool);
  var _super = _createSuper(Highlighter);
  function Highlighter() {
    (0, _classCallCheck2.default)(this, Highlighter);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Highlighter, [{
    key: "configureCanvas",
    value: function configureCanvas(props) {
      this._canvas.isDrawingMode = true;
      this._canvas.freeDrawingBrush.width = props.lineWidth;
      this._canvas.freeDrawingBrush.color = props.lineColor.indexOf('#') > -1 ? (0, _utils.hexToRgbA)(props.lineColor) : (0, _utils.hexToRgbA)((0, _utils.colorNameToHex)(props.lineColor));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return Highlighter;
}(_fabrictool.default);
var _default = Highlighter;
var _default2 = _default;
exports.default = _default2;
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(Highlighter, "Highlighter", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\highlighter.js");
  reactHotLoader.register(_default, "default", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\highlighter.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();