import Mattdux from './mattdux';

// creates new instance of mattdux and initializes with reducers and default state of reducers
export const createStore = (reducers, initialState) => {
    const mattdux = new Mattdux();
    mattdux.createStore(reducers, initialState);
    return mattdux; 
};

export default createStore;