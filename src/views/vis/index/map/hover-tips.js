import React from 'react';

export default function() {
   const {x, y, hoveredObject, hoveredLayer} = this.state;

   const style = {left: x, top: y, position: 'absolute', fontSize: 15, zIndex: 2000, backgroundColor: '#000000a0'}
   return(hoveredObject && 
    <div className="tooltip" style={style}>
   <div>{hoveredObject.coordinates[0]}</div>
   <div>{hoveredObject.coordinates[1]}</div>
   </div>)
}
