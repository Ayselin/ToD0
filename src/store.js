const { createStore } = require('redux')

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const CHANGE_TODO = 'CHANGE_TODO'

export const addTodo = todo => ({
    type: ADD_TODO,
    payload: todo,
})

export const removeTodo = id => ({
    type: REMOVE_TODO,
    payload: id,
})

export const changeTodo = todo => ({
    type: CHANGE_TODO,
    payload: todo,
})

const getNewId = state => state.reduce((max, { id }) => Math.max(max, id) , 0) + 1

const reducer = (state = [], action) => {
    switch(action.type){
        case ADD_TODO:
            return [...state, { ...action.payload, id: getNewId(state) }]
        case REMOVE_TODO:
             return state.filter(todo => todo.id !== action.payload)
        case CHANGE_TODO:
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
        default:
            return state;      
    }
}

const store = createStore(reducer)
export default store
store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo({ id: 1, value: 'foo' }))
store.dispatch(addTodo({ id: 2, value: 'bar' }))
store.dispatch(removeTodo(1))
store.dispatch(changeTodo({ id: 2, value: 'baz' }))