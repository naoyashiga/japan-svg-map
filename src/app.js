import Screen from './components/Screen'
const d3 = require('d3')

class Viz {

  constructor() {
    this.margin = {top: 0, right: 0, bottom: 300, left: 0}

    this.width = 1200 - this.margin.left - this.margin.right
    this.height = 1000 - this.margin.top - this.margin.bottom

    this.svg = this.createViz()
    this.projection = this.createProjection()
    this.path = this.createPath()

    d3.json('./assets/prefecture.json', (error, json) => {
      console.log(json);

      this.svg.selectAll(".prefecture")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", this.path);
    })

  }

  createProjection() {
    return d3.geoMercator()
    .center([140, 38.5])
    .scale(2000)
    .translate([this.width / 2, this.height / 2])
  }

  createPath() {
    return d3.geoPath()
    .projection(this.projection)
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }


}

new Viz()
