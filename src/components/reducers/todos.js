import { ADD_TODO, DELETE_TODO, TOGGLE_COMPLETED } from '../constants';

const defaultState = [{
    id: 'demo',
    date: new Date(),
    text: 'Running',
    complete: false
  }];

export default (state = defaultState, action) => {
    switch(action.type) {
        case ADD_TODO: 
            return [...state, action.payload];

        case TOGGLE_COMPLETED:
            const newState = state.map(each => {
                if (each.id === action.payload) {
                    return {
                        ...each,
                        complete: !each.complete
                    }
                }
                return {...each};
            });

            return newState;

        case DELETE_TODO:
            return state.filter(each => each.id !== action.payload);

        default:
            return state;
    }
}
