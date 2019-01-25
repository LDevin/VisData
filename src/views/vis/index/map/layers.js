import DeckGL, {PolygonLayer, ScatterplotLayer, PointCloudLayer, HexagonLayer,GridLayer,
    IconLayer,TextLayer, FlyToInterpolator, PathLayer,COORDINATE_SYSTEM} from 'deck.gl';

import _CONST from 'consts';

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
    [0x03, 0xfe, 0x8d],
    [0x24, 0xfa, 0x7e],
    [0x47, 0xf5, 0x6d],
    [0x65, 0xf2, 0x60],
    [0x89, 0xec, 0x4f],
    [0xab, 0xe8, 0x3f],
    [0xcb, 0xe3, 0x30],
    [0xe8, 0xe0, 0x23],
    [0xff, 0xd1, 0x1c],

    [0xff, 0xb1, 0x21],
    [0xff, 0x8c, 0x28],
    [0xff, 0x71, 0x2d],
    [0xff, 0x4d, 0x34],
    [0xff, 0x2b, 0x3b],
    [0xff, 0x0a, 0x40], 
];

const GridColorRange = [
    [55, 255, 20],
    [65, 240, 25],
    [70, 220, 30],
    [80, 210, 35],
    [90, 190, 55],
    [150, 170, 66]
];

const normalIconSources = require('../../../../public/resources/images/icon-atlas.png');
const monitorIconSources = require('../../../../public/resources/images/monitor.png');

export default function layers() {
    return [
        new IconLayer({
            id:'icon-layer_1',
            data: this.props.map.icons,
            pickable: true,
            autoHighlight:true,
            iconAtlas: normalIconSources,
            iconMapping: {
                normal: {
                  x: 0,
                  y: 0,
                  width: 128,
                  height: 128,
                  anchorY: 128,
                  mask: true
                },
                monitor: {
                    x: 128,
                    y: 0,
                    width: 128,
                    height: 128,
                    anchorY: 128,
                    mask: true
                },
                alarm: {
                    x: 128,
                    y: 0,
                    width: 128,
                    height: 128,
                    anchorY: 128,
                    mask: false
                }
            },
            sizeScale: 15,
            wrapLongitude: true,
            onHover: this._onHover,
            getPosition: d => d.coordinates,
            getIcon: d => d.icon,
            getColor: d => [d.r, d.g, d.b],//0xfd, 0xee
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
            lightSettings:{},
            onHover: this._onHover,
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
            getAngle: -10,
            characterSet: this.props.map.characterSet, //['青', '区', '秀', '武', '宁', '横', '县','街','道'],
            getSize: Math.pow(1.5, this.state.viewState.zoom - 5),
        }),
        new GridLayer({
            id: 'grid-layer_1',
            data: this.props.map.grids,
            pickable: true,
            extruded: true,
            coverage: 0.5,
            cellSize: 100,
            elevationScale: 1,
            opacity: 0.8,
            upperPercentile: 100,
            autoHighlight:true,
            getPosition: d => d.coordinates,
            //onHover: this._onHover,
        }),
        new HexagonLayer({
              id: 'hexagon-layer_1',
              data: this.props.map.hexs,
              colorRange: HexLayColorRange,
            //   colorDomain:[1, 50],
              coverage: 0.1,
              upperPercentile: 100,
              pickable: true,
              extruded: true,
              radius: 200,
              elevationScale: this.state.elevationScale,
              getPosition: d => d.coordinates,//[x,y,z]
              lightSettings:LIGHT_SETTINGSss,
              autoHighlight:true,
              opacity: 0.8,
              onHover: info => console.log('info.object ',info.object)
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
              getPath: d => d.path,//#ff8c28
              getColor: [0xff, 0x8c, 0x28, 150],
              getWidth: d => 3,
              rounded: true,
              getPolygonOffset: ({layerIndex}) => [200, layerIndex * 100],
          })
    ]
}