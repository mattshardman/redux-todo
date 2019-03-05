import axios from 'axios';
import uuid from 'uuid';
import { ADD_TODO, TOGGLE_COMPLETED, DELETE_TODO } from '../constants'

export const addTodo = async text => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const { count } = await res.data;
    console.log(res.data)
    return {
        type: ADD_TODO,
        payload: {
            id: uuid(),
            date: new Date(),
            complete: false,
            text,
            count,
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