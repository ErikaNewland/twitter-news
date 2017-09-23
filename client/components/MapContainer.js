import React, { Component } from 'react'
import WorldMap from './WorldMap'
import { connect } from 'react-redux'
import { select } from 'd3-selection'
import { feature } from 'topojson-client'



class MapContainer extends Component {

  constructor(props) {
    super(props)
      this.state = {
        geoData:[],
    }
    // this.handleTweet = this.handleTweet.bind(this)
    this.setGeoData = this.setGeoData.bind(this)
  }

  
  //uses topojson-client library method 'feature' to transform topo-json map data into geo-json map data
  //function is in container becaues it will not be required for map data already in geo-json format
  transformGeoData(geoData) {
    console.log('transforming')
    return feature(geoData, geoData.objects.countries).features
  }

  setGeoData(props) {
    const geoDataTransformed = this.transformGeoData(props)
    this.setState({
      geoData: geoDataTransformed
    })
  }


  //runs the function when the store has updated with the data from various data sources
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    if(nextProps.geoData.arcs) {
      this.setGeoData(nextProps.geoData)
    }
  }


  render() {
    return (
      <div>
        <WorldMap
          geoData={this.state.geoData}
          location = {this.state.tweetLocations? this.state.tweetLocations[0] : ""}
          width={1000}
          height={500}
        />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    geoData: state.geoData,
    tweetLocations: state.tweetLocations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeTweetLocation: function(tweet){
      dispatch(removeTweetLocation(tweet))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)