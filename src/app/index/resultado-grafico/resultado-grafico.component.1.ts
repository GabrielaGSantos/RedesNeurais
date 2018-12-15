import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from "d3";

let _self: ResultadoGraficoComponent

@Component({
  selector: 'app-resultado-grafico',
  templateUrl: './resultado-grafico.component.html',
  styleUrls: ['./resultado-grafico.component.css']
})
export class ResultadoGraficoComponent implements OnInit {
  svg: any
  plot: any

  htmlElement: HTMLElement
  host: d3.Selection<any, any, any, any>


  constructor(private element: ElementRef) {
    _self = this
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.element.nativeElement)
  }

  ngOnInit() {
    _self.plot = []

    _self.svg = this.host.select("#resultado").append("svg")
      .attr("width", 400)
      .attr("height", 800)

    _self.createPlot("#resultado", 400, 800)

    _self.addPoint('#resultado', new Point('distance', 1, Number(2)))
    _self.addPoint('#resultado', new Point('distance', 2, Number(4)))
    _self.addPoint('#resultado', new Point('distance', 3, Number(1)))

  }

  createPlot(container, width, height) {
    _self.plot[container] = new Plot(container, width, height, _self.svg)
  }

  addPoint(container, point) {
    _self.plot[container].addPoint(point)
  }
}


let margin = { top: 30, right: 20, bottom: 30, left: 50}

class Point {
  constructor(public dataset: string, public x: number, public y: number) { }
}

let self: Plot

class Plot {
  externalWidth: any
  externalHeight: any
  curve: any
  dataset: any
  xScale: any
  yScale: any
  line: any

  constructor(public container, public width, public height, public svg) {
    self = this
    this.externalWidth = width
    this.externalHeight = height
    this.width = width - (margin.left + margin.right)
    this.height = height - (margin.top + margin.bottom)
    this.curve = d3.curveMonotoneX
    this.dataset = new Array<number>()

    this.draw()
  }

  draw() {
    self.svg = self.svg
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${self.externalWidth} ${self.externalHeight}`)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    self.createScales()
    self.createLine()
    self.drawAxes()
    self.drawPath()
  }


  createScales() {
    self.xScale = d3.scaleLinear()
      .domain([0, d3.max(self.dataset, function (d: Point) {
        return d.x
      })])
      .range([0, self.width])

    let minValue = d3.min(self.dataset, function (d: Point) {
      return d.y
    })

    self.yScale = d3.scaleLinear()
      .domain([(minValue < 0) ? minValue : 0, d3.max(self.dataset, function (d: Point) {
        return d.y
      })])
      .range([self.height, 0])
  }

  createLine() {
    self.line = d3.line()
      .x((d, i) => {
        return self.xScale(i)
      })
      .y((d: any) => {
        return self.yScale(d.y)
      })
      .curve(self.curve)
  }

  drawAxes() {
    self.svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + self.height + ")")
      .call(d3.axisBottom(self.xScale).ticks(10).tickSize(-self.height));

      self.svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(self.yScale).ticks(10).tickSize(-self.width))

      self.svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(self.yScale).ticks(10).tickSizeInner(30))

      self.svg.append('g')
      .attr('class', 'axis')
      .attr("transform", "translate(0," + self.height + ")")
      .call(d3.axisBottom(self.xScale).ticks(10).tickSizeInner(6))
  }

  drawPath() {
    self.svg.selectAll('.line').remove()

    self.svg.append('path')
      .datum(self.dataset)
      .attr('class', 'line')
      .attr('d', self.line)

  }

  addPoint(point) {
    self.dataset.push(point)
    self.draw()
  }


}