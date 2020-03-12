import actionTypes from "../actions";

let defaults = {
    isLoading: false,
    selectedPortfolioId: null
};

export const appReducer = (state = defaults, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_PORTFOLIO:
            return {
                ...state,
                selectedPortfolioId: action.portfolioId
            };
        default:
            return state;
    }
};

