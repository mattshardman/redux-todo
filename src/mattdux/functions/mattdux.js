export default class Mattdux {
  constructor() {
    this.actions = {};
    this.reducers = [];
    this.store = {};
  }

  updateStore = action => {
    // call each reducer function with the type and payload returned from the action function
    const newStore = this.reducers.reduce((acc, reducerObject) => {
      const newState = reducerObject.reducerFunction(
        this.store[reducerObject.name],
        action
      );
      acc[reducerObject.name] = newState;
      return acc;
    }, {});

    // update the store with the new state returned from all the reducers
    this.store = newStore;
    return newStore;
  }

  on = (funcName, func) => {
    // Adds a function to this.events
    const newEvents = { ...this.actions, [funcName]: func };
    this.actions = newEvents;
  }

  emit(functionName, payload) {
    // When an action is called calls the relevant function from this.events
    const action = this.actions[functionName](payload);
    // if the action function returns a promise call .then and then call update store
    // other wise call update store with returned value
    if (action instanceof Promise) {
      return action.then(result => this.updateStore(result));
    } else {
      return this.updateStore(action);
    }
  }

  createStore = reducersObject => {
    // convert reducers object passed into create store into array
    const reducersArray = Object.entries(reducersObject);

    // iterate through array and add an object for each reducer to this.reducers
    reducersArray.forEach((reducerArray, index) => {
      const [name, reducerFunction] = reducerArray;
      this.reducers.push({
        name,
        reducerFunction
      });

      // call each reducer with action type of init in order to initialize any default state
      const currentReducer = reducerFunction;
      this.store[name] = currentReducer(null, { type: "INIT" }) || [];
    });
  }
}
