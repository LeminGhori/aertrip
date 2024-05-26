import themeReducers from "../../modules/Layout/themeReducers";

import { combineReducers } from "redux";
import flightReducer from "../../pages/Home/flightReducer";
import filterReducer from "../../pages/Flights/filterReducer";

const reducers = combineReducers({
    themeReducers: themeReducers,
    flight: flightReducer,
    filter: filterReducer,
});

export default reducers;
