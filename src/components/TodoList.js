import React, { useState } from 'react';
import { connect } from '../mattdux';
// import { connect } from 'react-redux';
import * as actions from '../actions';
import styled from 'styled-components';
import Todo from './Todo';
import SearchBar from './SearchBar';
import Footer from './Footer';

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

function TodoList(props) {
    const [field, setField] = useState('');   
    const [showAdd, setShowAdd] = useState(false);
    const { todos } = props;

    return (
        <Section>
            <SearchBar 
                showAdd={showAdd}
                filterTodo={props.filterTodo}
            /> 
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

            <Footer 
                addTodo={props.addTodo} 
                showAdd={showAdd} 
                setShowAdd={setShowAdd} 
            />

        </Section>
    )
}

const mapStateToProps = ({ todos }) => {
    return { todos };
}

export default connect(mapStateToProps, actions)(TodoList);
