import React, { Component } from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './components/reducers';
import TodoList from './components/TodoList';

const store = createStore(rootReducer);

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
      <Provider store={store}>
        <Wrapper>
          <TodoList />
        </Wrapper>
      </Provider>
    );
  }
}

export default App;
