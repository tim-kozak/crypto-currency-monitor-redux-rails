import { combineReducers } from "redux";

import {portfolioReducer} from "./portfolioReducer"
import {profileReducer} from "./profileReducer"
import {currenciesReducer} from "./currenciesReducer"
import {stateReducer} from "./stateReducer";

export default combineReducers({
    portfolio: portfolioReducer,
    profile: profileReducer,
    currencies: currenciesReducer,
    appState: stateReducer
});

