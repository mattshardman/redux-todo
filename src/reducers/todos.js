import { ADD_TODO, DELETE_TODO, TOGGLE_COMPLETED, FILTER_TODO } from '../constants';

const defaultState = [{
    id: 'demo',
    date: new Date(),
    text: 'Yogging',
    complete: false,
    display: true,
  }];

export default (state, action) => {
    switch(action.type) {
        case ADD_TODO: 
            return [...state, action.payload];

        case TOGGLE_COMPLETED:
            const newState = state.map(each => {
                if (each.id === action.payload.id) {
                    return {
                        ...each,
                        complete: !each.complete
                    }
                }
                return {...each};
            });

            return newState;

        case DELETE_TODO:
            return state.filter(each => each.id !== action.payload.id);

        case FILTER_TODO: 
            return state.map(each => {
                if (!action.payload.text) {
                    return {...each, display: true};
                }
                if (!each.text.toLowerCase().includes(action.payload.text.toLowerCase())) {
                    return {...each, display: false };
                }
                return {...each, display: true };
            });

        default:
            return defaultState;
    }
}
