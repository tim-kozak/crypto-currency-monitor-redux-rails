import { combineReducers } from "redux";

import {portfolioReducer} from "./portfolio/reducer"
import {userReducer} from "./user/reducer"
import {currencyReducer} from "./currency/reducer"
import {appReducer} from "./app/reducer";

export default combineReducers({
    portfolio: portfolioReducer,
    profile: userReducer,
    currencies: currencyReducer,
    appState: appReducer
});

