import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Store from "../stores/reduxStore"
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {AppContainer} from "./App/AppContainer";

const render = (store) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root'));
};

render(Store);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
