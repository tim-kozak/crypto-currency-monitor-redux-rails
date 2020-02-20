import actions from "../actions/actionTypes"
import {remapToAllIds, remapToByIds} from "../../src/utils/processors";

let defaults = {
    isLoading: true,
    allIds: [],
    byIds: {},
    lastUpdated: null
};

export const currenciesReducer = (state = defaults, action) => {
    switch (action.type) {
        case actions.SET_CURRENCIES_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case actions.SET_CURRENCIES:
            const [allIds,byIds] = remapToAllIds(action.currencies);
            return {
                ...state,
                allIds,
                byIds
            };
        case actions.SET_HISTORICAL:
            return {
                ...state,
                historical: action.rates
            };

        default:
            return state;
    }
};

