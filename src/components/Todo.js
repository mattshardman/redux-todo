import React, { useState } from 'react';
import styled from 'styled-components';

const TodoItem = styled.div`
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 10px);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    -webkit-tap-highlight-color: transparent;
    margin: 2px 0px;
    border-radius: 5px;
    cursor: pointer;
`;

const ListItem = styled.button`
    z-index: 10;
    box-sizing: border-box;
    border: 1px solid #fff;
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
    background: #fff;

    text-decoration: ${({ complete }) => complete ? 'line-through' : 'none'};
    border-top-left-radius: ${({ complete }) => complete ? '35px' : '5px'};
    box-shadow: ${({dragPosition}) => dragPosition ? '0 3px 12px rgba(0,0,0,0.1)' : 'none'};
    transform: ${({dragPosition}) => `translateX(${-dragPosition}px)`};
    transition: ${({finished}) => finished ? 'border-top-left-radius 250ms, transform 250ms, background 420ms' : 'none'};

    /* animation for demo component only */
    animation-name: ${({id}) => id === 'demo' && 'demo'};
    animation-duration: 2s;
    animation-iteration-count: 1;

    @keyframes demo {
        0% { transform: translateX(0); box-shadow: none; }
        25% { transform: translateX(80px); box-shadow: 0 3px 12px rgba(0,0,0,0.1); }
        75% { transform: translateX(80px); box-shadow: 0 3px 12px rgba(0,0,0,0.1); }
        100% { transform: translateX(0); box-shadow: none; }
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: crimson;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    height: 98%;
    width: 99%;
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
    animation-name: ${({id}) => id === 'demo' && 'demo-touch'};
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
        id: todo.id,
        complete: todo.complete,
        finished,
        dragPosition,
    }

    return (
        <TodoItem>
            <ListItem 
                {...listItemProps}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler} 
            >   
                { todo.id === 'demo' && 
                    <DemoTouch 
                        id={todo.id}
                    />
                }
                <ContentWrapper>
                    <Avatar>
                        <h1 style={{ margin: 0, fontSize: 16, color: '#fff' }}>
                            {todo.text.charAt().toUpperCase()}
                        </h1>
                    </Avatar>
                    <TextWrapper>
                        <small>{todo.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
                        <h2 style={{ margin: '10px 0' }}>{todo.text}</h2>
                    </TextWrapper>
                </ContentWrapper>
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
