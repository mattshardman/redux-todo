import Mattdux from './mattdux';

// exports createStore function from mattdux instance
export const createStore = (reducers, initialState) => {
    const mattdux = new Mattdux();
    mattdux.createStore(reducers, initialState);
    return mattdux; 
};

export default createStore;