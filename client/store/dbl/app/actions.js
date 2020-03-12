import {fetchUserDataThunk, fetchUserTokenThunk} from "../user/actions";
import {fetchCurrenciesAndRatesThunk} from "../currency/actions";


export const loginAndQueryAllDataThunk = () => {
    return (dispatch, getState) => {
        return dispatch(fetchUserTokenThunk())
            .then( () => dispatch(fetchUserDataThunk() ))
            .then( () => dispatch(fetchCurrenciesAndRatesThunk() ));
    }
};