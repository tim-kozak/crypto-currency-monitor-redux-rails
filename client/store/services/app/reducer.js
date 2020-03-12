import actionTypes from "../actions";

let defaults = {
    isLoading: true,
    selectedPortfolioId: null
};

export const appReducer = (state = defaults, action) => {
    switch (action.type) {
        case actionTypes.SET_APP_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case actionTypes.SET_ACTIVE_PORTFOLIO:
            return {
                ...state,
                selectedPortfolioId: action.portfolioId
            };
        default:
            return state;
    }
};

