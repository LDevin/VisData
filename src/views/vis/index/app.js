import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Store from '../../../models/store';

import App from './vis-data';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);