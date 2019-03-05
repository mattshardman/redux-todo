import React, { useState, useEffect } from 'react';
import Mattdux from './createInstance';

export const mattdux = new Mattdux();

export const connect = (stateWanted, functions) => Component => {
    const Connect = (props) => {
        const [mattduxFunctions, setMattduxFunctions] = useState();
        const [store, setStore] = useState(mattdux.store);
      
        const sliceOfStoreToPassToComponent = { state: stateWanted ? stateWanted(store) : store };

        useEffect(() => {
            if (!functions) {
                return null;
            }
            
            Object
                .entries(functions)
                .forEach(([funcName, func]) => mattdux.on(funcName, func));

            const functionList = Object
                .entries(functions)
                .reduce((acc, [funcName]) => {
                    acc[funcName] = payload => { 
                        const newState = mattdux.emit(funcName, payload)
                        setStore(newState);             
                    }
                    return acc;
                }, {});

            return setMattduxFunctions(functionList);
         },[]);

        return <Component
            {...sliceOfStoreToPassToComponent}
            {...mattduxFunctions}
        />
    }

    return Connect;
}

export const createStore = (reducers, initialState) => mattdux.createStore(reducers, initialState);