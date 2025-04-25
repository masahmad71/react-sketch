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
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = (0, _getPrototypeOf2.default)(t); if (r) { var s = (0, _getPrototypeOf2.default)(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return (0, _possibleConstructorReturn2.default)(this, e); }; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};
/*eslint no-unused-vars: 0*/
var fabric = require('fabric').fabric;
var Rectangle = /*#__PURE__*/function (_FabricCanvasTool) {
  (0, _inherits2.default)(Rectangle, _FabricCanvasTool);
  var _super = _createSuper(Rectangle);
  function Rectangle() {
    (0, _classCallCheck2.default)(this, Rectangle);
    return _super.apply(this, arguments);
  }
  (0, _createClass2.default)(Rectangle, [{
    key: "configureCanvas",
    value: function configureCanvas(props) {
      var canvas = this._canvas;
      canvas.isDrawingMode = canvas.selection = false;
      canvas.forEachObject(function (o) {
        return o.selectable = o.evented = false;
      });
      this._width = props.lineWidth;
      this._color = props.lineColor;
      this._fill = props.fillColor;
    }
  }, {
    key: "doMouseDown",
    value: function doMouseDown(o) {
      var canvas = this._canvas;
      this.isDown = true;
      var pointer = canvas.getPointer(o.e);
      this.startX = pointer.x;
      this.startY = pointer.y;
      this.rect = new fabric.Rect({
        left: this.startX,
        top: this.startY,
        originX: 'left',
        originY: 'top',
        width: pointer.x - this.startX,
        height: pointer.y - this.startY,
        stroke: this._color,
        strokeWidth: this._width,
        fill: this._fill,
        transparentCorners: false,
        selectable: false,
        evented: false,
        strokeUniform: true,
        noScaleCache: false,
        angle: 0
      });
      canvas.add(this.rect);
    }
  }, {
    key: "doMouseMove",
    value: function doMouseMove(o) {
      if (!this.isDown) return;
      var canvas = this._canvas;
      var pointer = canvas.getPointer(o.e);
      if (this.startX > pointer.x) {
        this.rect.set({
          left: Math.abs(pointer.x)
        });
      }
      if (this.startY > pointer.y) {
        this.rect.set({
          top: Math.abs(pointer.y)
        });
      }
      this.rect.set({
        width: Math.abs(this.startX - pointer.x)
      });
      this.rect.set({
        height: Math.abs(this.startY - pointer.y)
      });
      this.rect.setCoords();
      canvas.renderAll();
    }
  }, {
    key: "doMouseUp",
    value: function doMouseUp(o) {
      this.isDown = false;
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return Rectangle;
}(_fabrictool.default);
var _default = Rectangle;
var _default2 = _default;
exports.default = _default2;
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(fabric, "fabric", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\rectangle.js");
  reactHotLoader.register(Rectangle, "Rectangle", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\rectangle.js");
  reactHotLoader.register(_default, "default", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\rectangle.js");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();