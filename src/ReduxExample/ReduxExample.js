import React, { useState } from 'react'
import { Provider, connect } from 'react-redux'
import store, { addTodo, changeTodo, removeTodo } from '../store'


const App = ({ todos, addTodo, changeTodo, removeTodo }) => {
    const [newTodo, setNewTodo] = useState('')
    return (
        <div>
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            <button onClick={() => {
                addTodo({ value: newTodo })
                setNewTodo('')
            }}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.value}<button onClick={() => removeTodo(todo.id)}>Remove</button></li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state,
})
const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo)),
    changeTodo: todo => dispatch(changeTodo(todo)),
    removeTodo: id => dispatch(removeTodo(id)),
})

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

const ReduxExample = () => (
    <Provider store={store}>
        <ConnectedApp />
    </Provider>
)

export default ReduxExample