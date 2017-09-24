import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { interpolateHclLong } from 'd3-interpolate'
import { max, min } from 'd3-array'
import { connect } from 'react-redux'
import countryCodes from '../../data/countryCode'
import { transition } from 'd3-transition'
import { geoMercator, geoPath } from 'd3-geo'
import { removeTweetLocation } from '../store'


export default class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }

  renderMap(geoData, tweetData) {
    const node = this.node
    const width = node.width.animVal.value
    const height = node.height.animVal.value

    const projection = () => {
      return geoMercator()
        .scale(100)
        .translate([width / 2, height / 1.5])
    }

    select(node)
      .append('g')
      .classed('countries', true)

    const countries = select('g')
      .selectAll('path')
      .data(geoData)

    countries.enter()
      .append('path')
      .classed('country', true)
      .attr("stroke", "black")
      .attr("strokeWidth", 0.75)
      .attr("fill", "grey")
      .each(function (d, i) {
        select(this)
          .attr("d", geoPath().projection(projection())(d))  
      })
      .merge(countries)

      
      if (tweetData.location) {
      const location = tweetData.location
      console.log('location', location)
      const cities = select('g')
        .selectAll('circle')
        .data([[Number(location.long), Number(location.lat)]])

      cities.enter()
        .append("circle")
        .classed('city', true)
        .attr("cx", function (d) { 
          return projection()(d)[0] 
        })
        .attr("cy", function (d) { return projection()(d)[1] })
        .attr("r", "4px")
        .attr("fill", "red")
        .transition()
          .delay(500)
          .remove()


        
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.geoData.length) {
      this.renderMap(nextProps.geoData, nextProps.tweetData)
    }
  }


  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg
        width={this.props.width} height={this.props.height}
        ref={node => this.node = node}>
      </svg>
    );
  }
}


