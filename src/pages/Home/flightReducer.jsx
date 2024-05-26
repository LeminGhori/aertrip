// flightReducer.js
import {
    SET_WAY_OPTIONS,
    SET_SEATS_OPTIONS,
    SET_PASSENGER_OPTIONS,
    INCREMENT_PASSENGER,
    DECREMENT_PASSENGER,
    FROM,
    TO,
    DEPART,
    RETURN,
    RECENT_SEARCHES,
    REVERSEFLIGHT,
} from "../../store/action/actionTypes.js";

const initialState = {
    loading: false,
    wayOptions: "oneway",
    seatsOptions: "economy",
    passengerOptions: {
        adults: 1,
        children: 0,
        infant: 0,
    },
    recentSearchesOptions: "bom",
    from: [],
    to: [],
    depart: "",
    return: "",
};

const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WAY_OPTIONS:
            return { ...state, wayOptions: action.payload };
        case RECENT_SEARCHES:
            return { ...state, recentSearches: action.payload };
        case SET_SEATS_OPTIONS:
            return { ...state, seatsOptions: action.payload };
        case SET_PASSENGER_OPTIONS:
            return { ...state, passengerOptions: action.payload };
        case INCREMENT_PASSENGER:
            const incrementedState = { ...state };
            if (
                (action.payload == "adults" || action.payload == "children") &&
                incrementedState?.passengerOptions?.children +
                incrementedState?.passengerOptions?.adults <
                9
            ) {
                incrementedState.passengerOptions[action.payload] += 1;
            }
            if (
                action.payload == "infant" &&
                incrementedState.passengerOptions["infant"] <
                incrementedState.passengerOptions["adults"]
            ) {
                incrementedState.passengerOptions[action.payload] += 1;
            }
            return incrementedState;
        case DECREMENT_PASSENGER:
            const decrementedState = { ...state };
            if (action.payload === "adults") {
                if (
                    decrementedState.passengerOptions.infant >
                    decrementedState.passengerOptions.adults - 1
                ) {
                    decrementedState.passengerOptions.infant =
                        decrementedState.passengerOptions.adults - 1;
                }
                decrementedState.passengerOptions.adults = Math.max(
                    1,
                    decrementedState.passengerOptions.adults - 1
                );
            } else if (action.payload === "children") {
                decrementedState.passengerOptions.children = Math.max(
                    0,
                    decrementedState.passengerOptions.children - 1
                );
            } else if (action.payload === "infant") {
                decrementedState.passengerOptions.infant = Math.max(
                    0,
                    decrementedState.passengerOptions.infant - 1
                );
            }
            return decrementedState;
        case FROM:
            return { ...state, from: action.payload };
        case TO:
            return { ...state, to: action.payload };
        case RETURN:
            return { ...state, return: action.payload };
        case DEPART:
            return { ...state, depart: action.payload };
        case REVERSEFLIGHT:
            const temp = state.from;
            return {
                ...state,
                from: state.to,
                to: temp,
            };
        default:
            return state;
    }
};

export default flightReducer;
