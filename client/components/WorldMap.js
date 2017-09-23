import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { interpolateHclLong } from 'd3-interpolate'
import { max, min } from 'd3-array'
import { connect } from 'react-redux'
import countryCodes from '../../data/countryCode'
import { transition } from 'd3-transition'
import { geoMercator, geoPath } from 'd3-geo'
import {removeTweetLocation} from '../store'


class WorldMap extends Component {
  constructor(props) {
    super(props)
    this.renderMap = this.renderMap.bind(this)
  }





  renderMap(geoData) {
    const node = this.node
    const width = node.width.animVal.value
    const height = node.height.animVal.value

    const projection=() =>{
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
          .attr("d", geoPath().projection(projection(width, height))(d))  //!!!!refactor to remove projection function from here
      })



  }


  appendLocation(location) {
    //append a circle in the capital for each country

    //later append a circle in each location for other location types
  }

  componentWillReceiveProps(nextProps) {
    console.log("running")
    if (nextProps.geoData.length) {
      this.renderMap(nextProps.geoData)
    }
    if (nextProps.location) {
      nextProps.removeTweetLocation(nextProps.location)          
      this.appendLocation(nextProps.location)
    }
  }


  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg
        width={this.props.width} height={this.props.height}
        ref={node => this.node = node}
        onClick={() => this.props.onClick(undefined, this.node)}>
      </svg>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    removeTweetLocation: function(tweet){
      dispatch(removeTweetLocation(tweet))
    }
  }
}


export default connect(null, mapDispatchToProps)(WorldMap)