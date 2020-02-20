import actionTypes from "../actions/actionTypes";

let defaults = {
    isLoading: false,
    selectedPortfolioId: null,
    sidebar: {
        isLoading: false,
    }
};

export const stateReducer = (state = defaults, action) => {
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

