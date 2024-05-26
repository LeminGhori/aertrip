import {
    SET_WAY_OPTIONS,
    SET_SEATS_OPTIONS,
    REVERSEFLIGHT,
    SET_PASSENGER_OPTIONS,
    INCREMENT_PASSENGER,
    DECREMENT_PASSENGER,
    THEME,
    RECENT_SEARCHES,
    FROM,
    TO,
    RETURN,
    DEPART,
    SORT,
    PRICE,
    OPTIONSPRICE,
} from "./actionTypes";
export const themeColor = (data) => {
    return {
        type: THEME,
        payload: data,
    };
};

export const setWayOptions = (options) => ({
    type: SET_WAY_OPTIONS,
    payload: options,
});

export const recentSearches = (options) => ({
    type: RECENT_SEARCHES,
    payload: options,
});

export const setSeatsOptions = (options) => ({
    type: SET_SEATS_OPTIONS,
    payload: options,
});

export const setPassengerOptions = (options) => ({
    type: SET_PASSENGER_OPTIONS,
    payload: options,
});

export const incrementPassenger = (key) => ({
    type: INCREMENT_PASSENGER,
    payload: key,
});

export const decrementPassenger = (key) => ({
    type: DECREMENT_PASSENGER,
    payload: key,
});
export const fromFlight = (key) => ({
    type: FROM,
    payload: key,
});
export const toFlight = (key) => ({
    type: TO,
    payload: key,
});
export const returnFlight = (key) => ({
    type: RETURN,
    payload: key,
});
export const departFlight = (key) => ({
    type: DEPART,
    payload: key,
});
export const reverseFlight = (key) => ({
    type: REVERSEFLIGHT,
    payload: key,
});
export const setPriceRange = (key) => ({
    type: PRICE,
    payload: key,
});
export const setSelectedOption = (key) => ({
    type: OPTIONSPRICE,
    payload: key,
});
export const sortFilter = (key) => ({
    type: SORT,
    payload: key,
});
