import React, { useState } from 'react';
import { connect } from 'react-redux'
import { addTodo, toggleCompleted, deleteTodo } from './actions';
import styled from 'styled-components';

import Todo from './Todo';

const Section = styled.section`
    box-sizing: border-box;
    position: relative;
    width: 500px;
    max-width: 90%;
`;

const TodoWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 400px;
`

const ButtonWrapper = styled.form`
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    border: none;
    border-radius: 22px;
    padding: 3px 6px;
    width: 80%;
    margin: 0 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 3px 25px rgba(0,0,0,0.1);
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 70%;
    border: none;
    border-radius: 20px;
    height: 40px;
    padding: 0 15px;
    outline: none;
`;

const Button = styled.button`
    box-sizing: border-box;
    width: 25%;
    height: 35px;
    background: deepskyblue;
    border-radius: 20px;
    border: none;
    color: #fff;
    outline: none;
`

function TodoList(props) {
    const [field, setField] = useState('');
    const { todos } = props.state;

    return (
        <Section>
            <TodoWrapper>
                { todos.map(todo => 
                    <Todo 
                        key={todo.id} 
                        toggleCompleted={props.toggleCompleted}
                        deleteTodo={props.deleteTodo}
                        todo={todo} />) 
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

export default connect(mapStateToProps, { addTodo, toggleCompleted, deleteTodo })(TodoList);
