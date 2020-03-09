import { combineReducers } from "redux";

import {portfolioReducer} from "./portfolioReducer"
import {userReducer} from "./userReducer"
import {currenciesReducer} from "./currenciesReducer"
import {stateReducer} from "./stateReducer";

export default combineReducers({
    portfolio: portfolioReducer,
    profile: userReducer,
    currencies: currenciesReducer,
    appState: stateReducer
});

