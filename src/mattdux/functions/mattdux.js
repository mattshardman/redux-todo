export default class Mattdux {
    constructor() {
        this.actions = {};
        this.reducers = [];
        this.store = {};
    }

    updateStore(action) {
        const newStore =  this.reducers.reduce((acc, reducerObject) => { 
            const newState = reducerObject.reducerFunction(this.store[reducerObject.name], action);
            acc[reducerObject.name] = newState;
            return acc;
        }, {});
        
        this.store = newStore;
        return newStore;
    }

    on(funcName, func) {
        const newEvents = {...this.actions, [funcName]: func };
        this.actions = newEvents; 
    }

    emit(functionName, payload) {
        const action = this.actions[functionName](payload);
        if (action instanceof Promise) {
            return action.then(result => this.updateStore(result));
        } else {
            return this.updateStore(action);
        }
    }

    createStore(reducersObject, arr) {
        Object
            .entries(reducersObject)
                .forEach((reducerArray, index) => {
                    const [name, reducerFunction] = reducerArray;
                    this.reducers.push({
                        name,
                        reducerFunction,
                    });

                    const currentReducer = reducerFunction;

                    this.store[name] = currentReducer(null, { type: 'INIT' }) || [];
                });
    }
};