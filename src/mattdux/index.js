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
                .forEach(each => mattdux.on(each[0], each[1]));

            const functionList = Object
                .entries(functions)
                .reduce((acc, func) => {
                    acc[func[0]] = payload => { 
                        const newState = mattdux.emit(func[0], payload);
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