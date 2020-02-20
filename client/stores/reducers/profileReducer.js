let defaults = {
    id: 1,
    name: "Tim Johnson",
    photo: "https://www.w3schools.com/howto/img_avatar.png",
};

export const profileReducer = (state = defaults, action) => {
    switch (action.type) {
        case "":

        default:
            return state;
    }
    return state;
};

