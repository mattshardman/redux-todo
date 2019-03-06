import React, { useState, useEffect } from 'react';
import { mattdux } from './mattdux';

const functionsToBeCalledByComponent = (arrayOfFunctions, setStore) => {
    return arrayOfFunctions.reduce((acc, [funcName]) => {
        // create a function on the HOC state that will emit an event to mattdux instance when called by the wrapped component
        acc[funcName] = payload => { 
            // emits an event to mattdux instance that returns a new store
            const newStore = mattdux.emit(funcName, payload);
            // if the newStore returns a promise call .then on it and then set the HOC store state to the new store
            // otherwise immediately set the HOC store state to the new store
            if (newStore instanceof Promise) {
                newStore.then(r => setStore(r));
            } else {
                setStore(newStore);
            }         
        }
        return acc;
    }, {});
}

export const connect = (stateWanted, functions) => Component => {
    const Connect = (props) => {
        const [mattduxFunctions, setMattduxFunctions] = useState();
        const [store, setStore] = useState(mattdux.store);
      
        // call a function that is passed into the HOX with the store as a parameter
        // this returns just the piece of state needed for that particular component
        const sliceOfStoreToPassToComponent = { state: stateWanted ? stateWanted(store) : store };

        useEffect(() => {
            // if no functions are passed into the connect HOC return null
            if (!functions) {
                return null;
            }

            // convert object containing actions to array
            const arrayOfFunctions = Object.entries(functions);
            // for each function add an event listener to mattdux
            arrayOfFunctions.forEach(([funcName, func]) => mattdux.on(funcName, func));
            // for each function create a function that will emit an event to mattdux
            // each function is then passed to the wrapped component
            const functionList = functionsToBeCalledByComponent(arrayOfFunctions, setStore);
            return setMattduxFunctions(functionList);
         },[]);

        return <Component
            {...props}
            {...sliceOfStoreToPassToComponent}
            {...mattduxFunctions}
        />
    }

    return Connect;
}

// exports createStore function from mattdux instance
export const createStore = (reducers, initialState) => mattdux.createStore(reducers, initialState);