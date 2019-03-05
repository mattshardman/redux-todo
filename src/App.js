import React, { Component } from 'react';
import styled from 'styled-components';
import { createStore, mattdux } from './mattdux';

import rootReducer from './components/reducers';

import TodoList from './components/TodoList';


createStore(rootReducer);

console.log(mattdux)

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaeaea;
`;

class App extends Component {
  render() {
    return (  
        <Wrapper>
          <TodoList />
        </Wrapper>
    );
  }
}

export default App;
