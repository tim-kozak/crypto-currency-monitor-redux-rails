import actionTypes from "../actions";
import {Config} from "../../../config/conf";
import {API,setAuthToken} from "../../../utils/api";
import {setPortfolioData} from "../portfolio/actions";

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
            setAuthToken(token);

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