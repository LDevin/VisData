import DeckGL, {PolygonLayer, ScatterplotLayer, PointCloudLayer, HexagonLayer,IconLayer,TextLayer, FlyToInterpolator, PathLayer,COORDINATE_SYSTEM} from 'deck.gl';
import {TripsLayer} from '@deck.gl/experimental-layers';
import PathLayerData from '../../../../public/resources/data/road_path.json';
import RoadTripData from '../../../../public/resources/data/road_lg1.json';

const bearingSet = {min: -30, init: 0, max: 30};
const pitchSet = {min: 50, max: 60};
const zoomSet = {min: 8.0, max: 20, maxTrans: 15, anit: 1.0, initZoom: 12.655823249249143};
// const lngLatSet = {initLng: 116.398779, initLat: 39.912113};
const lngLatSet = {initLng: 108.31390857696570, initLat: 22.837050141589999};
const lightPositonSet = {lngOffset: 0.06, latOffset: 0.1, 
  minLng: 107.00515222167967, minLat: 22.806250618559172,
  maxLng: 108.48862274169922, maxLat: 22.990550902385194};

const lightLngOffset = (lightPositonSet.maxLng - lightPositonSet.minLng) / 1000;
const lightLatOffset = (lightPositonSet.maxLat - lightPositonSet.minLat) / 1000;

const LIGHT_SETTINGSss = {
    lightsPosition: [lngLatSet.initLng,lngLatSet.initLat, 8000,lngLatSet.initLng - 1.8 , lngLatSet.initLat - 2.0 , 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

const HexLayColorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

export default function layers() {
    return [
        new IconLayer({
            id:'icon-layer_1',
            data: this.props.map.icons,
            pickable: true,
            autoHighlight:true,
            iconAtlas: require('../../../../public/resources/images/icon-atlas.png'),
            iconMapping: {
                marker: {
                  x: 0,
                  y: 0,
                  width: 128,
                  height: 128,
                  anchorY: 128,
                  mask: true
                }
            },
            sizeScale: 15,
            wrapLongitude: true,
            getPosition: d => d.coordinates,
            getIcon: d => 'marker',
            getColor: d => [150, 223, 0],
            getSize: Math.pow(1.3, this.state.viewState.zoom - 12)
        }),
        new PointCloudLayer({
            id: 'point-cloud-layer_1',
            data: this.props.map.pointClouds,
            pickable: true,
            autoHighlight:true,
            radiusPixels: Math.pow(1.5, this.state.viewState.zoom - 10) + 5,
            getPosition: d => d.coordinates,
            getColor: [254, 151, 13],
            lightSettings:{}
        }),
        new TextLayer({
            id: 'text-layer_1',
            data: this.props.map.texts,
            pickable: true,
            extruded: true,
            sizeScale: 3,
            getColor: [223, 244, 239],
            getTextAnchor: 'middle',
            getAlignmentBaseline: 'bottom',
            getPosition: d => d.coordinates, //[x,y,z]
            getText: d => d.name,
            getAngle: -20,
            characterSet:['青', '区', '秀', '武', '宁', '横', '县','街','道'],
            getSize: Math.pow(1.5, this.state.viewState.zoom - 5),
        }),
        new HexagonLayer({
              id: 'hexagon-layer_1',
              data: this.props.map.hexs,
              colorRange: HexLayColorRange,
              coverage: 0.2,
              upperPercentile: 100,
              pickable: true,
              extruded: true,
              radius: 100,
              elevationScale: this.state.elevationScale,
              getPosition: d => d.coordinates,//[x,y,z]
              onHover: ({object, coordinate})=> console.log('hex layer ', coordinate),
              lightSettings:LIGHT_SETTINGSss,
              autoHighlight:true,
              opacity: 0.8,
            }
           ),
          new PolygonLayer({
            id: '3d-buildings',
            data: this.state.buildings,
            extruded: true,
            wireframe: false,
            fp64: true,
            opacity: 0.5,
            pickable: true,
            elevationScale: 1,
            getPolygon: f => f.polygon,
            getElevation: f => f.height,
            getFillColor: [74, 80, 87],
            lightSettings: this.state.buildslight,
            onClick: ({info, coordinate}) => console.log(coordinate),
          }),
          new TripsLayer({
            id: 'trips',
            data: RoadTripData,
            getPath: d => d.segments,
            getColor: d => (d.vendor === 0 ? [253, 128, 93] : [254, 173, 84]),
            opacity: 0.3,
            strokeWidth: 2,
            trailLength:180,
            currentTime: this.state.time
          }),
          new PathLayer({
              id: 'path-layer_1',
              data: PathLayerData,
              pickable: true,
              widthScale: Math.max(2, 21 - this.state.viewState.zoom),
              widthMinPixels: 4,
              getPath: d => d.path,
              getColor: [37, 183, 144, 150],
              getWidth: d => 3,
              rounded: true,
              getPolygonOffset: ({layerIndex}) => [200, layerIndex * 100],
          })
    ]
}