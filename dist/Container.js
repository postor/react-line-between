"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _position = require("./utils/position");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Container =
/*#__PURE__*/
function (_Component) {
  _inherits(Container, _Component);

  function Container() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Container);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Container)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      svgs: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toClean", []);

    return _this;
  }

  _createClass(Container, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var svg = this.svg;
      var Snap = this.props.Snap || window.Snap;
      var mina = this.props.Snap || window.mina;

      if (!Snap) {
        throw "react-line-between requires snapsvg, eighter make it window.Snap or use Snap as prop of Container";
      }

      this.snap = Snap(svg);
      this.mina = mina;
      this.updateSvg();
    }
  }, {
    key: "updateSvg",
    value: function updateSvg() {
      var _this2 = this;

      if (typeof window == 'undefined') {
        return;
      }

      var svg = this.svg,
          root = this.root,
          snap = this.snap;

      if (!svg || !root || !snap) {
        return;
      } //容器变化


      snap.attr({
        width: root.offsetWidth,
        height: root.offsetHeight
      }); //内容变化

      var _this$state$svgs = this.state.svgs,
          svgs = _this$state$svgs === void 0 ? {} : _this$state$svgs;
      Object.keys(svgs).forEach(function (k) {
        var _this2$snap;

        var line = svgs[k]; //已经绘制

        if (line.svg) {
          //已经失效
          if (!line.from || !line.to) {
            line.svg.remove();
            line.svg = undefined;
            return;
          } //更新属性        


          line.svg.attr(line.attrs);

          var _linePoints = (0, _position.linePoints)(line.from, line.to, root),
              _linePoints2 = _slicedToArray(_linePoints, 4),
              x1 = _linePoints2[0],
              y1 = _linePoints2[1],
              x2 = _linePoints2[2],
              y2 = _linePoints2[3];

          var _this2$props$animate = _this2.props.animate,
              animate = _this2$props$animate === void 0 ? {} : _this2$props$animate; //无动画

          if (!animate) {
            line.svg.attr({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2
            });
            return;
          } //有动画


          var _animate$duration = animate.duration,
              duration = _animate$duration === void 0 ? 600 : _animate$duration,
              _animate$easing = animate.easing,
              easing = _animate$easing === void 0 ? _this2.mina.linear : _animate$easing,
              _animate$callback = animate.callback,
              callback = _animate$callback === void 0 ? function () {} : _animate$callback;
          line.svg.animate({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
          }, duration, easing, callback);
          return;
        } //未绘制且无效


        if (!line.from || !line.to) {
          return;
        } //重新绘制


        line.svg = (_this2$snap = _this2.snap).line.apply(_this2$snap, _toConsumableArray((0, _position.linePoints)(line.from, line.to, root)));
        line.svg.attr(line.attrs);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props$updateOnR = this.props.updateOnRender,
          updateOnRender = _this$props$updateOnR === void 0 ? true : _this$props$updateOnR;
      updateOnRender && setTimeout(function () {
        return _this3.updateSvg();
      });
      return _react.default.createElement("div", {
        ref: function ref(root) {
          return _this3.root = root;
        },
        style: {
          position: 'relative'
        }
      }, _react.default.createElement("svg", {
        ref: function ref(svg) {
          return _this3.svg = svg;
        },
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: '-1'
        }
      }), this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var svgs = state.svgs;
      var lines = props.lines;
      var rtn = {};
      Object.keys(svgs).forEach(function (k) {
        var line = lines[k];

        if (line) {
          //存在则更新或创建
          rtn[k] = _objectSpread({}, svgs[k], line);
          return;
        } //不存在的则删掉


        svgs[k].svg && svgs[k].svg.remove();
      }); //目前还没有的加上

      Object.keys(lines).filter(function (k) {
        return !svgs[k];
      }).forEach(function (k) {
        rtn[k] = _objectSpread({}, lines[k]);
      });
      return {
        svgs: rtn
      };
    }
  }]);

  return Container;
}(_react.Component);

exports.default = Container;