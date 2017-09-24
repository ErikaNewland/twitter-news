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
        tweetCounter: -1
    }
    this.setGeoData = this.setGeoData.bind(this)
  }

  transformGeoData(geoData) {
    return feature(geoData, geoData.objects.countries).features
  }

  setGeoData(props) {
    const geoDataTransformed = this.transformGeoData(props)
    this.setState({
      geoData: geoDataTransformed
    })
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.geoData.arcs) {
      this.setGeoData(nextProps.geoData)
    }
    if(nextProps.tweets[0]){
      let tweetCount = this.state.tweetCounter
      tweetCount++
      this.setState({tweetCounter: tweetCount})
    }
  }

  render() {
    const tweetCounter = this.state.tweetCounter
    return (
      <div>
        <WorldMap
          geoData={this.state.geoData}
          tweetData ={this.props.tweets[tweetCounter]?this.props.tweets[tweetCounter]:{}}
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
    tweets: state.tweets
  }
}

export default connect(mapStateToProps)(MapContainer)