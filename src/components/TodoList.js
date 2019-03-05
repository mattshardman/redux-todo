import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addTodo, toggleCompleted, deleteTodo } from './actions';
import styled from 'styled-components';

import Todo from './Todo';

const Section = styled.section`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 500px;
    max-width: 100%;
    overflow: hidden;
`;

const Header = styled.h1`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const TodoWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow-Y: scroll;
    overflow-X: hidden;
    min-height: 90px;
    transform: all 3s;
`;

const ButtonWrapper = styled.form`
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    border: none;
    border-radius: 22px;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 70%;
    border: none;
    border-radius: 20px;
    height: 40px;
    padding: 0 15px;
    outline: none;
    box-shadow: 0 3px 25px rgba(0,0,0,0.1);
`;

const Button = styled.button`
    box-sizing: border-box;
    width: 25%;
    height: 40px;
    background: #4285F4;
    border-radius: 20px;
    border: none;
    color: #fff;
    outline: none;
    box-shadow: 0 3px 25px rgba(0,0,0,0.2);
`;

function TodoList(props) {
    const [field, setField] = useState('');
    const { todos } = props.state;

    return (
        <Section>
            <Header>Todos</Header>

            <TodoWrapper>
                { todos.map((todo, index) => 
                    <Todo 
                        key={todo.id} 
                        index={index}
                        toggleCompleted={props.toggleCompleted}
                        deleteTodo={props.deleteTodo}
                        todo={todo} 
                    />) 
                }
            </TodoWrapper>

            <ButtonWrapper 
                onSubmit={(e) => {
                    e.preventDefault();
                    props.addTodo(field);
                    setField('');
                }}
            >
                <Input
                    type="text" 
                    placeholder="Add todo..."
                    value={field} 
                    onChange={e => setField(e.target.value)} 
                />
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </Section>
    )
}

const mapStateToProps = state => { 
    return {state}
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addTodo, toggleCompleted, deleteTodo });
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
