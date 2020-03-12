import actionTypes from "../actions";

export const setPortfolioData = (portfolios) => ({
    type: actionTypes.SET_PORTFOLIO_DATA,
    portfolios
});

export const setActivePortfolio = (portfolioId) => ({
    type: actionTypes.SET_ACTIVE_PORTFOLIO,
    portfolioId
});
