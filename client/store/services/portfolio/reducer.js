import actionTypes from "../actions";
import {remapToAllIds} from "../../../utils/processors";

const [_allIds,_byIds] = remapToAllIds([]);


export const portfolioReducer = (state = {_allIds,_byIds}, action) => {
    switch (action.type) {
        case actionTypes.SET_PORTFOLIO_DATA:
            const [allIds,byIds] = remapToAllIds(action.portfolios);
            return {
                allIds,
                byIds
            };

        case actionTypes.ADD_PORTFOLIO_DATA:
            let newPortfolio = {};
            newPortfolio[action.portfolio.id] = action.portfolio;
            return {
                allIds: [...state.allIds, action.portfolio.id ],
                byIds: {...state.byIds,  ...newPortfolio}
            };
        case actionTypes.SET_PORTFOLIO_ITEM_NAME:
            if (!action.portfolioId) return state;

            let updatedPortfolio = {};
            updatedPortfolio[action.portfolioId] = {
                ...state.byIds[action.portfolioId],
                name: action.name
            };
            return {
                ...state,
                byIds: {...state.byIds,  ...updatedPortfolio}
            };

        default:
            return state;
    }
};

