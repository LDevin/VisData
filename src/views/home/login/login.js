import React from 'react';
import ReactDOM from 'react-dom';
import { callbackify } from 'util';

export default class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div style={{height: '100%', width: '100%', position: 'absolute'}}>
                <div style={{height: 200, width: '100%',marginTop: '50px'}}>
                  <form >
                  username: <input type='text' name='user'/><br/>
                  password: <input type='password' name='pwd'/><br/>
                  <input type='submit' name='login' value='登录' onClick={() => {console.log('dddd'); 
                  location.href = 'vis/index'; return false;}}/>
                  </form>
                </div>
            </div>
        )
    }
}