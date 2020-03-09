// import defaults from '../../mocks/portfolio'
import actionTypes from "../actions/actionTypes";
import {remapToAllIds} from "../../src/utils/processors";

const [_allIds,_byIds] = remapToAllIds([]);


export const portfolioReducer = (state = {_allIds,_byIds}, action) => {
    switch (action.type) {
        case actionTypes.SET_PORTFOLIO_DATA:
            const [allIds,byIds] = remapToAllIds(action.portfolios);
            return {
                allIds,
                byIds
            };

        default:
            return state;
    }
};

