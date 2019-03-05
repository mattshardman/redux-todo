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
        const newStore =  this.reducers.reduce((acc, item) => { 
            const newState = item.reducer(this.store[item.name], action);
            acc[item.name] = newState;
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

                    this.store[reducer[0]] = (arr && arr[index]) || [];
                });
    }
};