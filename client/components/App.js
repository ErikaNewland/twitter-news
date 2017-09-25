import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection'
import { connect } from 'react-redux'
import { gettingGeoData } from '../store'
import MapContainer from './MapContainer'
import Header from './Header'
import Footer from './Footer'

class App extends Component {

  componentDidMount() {
    this.props.gettingGeoData()

  }

  render() {
    return (
      <div>
        <Header />
        <MapContainer />
        <Footer />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    gettingGeoData: function () {
      return dispatch(gettingGeoData())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)