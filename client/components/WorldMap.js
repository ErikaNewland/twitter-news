import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { interpolateHclLong } from 'd3-interpolate'
import { max, min } from 'd3-array'
import { connect } from 'react-redux'
import countryCodes from '../../data/countryCode'
import { transition } from 'd3-transition'
import { geoMercator, geoPath, geoTransform } from 'd3-geo'
import { Map, TileLayer, LatLng } from 'react-leaflet'

export default class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }

  renderMap(tweetData) {
    const node = this.node
    const map = node.leafletElement

    const svg = select(map.getPanes().overlayPane).append("svg"),
      svgCircles = svg.append("g").attr("class", "leaflet-zoom-hide");

    

      var transform = geoTransform({
        point: projectPoint
      }),
        path = geoPath().projection(transform);

      var bounds = path.bounds(tweetData.location),
        topLeft = bounds[0],
        bottomRight = bounds[1];

        tweetData.location.LatLng = new LatLng(tweetData.location.lat, tweetData.location.long)


      var circles = svgCircles.selectAll("circle")
        .data(tweetData.location)
        .enter()
        .append("circle")
        .classed('city', true)
        .attr("r", "8px")
        .attr("fill", "red")
        .transition()
        .delay(1000)
        .remove()

      // Use Leaflet to implement a D3 geometric transformation.
      function projectPoint(x, y) {
        const point = map.latLngToLayerPoint(new LatLng(y, x));
        this.stream.point(point.x, point.y);
      }

      function update() {
        circles.attr("cx", function (d) {
          return map.latLngToLayerPoint(d.LatLng).x;
        });
        circles.attr("cy", function (d) {
          return map.latLngToLayerPoint(d.LatLng).y;
        });
        svg.attr("width", bottomRight[0] - topLeft[0])
          .attr("height", bottomRight[1] - topLeft[1])
          .style("left", topLeft[0] + "px")
          .style("top", topLeft[1] + "px");

        svgCircles.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
      }

      map.on("viewreset", update);
      update();
    }


  componentWillReceiveProps(nextProps) {
        if(nextProps.tweetData.location) {
          this.renderMap(nextProps.tweetData)
        }
      }

  shouldComponentUpdate() {
        return false;
      }

  render() {
        return(
      <Map ref= { node=>this.node = node } center= { [51.505, -0.09]} zoom= { 1.5}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution={`&copy;  <a href=${'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}/> Contributors`}
            />
      </Map>

      
    );
      }
}


// <svg
// width={this.props.width} height={this.props.height}
// ref={node => this.node = node}>
// </svg>