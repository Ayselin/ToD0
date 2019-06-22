import React, { useState } from 'react'
import styles from './Redux.css'
import { Provider, connect } from 'react-redux'
import store, { addTodo, changeTodo, removeTodo } from '../store'


const App = ({ todos, addTodo, changeTodo, removeTodo }) => {
    const [newTodo, setNewTodo] = useState('')
    return (
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Todo Appliction</h1>
            </header>
            <div className={styles.main}>
            <input value={newTodo} placeholder='add your todos' onChange={e => setNewTodo(e.target.value)} />
            <button onClick={() => {
                addTodo({ value: newTodo })
                setNewTodo('')
            }}>Add</button>
            <ul className={styles.list}>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.value}<button onClick={() => removeTodo(todo.id)}>Remove</button></li>
                ))}
            </ul>
            </div>
            <footer>
                <h1 className={styles.footer}> Thank you</h1>
            </footer>
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