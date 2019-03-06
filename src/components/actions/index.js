import uuid from 'uuid';
import { ADD_TODO, TOGGLE_COMPLETED, DELETE_TODO } from '../constants'

export const addTodo = text => {
    return {
        type: ADD_TODO,
        payload: {
            id: uuid(),
            date: new Date(),
            complete: false,
            text,
        }
    }
}

export const toggleCompleted = id => {
    return {
        type: TOGGLE_COMPLETED,
        payload: { id }
    }
}

export const deleteTodo = id => {
    return {
        type: DELETE_TODO,
        payload: { id }
    }
}
