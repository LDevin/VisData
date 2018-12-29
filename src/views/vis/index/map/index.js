import React, {Component} from 'react';
import DeckGL, {PolygonLayer, ScatterplotLayer, IconLayer,TextLayer, FlyToInterpolator, PathLayer} from 'deck.gl';
import ReactMapGL, {NavigationControl,StaticMap} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../../../../public/resources/css/map.css';

import MapStyle from 'mapStyle';
import BuildLayer from 'buildLayer';

const bearingSet = {min: -30, init: 0, max: 30};
const pitchSet = {min: 50, max: 60};
const zoomSet = {min: 8.0, max: 20, maxTrans: 15, anit: 1.0, initZoom: 12.655823249249143};
// const lngLatSet = {initLng: 116.398779, initLat: 39.912113};
const lngLatSet = {initLng: 108.31390857696533, initLat: 22.817050141479882};
const lightPositonSet = {lngOffset: 0.06, latOffset: 0.1, 
  minLng: 108.20915222167967, minLat: 22.806250618559172,
  maxLng: 108.40862274169922, maxLat: 22.850550902385194};

const lightLngOffset = (lightPositonSet.maxLng - lightPositonSet.minLng) / 100;
const lightLatOffset = (lightPositonSet.maxLat - lightPositonSet.minLat) / 100;

// const LIGHT_SETTINGS = {
//   lightsPosition: [lngLatSet.initLng, lngLatSet.initLat, 9000, 
//     lngLatSet.initLng + lightPositonSet.lngOffset, lngLatSet.initLat + lightPositonSet.latOffset, 10000],
//   ambientRatio: 0.05,
//   diffuseRatio: 0.6,
//   specularRatio: 0.5,
//   lightsStrength: [3.0, 1.5, 1.0, 0.1, 2.0, 0.1, 0.1, 0.1],
//   numberOfLights: 2
// };

const LIGHT_SETTINGS = {
  lightsPosition: [lngLatSet.initLng, lngLatSet.initLat, 1000],
  ambientRatio: 0.05,
  diffuseRatio: 0.5,
  specularRatio: 0.7,
  lightsStrength: [8.0, 8.0, 8.0, 8.0 /****, 2.0, 0.1, 0.1, 0.1*****/],
  numberOfLights: 1
};

const INITIAL_VIEW_STATE = {
  latitude: 22.817050141479882,
  // latitude:39.912113,
  longitude:  108.31390857696533,
  // longitude:116.398779,
  zoom: zoomSet.initZoom,
  maxZoom: zoomSet.max,
  minZoom: zoomSet.min,
  pitch: pitchSet.min,
  bearing: bearingSet.init
};

export default class App extends Component {

    constructor() {
      super();
      this.state = {
          buildData: BuildLayer,
          viewState: {...INITIAL_VIEW_STATE},
          count: 2,
      }
    //   this.state = {
    //     time: 0,
    //     pathData: [{segments: []}],
    //     tripData: [],
    //     buildData: [],
    //     boudaryDara: [],
    //     lgJiedaoData: [],
    //     hoverTip: {hoveredObject: null},
    //     viewState: {...INITIAL_VIEW_STATE}
    //   };
       this._onViewStateChange = this._onViewStateChange.bind(this);
    //   this._onHover = this._onHover.bind(this);
    //   this._renderTooltip = this._renderTooltip.bind(this);
    //   this._animateViewState = this._animateViewState.bind(this);
  
    //   this.bearingOverFlow = false;
    //   this.pitchOverFlow = false;
    //   this.lightPosUpMaxOverFlow = false;
    //   this.zoomTransCount = 0;
    //   this.zoomDesOffset = 0;
  
    //   this.lightSet = LIGHT_SETTINGS;
    //   this.buildOpacity = 0.7;
    //   this.pathColor = [37, 183, 144, 150];
  
    //   this.pathColorOverFlow = false;
    //   this.pathRColorOverFlow = false;
  
    //   this.pathBColorOverFlow = false;
    //   this.pathGColorOverFlow = false;
    }
  
    componentDidMount() {
        this.setState({count: 3});
     // this.props.onRef(this);
     // this._animate();
      // this._changeAnimationViewState();
      //this._startAnimatePathTimer();
      //boudaryDara: LgJiedaoBoundary, lgJiedaoData: LgJiedaoName
     // this.setState({...this.state, tripData: LonggangRoadJson, buildData: BuildJson,boudaryDara: LgJiedaoBoundary, lgJiedaoData: LgJiedaoName});
    }
  
    _changeAnimationViewState() {
    //   let self = this;
    //   var saver = new ScreenSaver({timeout : 600000}, function(timeouted) {
    //     if (timeouted) {
    //       self.lightPosUpMaxOverFlow = false;
  
    //       let {lightsPosition} = self.lightSet;
    //       lightsPosition[0] = lightPositonSet.minLng;
    //       lightsPosition[1] = lightPositonSet.minLat;
    //      // lightsPosition[3] = lightPositonSet.minLng + lightPositonSet.lngOffset;
    //      // lightsPosition[4] = lightPositonSet.minLat + lightPositonSet.latOffset;
  
    //       self.intervalViewTimer = window.setInterval(self._animateViewState, 20);
    //     } else {
    //       self.zoomDesOffset = 0;
    //       self.zoomTransCount = 0;
    //       this.lightSetOffset = 0;
  
    //       if (self.intervalViewTimer != null) {
    //           window.clearInterval(self.intervalViewTimer)
    //       }
    //     }
    //   });
    }
  
    // _animateViewState() {
    //   let bearing = 0, pitch = pitchSet.max, zoom = zoomSet.min,
    //   bearingOffset = 0.06, pitchOffset = 0.02, 
    //   zoomOffset = 0.004; //zoomOffset为偶数 1/zoomOffset为整数
  
    //   let {lightsPosition} = this.lightSet;
    //   let lng = lightsPosition[0], lat = lightsPosition[1];
      
    //   if (this.lightPosUpMaxOverFlow) {
    //     if (lng <= lightPositonSet.minLng || lat <= lightPositonSet.minLat) {
    //       this.lightPosUpMaxOverFlow = false;
    //       lng += lightLngOffset;
    //       lat += lightLatOffset;
    //     } else {
    //       lng -= lightLngOffset;
    //       lat -= lightLatOffset;
    //     }
    //   } else {
    //     if (lng >= lightPositonSet.maxLng || lat >= lightPositonSet.maxLat) {
    //       this.lightPosUpMaxOverFlow = true;
    //     } else {
    //       lng += lightLngOffset;
    //       lat += lightLatOffset;
    //     }
    //   }
  
    //   lightsPosition[0] = lng;
    //   lightsPosition[1] = lat;
    //   //lightsPosition[3] = lng + lightPositonSet.lngOffset;
    //   //lightsPosition[4] = lat + lightPositonSet.latOffset;
  
    //   //bearing
    //   if (this.bearingOverFlow) {
    //     if (this.state.viewState.bearing <= bearingSet.min) {
    //       this.bearingOverFlow = false;
    //       bearing = this.state.viewState.bearing;
    //     } else {
    //       bearing = this.state.viewState.bearing - bearingOffset
    //     }
    //   } else {
    //     if (this.state.viewState.bearing >= bearingSet.max) {
    //       this.bearingOverFlow = true;
    //       bearing = this.state.viewState.bearing;
    //     } else {
    //       bearing = this.state.viewState.bearing + bearingOffset
    //     }
    //   }
  
    //   //pitch
    //   if (this.pitchOverFlow) {
    //     if (this.state.viewState.pitch <= pitchSet.min) {
    //       this.pitchOverFlow = false;
    //       pitch = this.state.viewState.pitch;
    //     } else {
    //       pitch = this.state.viewState.pitch - pitchOffset
    //     }
    //   } else {
    //     if (this.state.viewState.pitch >= pitchSet.max) {
    //       this.pitchOverFlow = true;
    //       pitch = pitchSet.max;
    //     } else {
    //       pitch = this.state.viewState.pitch + pitchOffset;
    //     }
    //   }
  
    //   // //zoom
    //   if (this.zoomTransCount >= parseInt((zoomSet.anit / zoomOffset))) { 
    //       this.zoomDesOffset++;
    //       if (this.zoomDesOffset <= this.zoomTransCount) {
    //         zoom = this.state.viewState.zoom - zoomOffset;
    //       } else {
    //         zoom = this.state.viewState.zoom
    //         this.zoomDesOffset = 0;
    //         this.zoomTransCount = 0;
    //       }
    //   } else {
    //     this.zoomTransCount++;
    //     if (this.state.viewState.zoom >= zoomSet.maxTrans) {
    //       zoom = this.state.viewState.zoom;
    //       this.zoomTransCount = parseInt((zoomSet.anit / zoomOffset));
    //     } else {
    //       zoom = this.state.viewState.zoom + zoomOffset;
    //     }
    //   }
    //   let newViewState = Object.assign({}, this.state.viewState, {bearing: bearing, pitch: pitch, zoom: zoom})
    //   this.setState({viewState: newViewState})
    // }
  
    componentWillUnmount() {
    //   if (this._animationFrame) {
    //       window.cancelAnimationFrame(this._animationFrame);
    //   }
    //   if (this.intervalViewTimer != null) {
    //       window.clearInterval(this.intervalViewTimer)
    //   }
    }
  
    // _animate() {
    //   const {
    //     loopLength = 1200, // unit corresponds to the timestamp in source data
    //     animationSpeed = 100 // unit time per second
    //   } = this.props;
  
    //   const timestamp = Date.now() / 1000;
    //   const loopTime = loopLength / animationSpeed;
    //   const loopTime2 = (loopLength + 400) / animationSpeed;
    //   const loopTime3 = (loopLength + 800) / animationSpeed;
    //   const loopTime4 = (loopLength + 1200) / animationSpeed;
  
    //   //console.log('((timestamp % loopTime) / loopTime) * loopLength ',((timestamp % loopTime) / loopTime) * loopLength)
    //   let _time = ((timestamp % loopTime) / loopTime) * loopLength;
    //   let _time2 = ((timestamp % loopTime2) / loopTime2) * (loopLength + 400);
    //   let _time3 = ((timestamp % loopTime3) / loopTime3) * (loopLength + 800);
    //   let _time4 = ((timestamp % loopTime4) / loopTime4) * (loopLength + 1200);
  
    //   this.setState({
    //     time: _time,
    //     time2: _time2,
    //     time3: _time3,
    //     time4: _time4,
    //   });
  
    //   this._transitionPathColor();
    //   this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
    // }
  
    // _transitionPathColor() {
  
    //   if (this.pathColorOverFlow) {
    //     if (this.pathColor[3] <= 100) {
    //       this.pathColorOverFlow = false;
    //       this.pathColor[3] = 100;
    //     } else {
    //       this.pathColor[3] = this.pathColor[3] - 0.15;
    //     }
    //   } else {
    //     if (this.pathColor[3]  >= 200) {
    //       this.pathColorOverFlow = true;
    //       this.pathColor[3] = 200;
    //     } else {
    //       this.pathColor[3] = this.pathColor[3] + 0.15;
    //     }
    //   }
  
    //   if (this.pathRColorOverFlow) {
    //     if (this.pathColor[0] <= 100) {
    //       this.pathRColorOverFlow = false;
    //       this.pathColor[0] = 100;
    //     } else {
    //       this.pathColor[0] = this.pathColor[0] - 0.25;
    //     }
    //   } else {
    //     if (this.pathColor[0]  >= 200) {
    //       this.pathRColorOverFlow = true;
    //       this.pathColor[0] = 200;
    //     } else {
    //       this.pathColor[0] = this.pathColor[0] + 0.25;
    //     }
    //   }
  
    //   if (this.pathBColorOverFlow) {
    //     if (this.pathColor[2] <= 80) {
    //       this.pathBColorOverFlow = false;
    //       this.pathColor[2] = 80;
    //     } else {
    //       this.pathColor[2] = this.pathColor[2] - 0.5;
    //     }
    //   } else {
    //     if (this.pathColor[2]  >= 150) {
    //       this.pathBColorOverFlow = true;
    //       this.pathColor[2] = 150;
    //     } else {
    //       this.pathColor[2] = this.pathColor[2] + 0.5;
    //     }
    //   }
  
    //   if (this.pathGColorOverFlow) {
    //     if (this.pathColor[1] <= 80) {
    //       this.pathGColorOverFlow = false;
    //       this.pathColor[1] = 80;
    //     } else {
    //       this.pathColor[1] = this.pathColor[1] - 0.23;
    //     }
    //   } else {
    //     if (this.pathColor[1]  >= 130) {
    //       this.pathGColorOverFlow = true;
    //       this.pathColor[1] = 130;
    //     } else {
    //       this.pathColor[1] = this.pathColor[1] + 0.23;
    //     }
    //   }
  
    // }
  
    _onViewStateChange({viewState}) {
      this.setState({viewState});
      console.log('view state ',viewState);
      //this.setState({count: 10})
      //const lng = viewState.longitude, lat = viewState.latitude;
    //   let {lightsPosition} = this.lightSet;
    //   lightsPosition[0] = lng;
    //   lightsPosition[1] = lat;
    //  // lightsPosition[3] = lng + lightPositonSet.lngOffset;
    //  // lightsPosition[4] = lat + lightPositonSet.latOffset;
  
    //   if (lng > lightPositonSet.maxLng) {
    //      this.lightSetOffsetFlag = 1
    //   } else if (lng < lightPositonSet.minLng) {
    //      this.lightSetOffsetFlag = -1
    //   } else {
    //      this.lightSetOffsetFlag = 0
    //   }
  
    }
  
    // _handleBoundaryClick(info) {
    //     // this.props.cacheData.relatedId = info.object.id;
    //     // this.props.cacheData.mapProps.zoneType++;
    //     // window.model.getMenuData(this.props.cacheData.menuNum,  this.props.cacheData);
  
    //     // this.setViewState(info.lngLat[0], info.lngLat[1], 14.0)
    // }
  
    // setViewState(lng, lat, zoom) {
    //   this.setState({viewState: {...this.state.viewState, 
    //     longitude: lng, latitude: lat, zoom: zoom,
    //     transitionDuration: 600,
    //     transitionInterpolator: new FlyToInterpolator()}})
    // }
  
    // _onHover({x, y, object}) {
    //   this.setState({...this.state, hoverTip: {x, y, hoveredObject: object}});
    // }
  
    // _renderTooltip() {
    //   const {x, y, hoveredObject} = this.state.hoverTip;
    //   console.log('this.state ', hoveredObject)
    //   return (
    //     hoveredObject && (
    //       <div className="tooltip" style={{top: y, left: x}}>
    //         <div>
    //           <b>{hoveredObject.name}</b>
    //         </div>
    //       </div>
    //     )
    //   );
    // }
  
    // _parseGridZoneColor(d) {
    //   var colors = [171, 232, 63, 230];
    //   if (d != null && d.id != null) {
    //       switch(d.id) {
    //         case 1189: colors = [255, 113, 45, 245]; break;//马山县政府
    //         case 1188: colors = [255, 140, 40, 245]; break; //隆安县政府
    //         case 1187: colors = [255, 177, 33, 245]; break; //上林县政府
    //         case 1186: colors = [255, 209, 28, 245]; break;//宾阳县政府
    //         case 1185: colors = [232, 224, 35, 245]; break; //横县政府
    //         case 1184: colors = [203, 227, 48, 245]; break; //武鸣区政府
    //         case 1183: colors = [171, 232, 63, 245]; break;//邕宁区政府
    //         case 1182: colors = [137, 236, 79, 245]; break; //良庆区政府
    //         case 1181: colors = [101, 242, 96, 245]; break; //西乡塘区政府
    //         case 1180: colors = [71, 245, 109, 245]; break;//江南区政府
    //         case 1179: colors = [36, 250, 126, 245]; break; //兴宁区政府
    //         case 1177: colors = [3, 254, 141, 245]; break; //青秀区政府
    //         case 1205: colors = [255, 10, 64, 245]; break;//高新区政府
    //         case 1201: colors = [255, 77, 52, 245]; break; //华侨区政府
    //         case 1203: colors = [255, 43, 58, 245]; break; //经开区政府
    //       }
    //   }
  
    //   return colors;
    // }
  
    _renderLayers() {
    //   const {ZoneLngLatData,RankListData,RiskAreaData,IconSpotData, videoIconData,gridZoneWarnData, gridZoneWarnVisible} 
    //   = this.props.cacheData.mapProps;

      //const {menuNum} = this.props.cacheData;
      //const trailLength = 300;
  
      return [
        new PolygonLayer({
          id: 'buildings',
          data: this.state.buildData,//BuildJson,
          extruded: true,
          wireframe: false,
          fp64: true,
          opacity: 0.7,// this.buildOpacity,
          elevationScale: 1,
          getPolygon: f => f.polygon,
          getElevation: f => f.height,
          getFillColor: [74, 80, 87],
         // lightSettings: this.lightSet,
        //   updateTriggers: {
        //     lightSettings: [this.lightSet],
        //     opacity: [this.buildOpacity]
        //   },
          getPolygonOffset: ({layerIndex}) => [0, layerIndex * 101],
        }),

      ];
    }
  
    render() {
     // const {mapDataLoading, mapDataErrCon, mapDataErrConShow} = this.props.cacheData;
      const {viewState} = this.state;
//onViewStateChange={this._onViewStateChange}


      return (
          <div className="map-container" id="map">
            <DeckGL
                layers={this._renderLayers()}
                initialViewState={INITIAL_VIEW_STATE}
                viewState={viewState}
                controller={true}
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
  