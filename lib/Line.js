export default class Line {
  from = null
  to = null
  svg = null

  attrs = {
    stroke: "red",
    strokeWidth: 10
  }

  constructor(from, to, attrs) {
    this.from = from
    this.to = to
    this.attrs = attrs
  }

  getStart() {

  }

  getEnd() {

  }

  getSvg() {

  }
}