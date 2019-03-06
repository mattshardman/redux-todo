import React, { useState } from 'react';
import { connect } from '../mattdux';
// import { connect } from 'react-redux';
import * as actions from '../actions';
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
    overflow: scroll;
    padding-bottom: 50px;

    ::-webkit-scrollbar { 
        display: none; 
    } 
`;

const SearchBar = styled.div`
    z-index: 1000; 
    position: fixed; 
    box-sizing: border-box; 
    height: 95px; 
    width: 100%; 
    padding: 20px;
`;

const Header = styled.p`
    display: flex;
    justify-content: flex-start;
    padding: 0 20px;
    font-size: 12px;
    color: #484848;
    margin: 5px 0;
    font-weight: 700;
    padding-top: ${({shiftUp}) => shiftUp ? '10px' : '90px'};
    transition: padding-top 200ms;
`;

const TodoWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
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
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InputWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 55px;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.2);
    transform: ${({show, up}) => show ? 'translateY(0%)' : `translateY(${up ? '-140%' : '140%'})`};
    transition: transform 200ms;
    display: flex;
    align-items: center;
    overflow: hidden;

    button {
        background: none;
        border: none;
        margin-right: 15px;
        padding: 0;
        display: flex;
        align-items: center;
        height: 100%;
        outline: none;
    }
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 15px;
    outline: none;
    font-size: 14px;
`;

const Button = styled.button`
    position: fixed;
    right: 10px;
    bottom: 10px;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    background: #4285F4;
    border-radius: 50%;
    border: none;
    color: #fff;
    outline: none;
    box-shadow: 0 3px 15px rgba(0,0,0,0.3);
`;

function TodoList(props) {
    const [field, setField] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const { todos } = props;

    return (
        <Section>
            <SearchBar>
                <InputWrapper
                    up
                    show={!showAdd}
                >
                    <Input
                        type="text" 
                        placeholder="Search here"
                        value={searchTerm} 
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            props.filterTodo(e.target.value);
                        }}
                    />
                </InputWrapper>
            </SearchBar>
            <Header shiftUp={showAdd}>TODOS</Header>

            <TodoWrapper>
                { todos.map((todo, index) => ( 
                    todo.display ?
                    <Todo 
                        key={todo.id} 
                        index={index}
                        toggleCompleted={props.toggleCompleted}
                        deleteTodo={props.deleteTodo}
                        todo={todo} 
                    />
                    :
                    null
                )
                ) 
                }
            </TodoWrapper>

            <ButtonWrapper 
                onSubmit={(e) => {
                    e.preventDefault();
                    props.addTodo(field);
                    setField('');
                }}
            >
                <InputWrapper show={showAdd}>
                    <Input
                        type="text" 
                        placeholder="Add todo..."
                        value={field} 
                        
                        onChange={e => setField(e.target.value)} 
                    />
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        setShowAdd(false)
                    }}>
                        <i className="material-icons" style={{ color: '#484848' }}>close</i>
                    </button>
                </InputWrapper>
                { !showAdd &&
                <Button type="button" onClick={e => {
                    e.preventDefault();
                    setShowAdd(true);
                }}>
                    <i className="material-icons">add</i>
                </Button>
                }
            </ButtonWrapper>
        </Section>
    )
}

const mapStateToProps = ({ todos }) => {
    return { todos };
}

export default connect(mapStateToProps, actions)(TodoList);
