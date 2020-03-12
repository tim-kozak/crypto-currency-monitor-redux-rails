import actions from "../actions"

let defaults = {
    isLoading: false,
    id: 1,
    name: "Tim Johnson",
    email: "email.com",
    auth_token: "token",
    photo: "https://www.w3schools.com/howto/img_avatar.png",
};

export const userReducer = (state = defaults, action) => {
    switch (action.type) {
        case actions.SET_USER_AUTH_LOADING:
            return {...state, isLoading: action.isLoading }
        case actions.SET_USER_AUTH_DATA:
            return {...state, auth_token: action.auth_token }
        case actions.SET_USER_LOADING:
            return {...state, isLoading: action.isLoading }
        case actions.SET_USER_DATA:
            return {...state, ...action.data }
        default:
            return state;
    }
    return state;
};

