"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElement = getElement;
exports.offset = offset;
exports.center = center;
exports.add = add;
exports.linePoint = linePoint;
exports.linePoints = linePoints;

var _reactDom = require("react-dom");

function getElement(elOrComponent) {
  if (elOrComponent instanceof HTMLElement) {
    return elOrComponent;
  }

  return (0, _reactDom.findDOMNode)(elOrComponent);
}

function offset(el1, parent1) {
  var el = getElement(el1);
  var parent = getElement(parent1);
  var offsetTop = 0,
      offsetLeft = 0;

  do {
    if (!isNaN(el.offsetTop)) {
      offsetTop += el.offsetTop;
    }

    if (!isNaN(el.offsetLeft)) {
      offsetLeft += el.offsetLeft;
    }
  } while (el = el.offsetParent && el != parent);

  return {
    top: offsetTop,
    left: offsetLeft
  };
}

function center(el1) {
  var el = getElement(el1);
  return {
    top: el.offsetHeight / 2,
    left: el.offsetWidth / 2
  };
}

function add(a, b) {
  return {
    top: a.top + b.top,
    left: a.left + b.left
  };
}

function linePoint(el, parent) {
  return add(offset(el, parent), center(el));
}

function linePoints(el1, el2, parent) {
  var p1 = linePoint(el1, parent);
  var p2 = linePoint(el2, parent);
  return [p1.left, p1.top, p2.left, p2.top];
}