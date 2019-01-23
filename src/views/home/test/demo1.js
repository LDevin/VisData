import React from 'react';
import {Motion, spring, presets} from 'react-motion';

export default class App extends React.Component {
    state = {
      left: 0
    }

    animate = () => {
      this.setState((preState) => ({ left: preState.left === 200 ? 0 : 200 }))
    }

    componentDidMount() {
        this.animate();
    }

    render() {
      return (
        <div className="container">
            <Motion style={{x: spring(this.state.left, presets.wobbly)}}>
                {styles => {
                    return(<div className='box' style={{transform:`translateX(${styles.x}px)`, width: 200, 
                    height:200, top: 50, background:'red'}}></div>)
                }

                }
            </Motion>
            <button onClick={()=>this.animate()}>running</button>
        </div>
      );
    }
  }
  
//   const styles = {
//     menu: {
//       overflow: 'hidden',
//       border: '2px solid #ddd',
//       width: 300,
//       marginTop: 20,
//     },
//     selection: {
//       padding: 10,
//       margin: 0,
//       borderBottom: '1px solid #ededed'
//     },
//     button: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       display: 'flex',
//       cursor: 'pointer',
//       width: 200,
//       height: 45,
//       border: 'none',
//       borderRadius: 4,
//       backgroundColor: '#ffc107',
//     },
//   }
  