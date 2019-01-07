import React, {Component} from 'react';
import DeckGL from 'deck.gl';
import ReactMapGL, {NavigationControl,StaticMap} from 'react-map-gl';
import {connect} from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../../../../public/resources/css/map.css';  

import Layers from './layers';

import MapStyle from 'mapStyle';
import BuildLayer from 'buildLayer';

const bearingSet = {min: -30, init: 0, max: 30};
const pitchSet = {min: 50, max: 60};
const zoomSet = {min: 8.0, max: 20, maxTrans: 15, anit: 1.0, initZoom: 12.655823249249143};

const lngLatSet = {initLng: 108.31390857696570, initLat: 22.837050141589999};
const lightPositonSet = {lngOffset: 0.06, latOffset: 0.1, 
  minLng: 107.00515222167967, minLat: 22.806250618559172,
  maxLng: 108.48862274169922, maxLat: 22.990550902385194};

const lightLngOffset = (lightPositonSet.maxLng - lightPositonSet.minLng) / 1000;
const lightLatOffset = (lightPositonSet.maxLat - lightPositonSet.minLat) / 1000;

const __LIGHT_SET = {init: 0.0, max: 5000.0, _init: 80.0, _max: 80.0}

const LIGHT_SETTINGS = {
  lightsPosition: [lngLatSet.initLng,lngLatSet.initLat, 1000,lngLatSet.initLng , lngLatSet.initLat , 8000],
  ambientRatio: 0.01,
  diffuseRatio: 0.02,
  specularRatio: 0.5,
  lightsStrength: [__LIGHT_SET._init, 0.0, 10.0, 0.0],
  numberOfLights: 2,
};

const INITIAL_VIEW_STATE = {
  latitude: 22.817050141479882,
  longitude:  108.31390857696533,
  zoom: zoomSet.initZoom,
  maxZoom: zoomSet.max,
  minZoom: zoomSet.min,
  pitch: pitchSet.min,
  bearing: bearingSet.init
};

const mapStateToProps = state => {
  return {map: state.map}
}

const mapDispathToProps = dispatch => {
  return {
      onClick: (index) => {
         let action = bindActions.changeUserName('laiddddevin');
         if (index === 2)
              action = bindActions.changeBase('5555555');

         dispatch(action);
         console.log(' day = ', Store.getState().base.day);
      }
  }
}

class App extends Component {

    constructor() {
      super();
      this.state = {
          viewState: {...INITIAL_VIEW_STATE},
          time:0,
          buildings: BuildLayer,
          buildslight: {...LIGHT_SETTINGS}
      }

       this._onViewStateChange = this._onViewStateChange.bind(this);
       this._animateViewState = this._animateViewState.bind(this);
    }

    componentDidMount() {
      this._animate()
      this.intervalViewTimer = window.setInterval(this._animateViewState, 30);
    }
  
    _changeAnimationViewState() {

    }
    _animate() {
      const {
        loopLength = 1800, // unit corresponds to the timestamp in source data
        animationSpeed = 30 // unit time per second
      } = this.props;
      const timestamp = Date.now() / 1000;
      const loopTime = loopLength / animationSpeed;
  
      this.setState({
        time: ((timestamp % loopTime) / loopTime) * loopLength
      });
      this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
    }
    _animateViewState() {
      let {lightsPosition, lightsStrength} = this.state.buildslight;
      let lng = lightsPosition[0], 
      lat = lightsPosition[1], lightS = lightsStrength[0];

      if (this.lightPosUpMaxOverFlow) {
        if (lng <= lightPositonSet.minLng || lat <= lightPositonSet.minLat) {
          this.lightPosUpMaxOverFlow = false;
          lng += lightLngOffset;
          lat += lightLatOffset;
        } else {
          lng -= lightLngOffset;
          lat -= lightLatOffset;
        }
      } else {
        if (lng >= lightPositonSet.maxLng || lat >= lightPositonSet.maxLat) {
          this.lightPosUpMaxOverFlow = true;
        } else {
          lng += lightLngOffset;
          lat += lightLatOffset;
        }
      }
  
      lightsPosition[0] = lng;
      lightsPosition[1] = lat;

      this.setState({buildslight: {...this.state.buildslight, lightsPosition: [...this.state.buildslight.lightsPosition], 
      lightsStrength: [...this.state.buildslight.lightsStrength]}})
    }
  
    componentWillUnmount() {
      if (this._animationFrame) {
          window.cancelAnimationFrame(this._animationFrame);
      }
      if (this.intervalViewTimer != null) {
          window.clearInterval(this.intervalViewTimer)
      }
    }

    _onViewStateChange({viewState}) {
      this.setState({viewState});
      let zoom = viewState.zoom
      if (viewState.zoom > 16) {
          zoom = 16
      }

     let pos = 500 + (7200 - (zoom - 8) * 900)
     const {lightsPosition} = this.state.buildslight;
     lightsPosition[2] = pos;
     this.setState({buildslight: {...this.state.buildslight, lightsPosition: [...this.state.buildslight.lightsPosition], 
      lightsStrength: [...this.state.buildslight.lightsStrength]}})
    }
  
    render() {
      const {viewState} = this.state;
      return (
          <div className="map-container" id="map">
            <DeckGL
                layers={Layers.call(this)}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                viewState={viewState}
                onViewStateChange={this._onViewStateChange}
                >
                <StaticMap
                preventStyleDiffing={true}
                reuseMaps
                mapStyle={MapStyle}
                />
            </DeckGL>
          </div>
      );
    }
  };

  export default connect(mapStateToProps, mapDispathToProps)(App);
  