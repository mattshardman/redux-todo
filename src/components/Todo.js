import React, { useState } from 'react';
import styled from 'styled-components';

const TodoItem = styled.div`
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 10px);
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    -webkit-tap-highlight-color: transparent;
    margin: 2.5px 0px;
    border-radius: 5px;
    cursor: pointer;
`;

const ListItem = styled.button`
    z-index: 10;
    box-sizing: border-box;
    border: none;
    outline: none;
    position: absolute;
    padding: 0 15px;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    box-shadow: 0 3px 12px rgba(0,0,0,0.1);
    background: ${({deleteMode}) => deleteMode ? 'red' : '#fff'};
    text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};
    border-top-left-radius: ${({ complete }) => complete ? '30px' : '5px'};
    transform: ${({dragPosition}) => `translateX(${-dragPosition}px)`};
    transition: ${({finished}) => finished ? 'border-top-left-radius 250ms, transform 250ms, background 420ms' : 'none'};
    animation-name: ${({index}) => !index && 'demo'};
    animation-duration: 2s;
    animation-iteration-count: 1;

    @keyframes demo {
        0% { transform: translateX(0); }
        25% { transform: translateX(80px); }
        75% { transform: translateX(80px); }
        100% { transform: translateX(0); }
    }
`;

const TextWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0;
`;

const CompleteButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    color: white;
    border: none;
    display: flex;
    justify-content: flex-start;
    outline: none;
    background: ${({willSetComplete}) => willSetComplete ? '#0F9D58' : '#ddd'};
    transition: background 0.5s;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
`;

const DemoTouch = styled.div`
    position: absolute;
    left: 45px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: #4285F4;
    animation-name: demo-touch;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    
    @keyframes demo-touch {
        0% { display: block; opacity: 0; }
        25% { display: block; opacity: 1; }
        75% { display: block; opacity: 1; }
        100% { display: none; opacity: 0;  }
    }
`;


function Todo({ index, todo, toggleCompleted, deleteTodo }) {
    const [start, setStart] = useState(0);
    const [dragPosition, setDragPosition] = useState(0);
    const [finished, setFinished] =  useState(false);

    const [willSetComplete, setWillSetComplete] = useState(false); 

    const touchStartHandler = (e) => {
        setFinished(false);

        if(!start) {
            return setStart(e.touches[0].pageX)
        }   
        return setStart(start + e.touches[0].pageX)
    }

    const touchMoveHandler = (e) => {
        if (e.touches) {
            const { pageX } = e.touches[0];

            if(start - pageX > 0) {
                return setDragPosition(0);
            }

            if (todo.complete && start - pageX < -100) {
                setWillSetComplete(false);
            }

            if (!todo.complete && start - pageX < -100) {
                setWillSetComplete(true);
            }
            return setDragPosition(start - pageX || 0);
        }
    } 

    const touchEndHandler = (e) => {
        if(dragPosition < -100) {
            setStart(0);
            setFinished(true);
            toggleCompleted(todo.id)
            return setDragPosition(0);
        }

        setStart(0);
        setFinished(true);
        return setDragPosition(0);
    }

    const listItemProps = {
        index,
        finished,
        dragPosition,
        complete: todo.complete
    }

    return (
        <TodoItem>
            <ListItem 
                {...listItemProps}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler} 
            >   
                { !index && 
                    <DemoTouch 
                        index={index}
                    />
                }
                <TextWrapper>
                    <small>{todo.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
                    <h2 style={{ margin: '10px 0' }}>{todo.text}</h2>
                </TextWrapper>
                { todo.complete &&
                <DeleteButton onClick={() => deleteTodo(todo.id)}>
                    <i className="material-icons">
                        delete
                    </i>
                </DeleteButton>
                }
            </ListItem>
            <CompleteButton 
                completed={todo.completed}
                willSetComplete={willSetComplete}
                onClick={() => toggleCompleted(todo.id)}
            >
                <div style={{ width: 40, display: 'flex', justifyContent: 'center' }}>
                    <i className="material-icons">
                        done
                    </i>
                </div>
            </CompleteButton>
        </TodoItem>
    )
}

export default Todo;
