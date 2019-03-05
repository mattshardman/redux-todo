import { ADD_TODO, DELETE_TODO, TOGGLE_COMPLETED } from '../constants';

const defaultState = [{
    id: 'demo',
    date: new Date(),
    text: 'Yogging',
    complete: false
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

        default:
            return defaultState;
    }
}
