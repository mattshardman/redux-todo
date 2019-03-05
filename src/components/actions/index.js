import { ADD_TODO, TOGGLE_COMPLETED, DELETE_TODO } from '../constants'

export const addTodo = payload => {
    return {
        type: ADD_TODO,
        date: new Date(),
        payload
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