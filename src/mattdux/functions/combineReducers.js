export const combineReducers = reducers => {
    const arrayOfReducers = Object.entries(reducers);
    
    arrayOfReducers.forEach(([reducerName, reducerFunc]) => {
        if (!(reducerFunc instanceof Function)) {
            throw new Error('All reducers should be functions!')
        }
    });

    return reducers;
};

export default combineReducers;