import React from 'react'
import { StoreContext } from './Context';

export const connect = (sliceOfStateWanted, functions) => (Component) => {
    class Connect extends React.Component {
        static contextType = StoreContext;

        constructor() {
            super();
            this.state = {
                mattduxFunctions: null,
                store: null,
            }
        }     

        componentDidMount() {
            this.setState({ store: this.context.store })
            // convert object containing actions to array
            const arrayOfFunctions = Object.entries(functions);
            // for each function add an event listener to mattdux
            arrayOfFunctions.forEach(([funcName, func]) => this.context.on(funcName, func));
            // for each function create a function that will emit an event to mattdux
            // each function is then passed to the wrapped component
            const functionList = () => arrayOfFunctions.reduce((acc, [funcName]) => {
                // create a function on the HOC state that will emit an event to mattdux instance when called by the wrapped component
                acc[funcName] = payload => { 
                    // emits an event to mattdux instance that returns a new store
                    const newStore = this.context.emit(funcName, payload);
                    // if the newStore returns a promise call .then on it and then set the HOC store state to the new store
                    // otherwise immediately set the HOC store state to the new store
                    if (newStore instanceof Promise) {
                        newStore.then(result => { 
                            // set HOC store to desired slice of state based on function passed in as mapStateToProps
                            const componentStore = sliceOfStateWanted(result);   
                            this.setState({ store: componentStore });
                        });
                    } else {   
                        // set HOC store to desired slice of state based on function passed in as mapStateToProp
                        const componentStore = sliceOfStateWanted(newStore);   
                        this.setState({ store: componentStore });
                    }         
                }
                return acc;
            }, {});

            return this.setState({ mattduxFunctions: functionList() });
        }

        render() {
            if (this.state.store) {
                return (
                    <Component
                        {...this.props}
                        {...this.state.store}
                        {...this.state.mattduxFunctions}
                    />
                )
            }

            return null;
        }
    }

    Connect.createContext = StoreContext;

    return Connect;
}

export default connect;