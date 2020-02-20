import actionTypes from "./actionTypes";
import Axios from "axios";

export const setActivePortfolio = (portfolioId) => ({
    type: actionTypes.SET_ACTIVE_PORTFOLIO,
    portfolioId
});

export const setCurrenciesLoading = (isLoading) => ({
    type: actionTypes.SET_CURRENCIES_LOADING,
    isLoading
});

export const setCurrencies = (currencies) => ({
    type: actionTypes.SET_CURRENCIES,
    currencies
});


export const fetchCurrenciesAndRatesThunk = () => {
    return (dispatch, getState) => {

        dispatch(setCurrenciesLoading(true));

        const getCurrencies = () => ( Axios.get('/currencies.json') );

        Axios.all([getCurrencies()])
            .then(Axios.spread(function (currenciesData) {
                const currencies = currenciesData.data;
                dispatch(setCurrencies(currencies));
                dispatch(setCurrenciesLoading(false));
            }))
            .catch(function (error) {
                alert(error);
            });
    };
};