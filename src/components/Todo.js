import React, { useState } from 'react';
import styled from 'styled-components';

const TodoItem = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 80%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    -webkit-tap-highlight-color: transparent;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
`;

const ListItem = styled.div`
    z-index: 10;
    box-sizing: border-box;
    text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};
    position: absolute;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    display: flex;
    background: #fff;
    border-radius: 5px;
    justify-content: space-between;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    box-shadow: 0 3px 25px rgba(0,0,0,0.1);
    transform: ${({dragPosition}) => `translateX(${-dragPosition}px)`};
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: orange;
    width: 50%;
    border-radius: 5px;
    color: white;
    border: none;
    display: flex;
    justify-content: flex-end;
    outline: none;
    background: ${({deleteReady}) => deleteReady ? 'red' : 'orange'};
    transition: background 0.5s;
`;

const CompleteButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    border-radius: 5px;
    color: white;
    border: none;
    display: flex;
    justify-content: flex-start;
    outline: none;
    background: ${({completed}) => completed ? 'deepskyblue' : 'skyblue'};
    transition: background 0.5s;
`;


function Todo({ todo, toggleCompleted, deleteTodo }) {
    const [start, setStart] = useState(0);
    const [dragPosition, setDragPosition] = useState(0);
    const [deleteReady, setDeleteReady] = useState(false);

    const touchStartHandler = (e) => {
        if(!start) {
            return setStart(e.touches[0].pageX)
        }   
        return setStart(start + e.touches[0].pageX)
    }

    const calcDrag = (e) => {
        if (e.touches) {
            const { pageX } = e.touches[0];
            
            if (start - pageX > 70) {
                setDeleteReady(true);
            }

            return setDragPosition(start - pageX || 0);
        }
    } 

    const touchEndHandler = (e) => {
        if (dragPosition > 150) {
            deleteTodo(todo.id);
        }

        if(dragPosition > 40) {
            setStart(55);
            setDeleteReady(false);
            return setDragPosition(55);
        }

        if(dragPosition < -40) {
            setStart(-55);
            return setDragPosition(-55);
        }

        setStart(0);
        return setDragPosition(0);
    }

    return (
        <TodoItem>
            <ListItem 
                complete={todo.complete}
                dragPosition={dragPosition}
                onTouchStart={touchStartHandler}
                onTouchMove={calcDrag}
                onTouchEnd={touchEndHandler} 
            >
                {todo.text}
            </ListItem>
            <CompleteButton 
                completed={todo.completed}
                onClick={() => toggleCompleted(todo.id)}
            >
                <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                    <i className="material-icons">
                        done
                    </i>
                </div>
            </CompleteButton>
            <DeleteButton 
                deleteReady={deleteReady}
                onClick={() => deleteTodo(todo.id)}
            >
                <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                    <i className="material-icons">
                        delete
                    </i>
                </div>
            </DeleteButton>
        </TodoItem>
    )
}

export default Todo;
