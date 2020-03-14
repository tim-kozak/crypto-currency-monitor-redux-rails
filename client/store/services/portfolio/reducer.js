import actionTypes from "../actions";
import {remapToAllIds} from "../../../utils/processors";

const [_allIds,_byIds] = remapToAllIds([]);


export const portfolioReducer = (state = {allIds:_allIds,byIds:_byIds}, action) => {
    switch (action.type) {
        case actionTypes.SET_PORTFOLIO_DATA: {
            const [allIds,byIds] = remapToAllIds(action.portfolios);
            return {
                allIds,
                byIds
            };
        }
        case actionTypes.ADD_PORTFOLIO_DATA: {
            let newPortfolio = {};
            newPortfolio[action.portfolio.id] = action.portfolio;
            return {
                allIds: [...state.allIds, action.portfolio.id],
                byIds: {...state.byIds, ...newPortfolio}
            };
        }
        case actionTypes.DELETE_PORTFOLIO_ITEM: {
            const filteredIds = state.allIds.filter(id => id !== action.portfolioId);
            return {
                ...state,
                allIds: filteredIds
            };
        }
        case actionTypes.SET_PORTFOLIO_ITEM_NAME: {
            if (!action.portfolioId) return state;

            let updatedPortfolio = {};
            updatedPortfolio[action.portfolioId] = {
                ...state.byIds[action.portfolioId],
                name: action.name
            };
            return {
                ...state,
                byIds: {...state.byIds, ...updatedPortfolio}
            };
        }
        case actionTypes.ADD_ASSET_ITEM: {
            const asset = action.asset;
            const portfolio = state.byIds[asset.portfolio_id];
            portfolio.assets.push(asset);
            let newPortfolio = {};
            newPortfolio[portfolio.id] = {...portfolio};
            return {
                ...state,
                byIds: {...state.byIds, ...newPortfolio}
            };
        }
        default:
            return state;
    }
};

