import React, {useState, useEffect} from 'react';
import cx from 'classnames'
import styles from './ToDo.css'
import { func, number, string, shape } from 'prop-types';

const inputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
        value, 
        onChange: (e) => setValue(e.target.value)
    };
}

const TodoItem = ({ todo, onChange, onRemove }) => {
    const input = inputValue(todo.value);
    useEffect(() => onChange({ ...todo, value: input.value }), [input.value])
    return (
        <div className={styles.todoItem}>
            <input {...input}/>
            <button onClick={() => onRemove(todo.id)}>Remove</button>
        </div>
    )
}

TodoItem.propTypes = {
    todo: shape({
        id: number.isRequired,
        value: string.isRequired,
    }).isRequired,
    onChange: func.isRequired,
    onRemove: func.isRequired,
}


const getNewId = state => state.reduce((max, { id }) => Math.max(max, id) , 0) + 1

const TodoList = ({ todos, onChange }) => {
    const [todosState, setTodosState] = useState(todos)
    const onItemChange = ({ id, value }) => setTodosState(todosState.map(todo => {
        // Here is some logic to update existing todos..
        // But I can't see any logic for adding them
        if (todo.id === id) return { ...todo, value }
        return todo
    }))
    useEffect(() => onChange(todosState), [todosState])
    const [newTodoText, setNewTodoText] = useState('')
    const addTodo = () => {
        setTodosState([
            ...todosState,
            {
                value: newTodoText,
                id: getNewId(todosState),
            }
        ])
        setNewTodoText('')
    }
    const onRemoveTodo = id => {
        setTodosState(todosState.filter(todo => todo.id !== id))
    }
    return (
    <div className={cx(styles.main)}>
        <input
            value={newTodoText}
            onChange={event => setNewTodoText(event.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
        {/* This is our existing todos, adding a new one should be outside this loop */}
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onChange={onItemChange}
                onRemove={onRemoveTodo}
            >{todo.value}</TodoItem>
        ))}
    </div>
    );
};

TodoList.propTypes = {
    onChange: func.isRequired,
}
export default TodoList
