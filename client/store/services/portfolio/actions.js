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

export const setPortfolioItemName = (name,portfolioId) => ({
    type: actionTypes.SET_PORTFOLIO_ITEM_NAME,
    name,
    portfolioId
});

export const deletePortfolioItem = (portfolioId) => ({
    type: actionTypes.DELETE_PORTFOLIO_ITEM,
    portfolioId
});


export const updatePortfolioNameThunk = (name,portfolioId) => {
    return (dispatch, getState) => {
        const url = '/portfolios/' + portfolioId;
        const data = { name: name };

        dispatch(setPortfolioLoading(true));

        return API.put(url,data).then((portfolioData) => {
            dispatch(setPortfolioItemName(name,portfolioId));
            dispatch(setPortfolioLoading(false));
        });
    };
};

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

export const deletePortfolioThunk = (id) => {
    return (dispatch, getState) => {
        dispatch(setPortfolioLoading(true));
        const url = '/portfolios/'+id;

        return API.delete(url).then((portfolioData) => {
            dispatch(deletePortfolioItem(id));
            dispatch(setActivePortfolio(null));
            dispatch(setPortfolioLoading(false));
        });
    };
};