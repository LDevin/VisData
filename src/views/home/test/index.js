import React from 'react';
import './test.css';

export default class App extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                <h1>css transtion</h1>
                <div className='card'>
                    <div className='box rotate'>
                        <div className='fill'></div>
                    </div>
                    <p>rotate(45deg)</p>
                </div>
                
                <div className='card'>
                <div className='box rotate'>
                    <div className='fill'></div>
                </div>
                <p>rotate(45deg)</p>
            </div>
            </div>
        )
    }
}