import actionTypes from "../actions";
import {API} from "../../../utils/api";

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