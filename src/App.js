import React, { Component } from 'react';
import styled from 'styled-components';
import { createStore } from './mattdux';
import todo from './components/reducers/todos';
import TodoList from './components/TodoList';

const defaultState = [{
  id: 'demo',
  date: new Date(),
  text: 'Running',
  complete: false
}];

createStore({todo}, [defaultState]);

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
