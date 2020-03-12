import actionTypes from "../actions";
import {API} from "../../../utils/api";
import {setActivePortfolio} from "../app/actions";

export const setPortfolioLoading = (portfolios) => ({
    type: actionTypes.SET_PORTFOLIO_LOADING,
    portfolios
});

export const setPortfolioData = (portfolios) => ({
    type: actionTypes.SET_PORTFOLIO_DATA,
    portfolios
});

export const addPortfolioData = (portfolio) => ({
    type: actionTypes.ADD_PORTFOLIO_DATA,
    portfolio
});

export const createPortfolioThunk = () => {
    return (dispatch, getState) => {
        dispatch(setPortfolioLoading(true));
        const url = '/portfolios';
        const data = { name: "Untitled" };

        return API.post(url,data).then((portfolioData) => {

            const newPortfolio = portfolioData.data;
            dispatch(addPortfolioData(newPortfolio));
            dispatch(setActivePortfolio(newPortfolio.id));
            dispatch(setPortfolioLoading(false));
        });
    };
};