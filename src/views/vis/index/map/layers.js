import DeckGL, {PolygonLayer, ScatterplotLayer, PointCloudLayer, HexagonLayer,IconLayer,TextLayer, FlyToInterpolator, PathLayer,COORDINATE_SYSTEM} from 'deck.gl';

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

const imgDir = '../../../../public/resources/images/';

export default function layers() {
    return [
        new IconLayer({
            id:'icon-layer_1',
            data: this.props.map.icons,
            pickable: true,
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
            getColor: d => [255, 140, 0],
        }),
        new PointCloudLayer({
            id: 'point-cloud-layer_1',
            pickable: true,
            data: this.props.map.pointClouds,
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
            sizeScale: 2,
            getColor: [254, 151, 13],
            getTextAnchor: 'middle',
            getAlignmentBaseline: 'bottom',
            getPosition: d => d.coordinates, //[x,y,z]
            getText: d => d.name,
            getAngle: -20,
            getSize: Math.pow(1.5, this.state.viewState.zoom - 5),
        }),
        new HexagonLayer({
              id: 'hexagon-layer_1',
              data: this.props.map.hexs,
              colorRange: HexLayColorRange,
              coverage: 0.2,
              upperPercentile: 98,
              pickable: true,
              extruded: true,
              radius: 100,
              elevationScale: 2,
              getPosition: d => d.coordinates,//[x,y,z]
              onHover: ({object, coordinate})=> console.log('hex layer ', coordinate),
              lightSettings:LIGHT_SETTINGSss,
              autoHighlight:true,
              opacity: 0.8,
            }
           ),
          new PolygonLayer({
            id: 'buildings',
            data: this.props.map.buildings,
            extruded: true,
            wireframe: false,
            fp64: true,
            opacity: 0.5,
            pickable: true,
            elevationScale: 1,
            getPolygon: f => f.polygon,
            getElevation: f => f.height,
            getFillColor: [74, 80, 87],
            lightSettings:this.state.buildslight,
            onClick: ({info, coordinate}) => console.log(coordinate),
          }),
    ]
}