import React, { Component } from 'react';
import * as d3 from 'd3';
import { albums } from '../data.json';

const w = 900;
const h = 500;

export default class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      albums: albums.sort((a, b) => {
        if (a.year < b.year) return -1;
        if (a.year > b.year) return 1;
        else return 0;
      }),
    };
  }
  componentDidMount() {
    this.drawChart();
  }
  render() {
    console.log(albums);
    return <div />;
  }

  drawChart() {
    function customYAxis(g) {
      g.call(yAxis);
      g.select('.domain').remove();
      g.selectAll('.tick:not(:first-of-type) line')
        .attr('stroke', '#777')
        .attr('stroke-dasharray', '2,2');
      g.selectAll('.tick text')
        .attr('x', 4)
        .attr('dy', -4);
    }
    function customXAxis(g) {
      g.call(xAxis);
      g.select('.domain').remove();
    }
    var x = d3
      .scaleTime()
      .domain([
        this.state.albums[0].year,
        this.state.albums[this.state.albums.length - 1].year,
      ])
      .range([0, w]);
    var y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([h, 0]);

    var xAxis = d3.axisBottom(x).tickFormat(d3.timeYear);
    var yAxis = d3.axisRight(y).tickSize(w);

    // var scale = d3
    //   .scaleTime()
    //   .domain([
    //     this.state.albums[0].year,
    //     this.state.albums[this.state.albums.length - 1].year,
    //   ])
    //   .range([0, w - 100]);

    // var x_axis = d3.axisBottom().scale(scale);

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('margin-left', 100)
      .style('margin-bottom', 100);
    var g = svg
      .append('g')
      .attr('transform', 'translate(' + 20 + ',' + 20 + ')');
    g.append('g')
      //   .attr('transform', 'translate(0,' + h + ')')
      .call(customXAxis);
    g.append('g').call(customYAxis);

    // x.domain(d3.extent(albums, d => d.year));
    // y.domain([0, d3.max(albums, d => d.freq)]);
    svg.append('g').call(d3.axisBottom(x));
    // svg
    //   .selectAll('rect')
    //   .data(this.state.albums)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d, i) => i * 20)
    //   .attr('y', (d, i) => h - 7.5 * d.freq)
    //   .attr('width', 15)
    //   .attr('height', (d, i) => d.freq * 7.5)
    //   .attr('fill', 'green');
    // svg
    //   .selectAll('text')
    //   .data(this.state.albums)
    //   .enter()
    //   .append('text')
    //   .text(d => d.freq)
    //   .attr('x', (d, i) => i * 20)
    //   .attr('y', (d, i) => h - 7.5 * d.freq - 5);
  }
}
