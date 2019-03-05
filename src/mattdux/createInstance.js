export default class Mattdux {
    constructor() {
        this.events = {};
        this.reducers = [];
        this.store = {};
    }

    on(input, func) {
        const newEvents = {...this.events, [input]: func };
        this.events = newEvents; 
    }

    emit(functionName, payload) {
        const action = this.events[functionName](payload);
        const newStore =  this.reducers.reduce((acc, reducerObject) => { 
            const newState = reducerObject.reducer(this.store[reducerObject.name], action);
            acc[reducerObject.name] = newState;
            return acc;
        }, {});
    
        this.store = newStore;
        return newStore;
    }

    createStore(reducersObject, arr) {
        Object
            .entries(reducersObject)
                .forEach((reducer, index) => {
                    this.reducers.push({
                        name: reducer[0],
                        reducer: reducer[1]
                    });

                    this.store[reducer[0]] = this.reducers[index].reducer(null, { type: null }) || [];
                });
    }
};