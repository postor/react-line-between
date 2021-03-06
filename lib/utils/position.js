import { findDOMNode } from 'react-dom'

export function getElement(elOrComponent) {
  if (elOrComponent instanceof HTMLElement) {
    return elOrComponent
  }
  return findDOMNode(elOrComponent)
}

export function offset(el1, parent1) {
  let el = getElement(el1)
  const parent = getElement(parent1)
  var offsetTop = 0, offsetLeft = 0
  do {
    if (!isNaN(el.offsetTop)) {
      offsetTop += el.offsetTop;
    }
    if (!isNaN(el.offsetLeft)) {
      offsetLeft += el.offsetLeft;
    }
  } while (el = el.offsetParent && el != parent)

  return {
    top: offsetTop,
    left: offsetLeft
  }
}

export function center(el1) {
  const el = getElement(el1)
  return {
    top: el.offsetHeight / 2,
    left: el.offsetWidth / 2,
  }
}

export function add(a, b) {
  return {
    top: a.top + b.top,
    left: a.left + b.left,
  }
}

export function linePoint(el, parent) {
  return add(offset(el, parent), center(el))
}

export function linePoints(el1, el2, parent) {
  const p1 = linePoint(el1, parent)
  const p2 = linePoint(el2, parent)
  return [p1.left, p1.top, p2.left, p2.top]
}