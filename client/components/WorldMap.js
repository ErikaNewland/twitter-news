import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { interpolateHclLong } from 'd3-interpolate'
import { max, min } from 'd3-array'
import { connect } from 'react-redux'
import countryCodes from '../../data/countryCode'
import { transition } from 'd3-transition'
import { geoMercator, geoPath, geoTransform } from 'd3-geo'
import { Map, TileLayer} from 'react-leaflet'
import L from 'leaflet'

export default class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }


  renderMap(tweetData) {
    const node = this.node
    const map = node.leafletElement
    
    const svg = select(map.getPanes().overlayPane).append("svg")
    const g = svg.append("g").attr("class", "leaflet-zoom-hide");

    tweetData.location.LatLng = new L.LatLng(tweetData.location.lat, tweetData.location.long)

    console.log('tweetData', tweetData.location)
    const circle = g.selectAll("circle")
      .data([tweetData.location])
      .enter()
      .append("circle")
      .classed('city', true)
      .attr("r", "8px")
      .attr("fill", "red")
      .attr("transform",
      function (d) {
        console.log('d', d)
        console.log('d.LatLng', d.LatLng)
        return "translate(" +
          map.latLngToLayerPoint(d.LatLng).lng + "," +
          map.latLngToLayerPoint(d.LatLng).lat + ")";
      })
      // .transition()  //may need to move this to update
      // .delay(1000)
      // .remove()

    map.on("viewreset", update);
    update();

    function update() {
      circle.attr("transform",
        function (d) {
          console.log('d', d)
          return "translate(" +
            map.latLngToLayerPoint(d.LatLng).lng + "," +
            map.latLngToLayerPoint(d.LatLng).lat + ")";
        })
      }
  }


    componentWillReceiveProps(nextProps) {
      if (nextProps.tweetData.location) {
        this.renderMap(nextProps.tweetData)
      }
    }

    shouldComponentUpdate() {
      return false;
    }

    render() {
      return (
        <Map ref={node => this.node = node} center={[51.505, -0.09]} zoom={1.5}>
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