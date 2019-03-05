import uuid from 'uuid';
import { ADD_TODO, TOGGLE_COMPLETED, DELETE_TODO } from '../constants'

export const addTodo = payload => {
    return {
        type: ADD_TODO,
        
        payload: {
            id: uuid(),
            date: new Date(),
            complete: false,
            text: payload
        }
    }
}

export const toggleCompleted = payload => {
    return {
        type: TOGGLE_COMPLETED,
        payload
    }
}

export const deleteTodo = payload => {
    return {
        type: DELETE_TODO,
        payload
    }
}