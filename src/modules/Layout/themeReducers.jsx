const initialState = 'light';

const themeReducers = (state = initialState, action) => {
    switch (action.type) {
        case "THEME": return action.payload;
        default: return state;
    }
}

export default themeReducers;