import actionTypes from "./actionTypes";
import Axios from "axios";
import {Config} from "../../config/main.conf"

const API = Axios.create({
    baseURL: Config.api.host,
    headers: {
        'Content-Type': 'application/json'
    }
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

        return API.get('/currencies')
            .then((currenciesData) => {
                const currencies = currenciesData.data;
                dispatch(setCurrencies(currencies));
                dispatch(setCurrenciesLoading(false));
            });
    };
};

export const setAuthLoading = (isLoading) => ({
    type: actionTypes.SET_USER_AUTH_LOADING,
    isLoading
});

export const setAuthData = (auth_token) => ({
    type: actionTypes.SET_USER_AUTH_DATA,
    auth_token
});

export const fetchUserTokenThunk = () => {
    return (dispatch, getState) => {
        dispatch(setAuthLoading(true));
        const url = '/auth/login';
        const data = Config.testUser;

        return API.post(url,data).then((tokenData) => {

                const token = tokenData.data.auth_token;
                API.defaults.headers.common['Authorization'] = token;

                dispatch(setAuthData(token));
                dispatch(setAuthLoading(false));
        });
    };
};


export const setUserLoading = (isLoading) => ({
    type: actionTypes.SET_USER_LOADING,
    isLoading
});

export const setUserData = (data) => ({
    type: actionTypes.SET_USER_DATA,
    data
});

export const fetchUserDataThunk = () => {
    return (dispatch, getState) => {
        dispatch(setUserLoading(true));
        const url = '/users/me';

        return API.get(url).then((userData) => {
                const user = userData.data;
                const portfolios = user.portfolios;
                dispatch(setUserData(user));
                dispatch(setPortfolioData(portfolios));
                dispatch(setUserLoading(false));
        });
    };
};

export const setPortfolioData = (portfolios) => ({
    type: actionTypes.SET_PORTFOLIO_DATA,
    portfolios
});

export const setActivePortfolio = (portfolioId) => ({
    type: actionTypes.SET_ACTIVE_PORTFOLIO,
    portfolioId
});

export  const loginAndQueryAllDataThunk = () => {
    return (dispatch, getState) => {
        return dispatch(fetchUserTokenThunk())
            .then( () => dispatch(fetchUserDataThunk() ))
            .then( () => dispatch(fetchCurrenciesAndRatesThunk() ));
    }
};