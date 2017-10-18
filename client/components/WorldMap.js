import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { interpolateHclLong } from 'd3-interpolate'
import { max, min } from 'd3-array'
import { connect } from 'react-redux'
import countryCodes from '../../data/countryCode'
import * as d3 from 'd3'
import { transition } from 'd3-transition'
import { geoMercator, geoPath, geoTransform, geoStream } from 'd3-geo'
import { Map, TileLayer } from 'react-leaflet'
import L from 'leaflet'

export default class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }


  renderMap(tweetData, geoData) {
    console.log('stream', geoStream)
    const node = this.node
    const map = node.leafletElement

    const svg = select(map.getPanes().overlayPane).append("svg")
    const g = svg.append("g").attr("class", "leaflet-zoom-hide");

    // if(tweetData.location.lat === "D.C.") {
    //   tweetData.location.lat = 38.9072
    //   tweetData.location.long = 77.0369
    // }

    let box = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [tweetData.lat + 1, tweetData.long + 1],
            [tweetData.lat + 1, tweetData.long - 1],
            [tweetData.lat - 1, tweetData.long + 1],
            [tweetData.lat - 1, tweetData.long - 1],
          ]]
        }
      }
      ]
    }

    tweetData.location.LatLng = new L.LatLng(tweetData.location.lat, tweetData.location.long)

    function projectPoint(x, y) {
      const point = map.latLngToLayerPoint(tweetData.location.LatLng);
      this.stream.point(point.x, point.y);
    }

    const transform = geoTransform({ point: projectPoint })
    const path = geoPath().projection(transform);
    
    update();
    
    function update() {
      const bounds = path.bounds(box)  //set bounds here
      const topLeft = bounds[0];
      const bottomRight = bounds[1];
      
      svg.attr("width", "16px")
      .attr("height", "16px")
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
      
      g.attr("transform", "translate(" + (-topLeft[0] + 4) + "," + (-topLeft[1] + 4) + ")")
      .attr("height", "16px")
      .attr("width", "16px");
      
      const circle = g.selectAll("circle")
        .data([tweetData.location])
        .enter()
        .append("circle")
        .classed('city', true)
        .attr("r", "4px")
        .attr("fill", "red")
        .transition()
        .delay(1000)
        .duration(1000)
        .remove()
  
      circle.attr("transform",
        function (d) {
          const point = map.latLngToLayerPoint(d.LatLng)
          return `translate(${point.x}, ${point.y})`
        })
    }
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.tweetData.location) {
      this.renderMap(nextProps.tweetData, nextProps.geoData)
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() { 
    return (  //need onZoom functionality 
      <Map onZoomed = {this.renderMap} ref={node => this.node = node} center={[51.505, -0.09]} zoom={1.5} onZoomend={this.update}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution={`&copy;  <a href=${'http://{s}.tile.osm.org/{z}/{x}/{y}.png'}/> Contributors`}
        />
      </Map>


    );
  }
}


