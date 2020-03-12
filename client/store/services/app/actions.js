import {fetchUserDataThunk, fetchUserTokenThunk} from "../user/actions";
import {fetchCurrenciesAndRatesThunk} from "../currency/actions";
import actionTypes from "../actions";


export const loginAndQueryAllDataThunk = () => {
    return (dispatch, getState) => {

        dispatch(setAppLoading(true));

        return dispatch(fetchUserTokenThunk())
            .then( () => dispatch(fetchUserDataThunk() ))
            .then( () => dispatch(fetchCurrenciesAndRatesThunk() ))
            .then(() => dispatch(setAppLoading(false)));
    }
};

export const setAppLoading = (isLoading) => ({
    type: actionTypes.SET_APP_LOADING,
    isLoading
});

export const setActivePortfolio = (portfolioId) => ({
    type: actionTypes.SET_ACTIVE_PORTFOLIO,
    portfolioId
});
