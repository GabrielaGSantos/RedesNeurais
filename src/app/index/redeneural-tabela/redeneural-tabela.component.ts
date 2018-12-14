import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { TrainingOptions } from 'src/app/classes/training-options';
import { TrainingService } from '../training.service';
import { Subject } from 'rxjs';

let self: RedeneuralTabelaComponent

@Component({
  selector: 'app-redeneural-tabela',
  templateUrl: './redeneural-tabela.component.html',
  styleUrls: ['./redeneural-tabela.component.css']
})
export class RedeneuralTabelaComponent implements OnInit {

  

  color = d3.scaleOrdinal(d3.schemeOranges);

  // radius size
  nodeSize: number = 17;
  hiddenLayersDepths = [10, 10, 10, 10, 10];

  inputlayer: number = 4
  hiddenlayer: number = 1;
  hiddenDepth: number = 0;
  outputlayer: number = 2;
  svg: any;

  camadas: number
  neuronios: number
  funcaoAtivacao: string
  taxaAprendizagem: number
  epocas: number

  constructor(public trainingService: TrainingService) {
    self = this
    this.onInputChangeConfig()
    this.onInputChangeHLayerD()
    this.onInputChangeHLayer()
    this.onInputChangeOLayer()
  }

  ngOnInit() {
    if (!d3.select("svg")[0]) {

    } else {
      //clear d3
      d3.select('svg').remove();
    }

    self.svg = d3.select("#nn").append("svg")
      .attr("width", 441)
      .attr("height", 400)

    self.drawNeuralNetwork()
  }

  announceopcoesTreinamento(trainingOptions: TrainingOptions) {
    //self.opcoesTreinamentoAnnounceSource.next(trainingOptions)
    console.log("ok")
    self.camadas = trainingOptions.camadas
    self.neuronios = trainingOptions.neuronios
    self.funcaoAtivacao = trainingOptions.funcaoAtivacao
    self.taxaAprendizagem = trainingOptions.taxaAprendizagem
    self.epocas = trainingOptions.epocas
  }

  onInputChangeConfig() {
    console.log("definindo configurações...");
    self.inputlayer = 4
    self.drawNeuralNetwork();
  }

  onInputChangeHLayer() {
    self.hiddenlayer = 2
    self.drawNeuralNetwork();
  }

  onInputChangeHLayerD() {
    self.hiddenDepth = 3
    self.hiddenLayersDepths = [];
    for (let i: number = 0; i < +self.hiddenlayer; i++) {
      self.hiddenLayersDepths.push(+self.hiddenDepth);
    }
    console.log(self.hiddenLayersDepths);
    self.drawNeuralNetwork();
  }

  onInputChangeOLayer() {
    self.outputlayer = 2
    self.drawNeuralNetwork();
  }

  drawNeuralNetwork() {

    console.log("drawNeuralNetwork")

    self.hiddenLayersDepths = [];
    for (let i: number = 0; i < +self.hiddenlayer; i++) {
      self.hiddenLayersDepths.push(+self.hiddenDepth);
    }

    d3.select('svg').remove();
    self.svg = d3.select("#nn").append("svg")
      .attr("width", 441)
      .attr("height", 400);
    // build nodes 
    let networkGraph = self.buildNodeGraph();
    // draw graph
    self.drawGraph(networkGraph, self.svg);
  }

  buildNodeGraph() {
    var newGraph = {
      "nodes": []
    };

    //construct input layer
    var newFirstLayer = [];

    console.log(self.inputlayer);
    console.log(self.hiddenlayer);
    console.log(self.outputlayer);

    for (var i = 0; i < self.inputlayer; i++) {
      var newTempLayer = { "label": "i " + i, "layer": 1, "type": 1 };
      newFirstLayer.push(newTempLayer);
    }

    //construct hidden layers
    var hiddenLayers = [];
    for (var hiddenLayerLoop = 0; hiddenLayerLoop < self.hiddenlayer; hiddenLayerLoop++) {
      var newHiddenLayer = [];
      //for the height of this hidden layer
      for (var i = 0; i < self.hiddenLayersDepths[hiddenLayerLoop]; i++) {
        var newTempLayer = { "label": "h " + hiddenLayerLoop + i, "layer": (hiddenLayerLoop + 2), "type": 2 };
        newHiddenLayer.push(newTempLayer);
      }
      hiddenLayers.push(newHiddenLayer);
    }

    //construct output layer
    var newOutputLayer = [];
    for (var i = 0; i < self.outputlayer; i++) {
      var newTempLayer = { "label": "o " + i, "layer": self.hiddenlayer + 2, "type": 3 };
      newOutputLayer.push(newTempLayer);
    }

    //add to newGraph
    var allMiddle = newGraph.nodes.concat.apply([], hiddenLayers);
    newGraph.nodes = newGraph.nodes.concat(newFirstLayer, allMiddle, newOutputLayer);

    return newGraph;

  }

  drawGraph(networkGraph, svg) {
    var graph = networkGraph;
    var nodes = graph.nodes;

    // get network size
    var netsize = {};
    nodes.forEach(function (d) {
      if (d.layer in netsize) {
        netsize[d.layer] += 1;
      } else {
        netsize[d.layer] = 1;
      }
      d["lidx"] = netsize[d.layer];
    });

    // calc distances between nodes
    var largestLayerSize = Math.max.apply(
      null, Object.keys(netsize).map(function (i) { return netsize[i]; }));

    var xdist = 400 / Object.keys(netsize).length,
      ydist = (400 - 15) / largestLayerSize;

    // create node locations
    nodes.map(function (d) {
      d["x"] = (d.layer - 0.5) * xdist;
      d["y"] = (((d.lidx - 0.5) + ((largestLayerSize - netsize[d.layer]) / 2)) * ydist) + 10;
    });

    // autogenerate links
    var links = [];
    nodes.map(function (d, i) {
      for (var n in nodes) {
        if (d.layer + 1 == nodes[n].layer) {
          links.push({ "source": parseInt(i), "target": parseInt(n), "value": 1 })
        }
      }
    }).filter(function (d) { return typeof d !== "undefined"; });

    // draw links
    var link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .attr("x1", function (d) { return nodes[d.source].x; })
      .attr("y1", function (d) { return nodes[d.source].y; })
      .attr("x2", function (d) { return nodes[d.target].x; })
      .attr("y2", function (d) { return nodes[d.target].y; })
      .style("stroke-width", function (d) { return Math.sqrt(d.value); });

    // draw nodes
    var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      }
      );

    var circle = node.append("circle")
      .attr("class", "node")
      .attr("r", this.nodeSize)
      .style("fill", function (d) {
        let colourValue = "rgb(224, 24, 29)"
        if (d.type === 1) {
          console.log("input colour");
          colourValue = "rgb(255, 127, 14";
        } else if (d.type === 2) {
          colourValue = "rgb(174, 199, 232)";
        } else {
          colourValue = "rgb(31, 119, 180)";
        }
        return colourValue;
      });


    node.append("text")
      .attr("dx", "-.35em")
      .attr("dy", ".35em")
      .attr("font-size", ".6em")
      .text(function (d) { return d.label; });
  }


  formatLabel(value: number | null) {
    if (!value)
      return 0;

    if (value >= 1000)
      return Math.round(value / 1000) + 'k';

    return value;
  }
}





