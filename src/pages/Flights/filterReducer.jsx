// filterReducer.js
import { OPTIONSPRICE, PRICE, SORT } from '../../store/action/actionTypes.js';

const initialState = {
    selectedOption: { value: 'refundableFaresOnly', label: 'Refundable fares only' },
    priceRange: [0, 300000],
    sort: ''
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRICE:
            return { ...state, priceRange: action.payload };
        case SORT:
            return { ...state, sort: action.payload };
        case OPTIONSPRICE:
            return {
                ...state,
                selectedOption: state?.selectedOption?.value == action.payload?.value ? { value: '', label: '' } : action.payload,
            };
        default:
            return state;
    }
};

export default filterReducer;
