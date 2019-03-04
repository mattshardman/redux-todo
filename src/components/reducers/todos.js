import uuid from 'uuid';

export default (state = [{
    id: 2,
    text: 'hello',
    complete: false
}], action) => {
    switch(action.type) {
        case 'ADD_TODO': 
            const todo = {
                id: uuid(),
                complete: false,
                text: action.payload
            }; 
            return [...state, todo];
        case 'TOGGLE_COMPLETED':
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
        case 'DELETE_TODO':
            return state.filter(each => each.id !== action.payload);
        default:
            return state;
    }
}
