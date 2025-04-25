"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _history = _interopRequireDefault(require("./history"));
var _utils = require("./utils");
var _select = _interopRequireDefault(require("./select"));
var _pencil = _interopRequireDefault(require("./pencil"));
var _line = _interopRequireDefault(require("./line"));
var _arrow = _interopRequireDefault(require("./arrow"));
var _rectangle = _interopRequireDefault(require("./rectangle"));
var _circle = _interopRequireDefault(require("./circle"));
var _pan = _interopRequireDefault(require("./pan"));
var _tools = _interopRequireDefault(require("./tools"));
var _highlighter = _interopRequireDefault(require("./highlighter"));
var _rectangleLabel = _interopRequireDefault(require("./rectangle-label"));
var _defaulTool = _interopRequireDefault(require("./defaul-tool"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n.default = e, t && t.set(e, n), n; }
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

/**
 * Sketch Tool based on FabricJS for React Applications
 */
var SketchField = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(SketchField, _PureComponent);
  var _super = _createSuper(SketchField);
  function SketchField() {
    var _this;
    (0, _classCallCheck2.default)(this, SketchField);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      action: true
    };
    _this._initTools = function (fabricCanvas) {
      _this._tools = {};
      _this._tools[_tools.default.Select] = new _select.default(fabricCanvas);
      _this._tools[_tools.default.Pencil] = new _pencil.default(fabricCanvas);
      _this._tools[_tools.default.Line] = new _line.default(fabricCanvas);
      _this._tools[_tools.default.Arrow] = new _arrow.default(fabricCanvas);
      _this._tools[_tools.default.Rectangle] = new _rectangle.default(fabricCanvas);
      _this._tools[_tools.default.RectangleLabel] = new _rectangleLabel.default(fabricCanvas);
      _this._tools[_tools.default.Circle] = new _circle.default(fabricCanvas);
      _this._tools[_tools.default.Pan] = new _pan.default(fabricCanvas);
      _this._tools[_tools.default.Highlighter] = new _highlighter.default(fabricCanvas);
      _this._tools[_tools.default.DefaultTool] = new _defaulTool.default(fabricCanvas);
    };
    _this.enableTouchScroll = function () {
      var canvas = _this._fc;
      if (canvas.allowTouchScrolling) return;
      canvas.allowTouchScrolling = true;
    };
    _this.disableTouchScroll = function () {
      var canvas = _this._fc;
      if (canvas.allowTouchScrolling) {
        canvas.allowTouchScrolling = false;
      }
    };
    _this.addImg = function (dataUrl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var canvas = _this._fc;
      fabric.Image.fromURL(dataUrl, function (oImg) {
        var opts = {
          left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
          top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
          scale: 0.5
        };
        Object.assign(opts, options);
        oImg.scale(opts.scale);
        oImg.set({
          'left': opts.left,
          'top': opts.top
        });
        canvas.add(oImg);
      });
    };
    _this._onObjectAdded = function (e) {
      var onObjectAdded = _this.props.onObjectAdded;
      if (!_this.state.action) {
        _this.setState({
          action: true
        });
        return;
      }
      var obj = e.target;
      obj.__version = 1;
      // record current object state as json and save as originalState
      var objState = obj.toJSON();
      obj.__originalState = objState;
      var state = JSON.stringify(objState);
      // object, previous state, current state
      _this._history.keep([obj, state, state]);
      onObjectAdded(e);
    };
    _this._onObjectMoving = function (e) {
      var onObjectMoving = _this.props.onObjectMoving;
      onObjectMoving(e);
    };
    _this._onObjectScaling = function (e) {
      var onObjectScaling = _this.props.onObjectScaling;
      onObjectScaling(e);
    };
    _this._onObjectRotating = function (e) {
      var onObjectRotating = _this.props.onObjectRotating;
      onObjectRotating(e);
    };
    _this._onObjectSelected = function (e) {
      var onObjectSelected = _this.props.onObjectSelected;
      onObjectSelected(e);
    };
    _this._onSelectionUpdated = function (e) {
      var onSelectionUpdated = _this.props.onSelectionUpdated;
      onSelectionUpdated(e);
    };
    _this._onSelectionCreated = function (e) {
      var onSelectionCreated = _this.props.onSelectionCreated;
      onSelectionCreated(e);
    };
    _this._onObjectModified = function (e) {
      var onObjectModified = _this.props.onObjectModified;
      var obj = e.target;
      obj.__version += 1;
      var prevState = JSON.stringify(obj.__originalState);
      var objState = obj.toJSON();
      // record current object state as json and update to originalState
      obj.__originalState = objState;
      var currState = JSON.stringify(objState);
      _this._history.keep([obj, prevState, currState]);
      onObjectModified(e);
    };
    _this._onObjectRemoved = function (e) {
      var onObjectRemoved = _this.props.onObjectRemoved;
      var obj = e.target;
      if (obj.__removed) {
        obj.__version += 1;
        return;
      }
      obj.__version = 0;
      onObjectRemoved(e);
    };
    _this._onMouseDown = function (e) {
      var onMouseDown = _this.props.onMouseDown;
      _this._selectedTool.doMouseDown(e);
      onMouseDown(e);
    };
    _this._onMouseMove = function (e) {
      var onMouseMove = _this.props.onMouseMove;
      _this._selectedTool.doMouseMove(e);
      onMouseMove(e);
    };
    _this._onMouseOut = function (e) {
      var onMouseOut = _this.props.onMouseOut;
      _this._selectedTool.doMouseOut(e);
      if (_this.props.onChange) {
        var onChange = _this.props.onChange;
        setTimeout(function () {
          onChange(e.e);
        }, 10);
      }
      onMouseOut(e);
    };
    _this._onMouseUp = function (e) {
      var onMouseUp = _this.props.onMouseUp;
      _this._selectedTool.doMouseUp(e);
      // Update the final state to new-generated object
      // Ignore Path object since it would be created after mouseUp
      // Assumed the last object in canvas.getObjects() in the newest object
      if (_this.props.tool !== _tools.default.Pencil) {
        var canvas = _this._fc;
        var objects = canvas.getObjects();
        var newObj = objects[objects.length - 1];
        if (newObj && newObj.__version === 1) {
          newObj.__originalState = newObj.toJSON();
        }
      }
      if (_this.props.onChange) {
        var onChange = _this.props.onChange;
        setTimeout(function () {
          onChange(e.e);
        }, 10);
      }
      onMouseUp(e);
    };
    _this._resize = function (e) {
      var canvasWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var canvasHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (e) e.preventDefault();
      var _this$props = _this.props,
        widthCorrection = _this$props.widthCorrection,
        heightCorrection = _this$props.heightCorrection;
      var canvas = _this._fc;
      var _this$_container = _this._container,
        offsetWidth = _this$_container.offsetWidth,
        clientHeight = _this$_container.clientHeight;
      var prevWidth = canvasWidth || canvas.getWidth();
      var prevHeight = canvasHeight || canvas.getHeight();
      var wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
      var hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
      canvas.setWidth(offsetWidth - widthCorrection);
      canvas.setHeight(clientHeight - heightCorrection);
      if (canvas.backgroundImage) {
        // Need to scale background images as well
        var bi = canvas.backgroundImage;
        bi.width = bi.width * wfactor;
        bi.height = bi.height * hfactor;
      }
      var objects = canvas.getObjects();
      for (var i in objects) {
        var obj = objects[i];
        var scaleX = obj.scaleX;
        var scaleY = obj.scaleY;
        var left = obj.left;
        var top = obj.top;
        var tempScaleX = scaleX * wfactor;
        var tempScaleY = scaleY * hfactor;
        var tempLeft = left * wfactor;
        var tempTop = top * hfactor;
        obj.scaleX = tempScaleX;
        obj.scaleY = tempScaleY;
        obj.left = tempLeft;
        obj.top = tempTop;
        obj.setCoords();
      }
      canvas.renderAll();
      canvas.calcOffset();
    };
    _this._resizeCanvas = function (e) {
      var canvasWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var canvasHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (e) e.preventDefault();
      var _this$props2 = _this.props,
        widthCorrection = _this$props2.widthCorrection,
        heightCorrection = _this$props2.heightCorrection;
      var canvas = _this._fc;
      var _this$_container2 = _this._container,
        offsetWidth = _this$_container2.offsetWidth,
        clientHeight = _this$_container2.clientHeight;
      var prevWidth = canvasWidth || canvas.getWidth();
      var prevHeight = canvasHeight || canvas.getHeight();
      var wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2);
      var hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2);
      canvas.setWidth(offsetWidth - widthCorrection);
      canvas.setHeight(clientHeight - heightCorrection);
      canvas.renderAll();
      canvas.calcOffset();
    };
    _this._backgroundColor = function (color) {
      if (!color) return;
      var canvas = _this._fc;
      canvas.setBackgroundColor(color, function () {
        return canvas.renderAll();
      });
    };
    _this.canvas = function () {
      return _this._fc;
    };
    _this.zoom = function (factor) {
      var canvas = _this._fc;
      var objects = canvas.getObjects();
      for (var i in objects) {
        objects[i].scaleX = objects[i].scaleX * factor;
        objects[i].scaleY = objects[i].scaleY * factor;
        objects[i].left = objects[i].left * factor;
        objects[i].top = objects[i].top * factor;
        objects[i].setCoords();
      }
      canvas.renderAll();
      canvas.calcOffset();
    };
    _this.undo = function () {
      var history = _this._history;
      var _history$getCurrent = history.getCurrent(),
        _history$getCurrent2 = (0, _slicedToArray2.default)(_history$getCurrent, 3),
        obj = _history$getCurrent2[0],
        prevState = _history$getCurrent2[1],
        currState = _history$getCurrent2[2];
      history.undo();
      if (obj.__removed) {
        _this.setState({
          action: false
        }, function () {
          _this._fc.add(obj);
          obj.__version -= 1;
          obj.__removed = false;
        });
      } else if (obj.__version <= 1) {
        _this._fc.remove(obj);
      } else {
        obj.__version -= 1;
        obj.setOptions(JSON.parse(prevState));
        obj.setCoords();
        _this._fc.renderAll();
      }
      if (_this.props.onChange) {
        _this.props.onChange();
      }
    };
    _this.redo = function () {
      var history = _this._history;
      if (history.canRedo()) {
        var canvas = _this._fc;
        //noinspection Eslint
        var _history$redo = history.redo(),
          _history$redo2 = (0, _slicedToArray2.default)(_history$redo, 3),
          obj = _history$redo2[0],
          prevState = _history$redo2[1],
          currState = _history$redo2[2];
        if (obj.__version === 0) {
          _this.setState({
            action: false
          }, function () {
            canvas.add(obj);
            obj.__version = 1;
          });
        } else {
          obj.__version += 1;
          obj.setOptions(JSON.parse(currState));
        }
        obj.setCoords();
        canvas.renderAll();
        if (_this.props.onChange) {
          _this.props.onChange();
        }
      }
    };
    _this.canUndo = function () {
      return _this._history.canUndo();
    };
    _this.canRedo = function () {
      return _this._history.canRedo();
    };
    _this.toDataURL = function (options) {
      return _this._fc.toDataURL(options);
    };
    _this.toJSON = function (propertiesToInclude) {
      return _this._fc.toJSON(propertiesToInclude);
    };
    _this.fromJSON = function (json) {
      if (!json) return;
      var canvas = _this._fc;
      setTimeout(function () {
        canvas.loadFromJSON(json, function () {
          if (_this.props.tool === _tools.default.DefaultTool) {
            canvas.isDrawingMode = canvas.selection = false;
            canvas.forEachObject(function (o) {
              return o.selectable = o.evented = false;
            });
          }
          canvas.renderAll();
          canvas.setViewportTransform(canvas.viewportTransform);
          if (_this.props.onChange) {
            _this.props.onChange();
          }
        });
      }, 100);
    };
    _this.clear = function (propertiesToInclude) {
      var discarded = _this.toJSON(propertiesToInclude);
      _this._fc.clear();
      _this._history.clear();
      return discarded;
    };
    _this.hasSelection = function () {
      var canvas = _this._fc;
      return !!canvas.getActiveObject();
    };
    _this.clearSelection = function () {
      var canvas = _this._fc;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    };
    _this.removeSelected = function () {
      var canvas = _this._fc;
      var activeObj = canvas.getActiveObject();
      if (activeObj) {
        var selected = [];
        if (activeObj.type === 'activeSelection') {
          activeObj.forEachObject(function (obj) {
            return selected.push(obj);
          });
        } else {
          selected.push(activeObj);
        }
        selected.forEach(function (obj) {
          obj.__removed = true;
          var objState = obj.toJSON();
          obj.__originalState = objState;
          var state = JSON.stringify(objState);
          _this._history.keep([obj, state, state]);
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    };
    _this.copy = function () {
      var canvas = _this._fc;
      canvas.getActiveObject().clone(function (cloned) {
        return _this._clipboard = cloned;
      });
    };
    _this.paste = function () {
      // clone again, so you can do multiple copies.
      _this._clipboard.clone(function (clonedObj) {
        var canvas = _this._fc;
        canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas;
          clonedObj.forEachObject(function (obj) {
            return canvas.add(obj);
          });
          clonedObj.setCoords();
        } else {
          canvas.add(clonedObj);
        }
        _this._clipboard.top += 10;
        _this._clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      });
    };
    _this.setBackgroundFromDataUrl = function (dataUrl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var canvas = _this._fc;
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      var stretched = options.stretched,
        stretchedX = options.stretchedX,
        stretchedY = options.stretchedY,
        fabricOptions = (0, _objectWithoutProperties2.default)(options, ["stretched", "stretchedX", "stretchedY"]);
      img.onload = function () {
        var imgObj = new fabric.Image(img);
        if (stretched || stretchedX) imgObj.scaleToWidth(canvas.width);
        if (stretched || stretchedY) imgObj.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(imgObj, function () {
          return canvas.renderAll();
        }, fabricOptions);
      };
      img.src = dataUrl;
    };
    _this.resizeCanvas = function (_ref) {
      var height = _ref.height,
        width = _ref.width;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _this._resizeCanvas(null, width, height);
    };
    _this.addText = function (text) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var canvas = _this._fc;
      var iText = new fabric.IText(text, options);
      if (position) {
        iText.set({
          'left': position.left || 100,
          'top': position.top || 100
        });
      } else {
        var opts = {
          left: (canvas.getWidth() - iText.width) * 0.5,
          top: (canvas.getHeight() - iText.height) * 0.5
        };
        Object.assign(options, opts);
        iText.set({
          'left': opts.left || 0,
          'top': opts.top || 0
        });
      }

      // // eslint-disable-next-line no-console
      // console.log(position);
      // // eslint-disable-next-line no-console
      // console.log(iText);

      canvas.add(iText);
    };
    _this.callEvent = function (e, eventFunction) {
      if (_this._selectedTool) eventFunction(e);
    };
    _this.componentDidMount = function () {
      var _this$props3 = _this.props,
        tool = _this$props3.tool,
        value = _this$props3.value,
        undoSteps = _this$props3.undoSteps,
        defaultValue = _this$props3.defaultValue,
        backgroundColor = _this$props3.backgroundColor;
      var canvas = _this._fc = new fabric.Canvas(_this._canvas /*, {
                                                               preserveObjectStacking: false,
                                                               renderOnAddRemove: false,
                                                               skipTargetFind: true
                                                               }*/);
      _this._initTools(canvas);

      // set initial backgroundColor
      _this._backgroundColor(backgroundColor);
      var selectedTool = _this._tools[tool];
      if (selectedTool) selectedTool.configureCanvas(_this.props);
      _this._selectedTool = selectedTool;

      // Control resize
      window.addEventListener('resize', _this._resize, false);

      // Initialize History, with maximum number of undo steps
      _this._history = new _history.default(undoSteps);

      // Events binding
      canvas.on('object:added', function (e) {
        return _this.callEvent(e, _this._onObjectAdded);
      });
      canvas.on('object:modified', function (e) {
        return _this.callEvent(e, _this._onObjectModified);
      });
      canvas.on('object:removed', function (e) {
        return _this.callEvent(e, _this._onObjectRemoved);
      });
      canvas.on('mouse:down', function (e) {
        return _this.callEvent(e, _this._onMouseDown);
      });
      canvas.on('mouse:move', function (e) {
        return _this.callEvent(e, _this._onMouseMove);
      });
      canvas.on('mouse:up', function (e) {
        return _this.callEvent(e, _this._onMouseUp);
      });
      canvas.on('mouse:out', function (e) {
        return _this.callEvent(e, _this._onMouseOut);
      });
      canvas.on('object:moving', function (e) {
        return _this.callEvent(e, _this._onObjectMoving);
      });
      canvas.on('object:scaling', function (e) {
        return _this.callEvent(e, _this._onObjectScaling);
      });
      canvas.on('object:rotating', function (e) {
        return _this.callEvent(e, _this._onObjectRotating);
      });
      canvas.on('object:selected', function (e) {
        return _this.callEvent(e, _this._onObjectSelected);
      });
      canvas.on('selection:updated', function (e) {
        return _this.callEvent(e, _this._onSelectionUpdated);
      });
      canvas.on('selection:created', function (e) {
        return _this.callEvent(e, _this._onSelectionCreated);
      });
      // IText Events fired on Adding Text
      // canvas.on("text:event:changed", console.log)
      // canvas.on("text:selection:changed", console.log)
      // canvas.on("text:editing:entered", console.log)
      // canvas.on("text:editing:exited", console.log)

      _this.disableTouchScroll();
      _this._resize();

      // initialize canvas with controlled value if exists
      (value || defaultValue) && _this.fromJSON(value || defaultValue);
    };
    _this.componentWillUnmount = function () {
      return window.removeEventListener('resize', _this._resize);
    };
    _this.componentDidUpdate = function (prevProps, prevState) {
      if (_this.props.width !== prevProps.width || _this.props.height !== prevProps.height) {
        if (_this.props.resizeCanvasOnly) {
          _this._resizeCanvas();
        } else {
          _this._resize();
        }
      }
      if (_this.props.tool !== prevProps.tool) {
        _this._selectedTool = _this._tools[_this.props.tool];
        //Bring the cursor back to default if it is changed by a tool
        _this._fc.defaultCursor = 'default';
        if (_this._selectedTool) {
          _this._selectedTool.configureCanvas(_this.props);
        }
      }
      if (_this.props.lineColor !== prevProps.lineColor) {
        if (_this._selectedTool) {
          _this._selectedTool.configureCanvas(_this.props);
        }
      }
      if (_this.props.backgroundColor !== prevProps.backgroundColor) {
        _this._backgroundColor(_this.props.backgroundColor);
      }
      if (_this.props.value !== prevProps.value || _this.props.value && _this.props.forceValue) {
        _this.fromJSON(_this.props.value);
      }
    };
    _this.render = function () {
      var _this$props4 = _this.props,
        className = _this$props4.className,
        style = _this$props4.style,
        width = _this$props4.width,
        height = _this$props4.height;
      var canvasDivStyle = Object.assign({}, style ? style : {}, width ? {
        width: width
      } : {}, height ? {
        height: height
      } : {
        height: 512
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: className,
        ref: function ref(c) {
          return _this._container = c;
        },
        style: canvasDivStyle
      }, /*#__PURE__*/_react.default.createElement("canvas", {
        id: (0, _utils.uuid4)(),
        ref: function ref(c) {
          return _this._canvas = c;
        }
      }, "Sorry, Canvas HTML5 element is not supported by your browser :("));
    };
    return _this;
  }
  /**
   * Enable touch Scrolling on Canvas
   */
  /**
   * Disable touch Scrolling on Canvas
   */
  /**
   * Add an image as object to the canvas
   *
   * @param dataUrl the image url or Data Url
   * @param options object to pass and change some options when loading image, the format of the object is:
   *
   * {
   *   left: <Number: distance from left of canvas>,
   *   top: <Number: distance from top of canvas>,
   *   scale: <Number: initial scale of image>
   * }
   */
  /**
   * Action when an object is added to the canvas
   */
  /**
   * Action when an object is moving around inside the canvas
   */
  /**
   * Action when an object is scaling inside the canvas
   */
  /**
   * Action when an object is rotating inside the canvas
   */
  /**
  * Action when an object is selected inside the canvas
  */
  /**
  * Action when an selection is updated inside the canvas
  */
  /**
  * Action when an selection is updated inside the canvas
  */
  /**
   * Action when an object is removed from the canvas
   */
  /**
   * Action when the mouse button is pressed down
   */
  /**
   * Action when the mouse cursor is moving around within the canvas
   */
  /**
   * Action when the mouse cursor is moving out from the canvas
   */
  /**
   * Track the resize of the window and update our state
   *
   * @param e the resize event
   * @private
   */
  /**
   * Sets the background color for this sketch
   * @param color in rgba or hex format
   */
  /**
   * Zoom the drawing by the factor specified
   *
   * The zoom factor is a percentage with regards the original, for example if factor is set to 2
   * it will double the size whereas if it is set to 0.5 it will half the size
   *
   * @param factor the zoom factor
   */
  /**
   * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
   */
  /**
   * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
   */
  /**
   * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can undo otherwise false
   */
  /**
   * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
   *
   * @returns {*} true if we can redo otherwise false
   */
  /**
   * Exports canvas element to a dataurl image. Note that when multiplier is used, cropping is scaled appropriately
   *
   * Available Options are
   * <table style="width:100%">
   *
   * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Argument</b></td><td><b>Default</b></td><td><b>Description</b></td></tr>
   * <tr><td>format</td> <td>String</td> <td><optional></td><td>png</td><td>The format of the output image. Either "jpeg" or "png"</td></tr>
   * <tr><td>quality</td><td>Number</td><td><optional></td><td>1</td><td>Quality level (0..1). Only used for jpeg.</td></tr>
   * <tr><td>multiplier</td><td>Number</td><td><optional></td><td>1</td><td>Multiplier to scale by</td></tr>
   * <tr><td>left</td><td>Number</td><td><optional></td><td></td><td>Cropping left offset. Introduced in v1.2.14</td></tr>
   * <tr><td>top</td><td>Number</td><td><optional></td><td></td><td>Cropping top offset. Introduced in v1.2.14</td></tr>
   * <tr><td>width</td><td>Number</td><td><optional></td><td></td><td>Cropping width. Introduced in v1.2.14</td></tr>
   * <tr><td>height</td><td>Number</td><td><optional></td><td></td><td>Cropping height. Introduced in v1.2.14</td></tr>
   *
   * </table>
   *
   * @returns {String} URL containing a representation of the object in the format specified by options.format
   */
  /**
   * Returns JSON representation of canvas
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string
   */
  /**
   * Populates canvas with data from the specified JSON.
   *
   * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
   *
   * @param json JSON string or object
   */
  /**
   * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
   * used as needed in order to undo the clear if possible
   *
   * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
   * @returns {string} JSON string of the canvas just cleared
   */
  /**
   * Remove selected object from the canvas
   */
  /**
   * Sets the background from the dataUrl given
   *
   * @param dataUrl the dataUrl to be used as a background
   * @param options
   */
  /**
  * resize canvas without resizing the content
  *
  * @param canvasSize 
  * @param options
  */
  (0, _createClass2.default)(SketchField, [{
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return SketchField;
}(_react.PureComponent);
SketchField.propTypes = {
  // the color of the line
  lineColor: _propTypes.default.string,
  // The width of the line
  lineWidth: _propTypes.default.number,
  // the fill color of the shape when applicable
  fillColor: _propTypes.default.string,
  // the background color of the sketch
  backgroundColor: _propTypes.default.string,
  // the opacity of the object
  opacity: _propTypes.default.number,
  // number of undo/redo steps to maintain
  undoSteps: _propTypes.default.number,
  // The tool to use, can be pencil, rectangle, circle, brush;
  tool: _propTypes.default.string,
  // image format when calling toDataURL
  imageFormat: _propTypes.default.string,
  // Sketch data for controlling sketch from
  // outside the component
  value: _propTypes.default.object,
  // Set to true if you wish to force load the given value, even if it is  the same
  forceValue: _propTypes.default.bool,
  // Specify some width correction which will be applied on auto resize
  widthCorrection: _propTypes.default.number,
  // Specify some height correction which will be applied on auto resize
  heightCorrection: _propTypes.default.number,
  // Specify action on change
  onChange: _propTypes.default.func,
  // Default initial value
  defaultValue: _propTypes.default.object,
  // Sketch width
  width: _propTypes.default.number,
  // Sketch height
  height: _propTypes.default.number,
  // event object added
  onObjectAdded: _propTypes.default.func,
  // event object modified
  onObjectModified: _propTypes.default.func,
  // event object removed
  onObjectRemoved: _propTypes.default.func,
  // event mouse down
  onMouseDown: _propTypes.default.func,
  // event mouse move
  onMouseMove: _propTypes.default.func,
  // event mouse up
  onMouseUp: _propTypes.default.func,
  // event mouse out
  onMouseOut: _propTypes.default.func,
  // event object move
  onObjectMoving: _propTypes.default.func,
  // event object scale
  onObjectScaling: _propTypes.default.func,
  // event object rotating
  onObjectRotating: _propTypes.default.func,
  // event object selected
  onObjectSelected: _propTypes.default.func,
  // event selection updated
  onSelectionUpdated: _propTypes.default.func,
  // event selection updated
  onSelectionCreated: _propTypes.default.func,
  // Class name to pass to container div of canvas
  className: _propTypes.default.string,
  // Style options to pass to container div of canvas
  style: _propTypes.default.object,
  resizeCanvasOnly: _propTypes.default.bool
};
SketchField.defaultProps = {
  lineColor: 'black',
  lineWidth: 10,
  fillColor: 'transparent',
  backgroundColor: 'transparent',
  opacity: 1.0,
  undoSteps: 25,
  tool: null,
  widthCorrection: 0,
  heightCorrection: 0,
  forceValue: false,
  resizeCanvasOnly: false,
  onObjectAdded: function onObjectAdded() {
    return null;
  },
  onObjectModified: function onObjectModified() {
    return null;
  },
  onObjectRemoved: function onObjectRemoved() {
    return null;
  },
  onMouseDown: function onMouseDown() {
    return null;
  },
  onMouseMove: function onMouseMove() {
    return null;
  },
  onMouseUp: function onMouseUp() {
    return null;
  },
  onMouseOut: function onMouseOut() {
    return null;
  },
  onObjectMoving: function onObjectMoving() {
    return null;
  },
  onObjectScaling: function onObjectScaling() {
    return null;
  },
  onObjectRotating: function onObjectRotating() {
    return null;
  },
  onObjectSelected: function onObjectSelected() {
    return null;
  },
  onSelectionUpdated: function onSelectionUpdated() {
    return null;
  }
};
var _default = SketchField;
var _default2 = _default;
exports.default = _default2;
;
(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(fabric, "fabric", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\SketchField.jsx");
  reactHotLoader.register(SketchField, "SketchField", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\SketchField.jsx");
  reactHotLoader.register(_default, "default", "C:\\Dropbox\\Projects\\SALAM\\Apps\\working\\hisx\\react-sketch\\src\\SketchField.jsx");
})();
;
(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();