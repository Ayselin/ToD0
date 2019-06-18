import React, {useState, useEffect} from 'react';
import cx from 'classnames'
import styles from './ToDo.css'
import { func, number, string, shape } from 'prop-types';
import { addTodo } from '../store';

const inputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
        value, 
        onChange: (e) => setValue(e.target.value)
    };
}

const TodoItem = ({ todo, onChange }) => {
    
    const input = inputValue(todo.value);
    useEffect(() => onChange({ ...todo, value: input.value }), [input.value])
    return (
        <input {...input}/>
    )
}

TodoItem.propTypes = {
    todo: shape({
        id: number.isRequired,
        value: string.isRequired,
    }).isRequired,
    onChange: func.isRequired,
}
const TodoList = ({ todos, onChange }) => {
    const [todosState, setTodosState] = useState(todos)
    const onItemChange = ({ id, value }) => setTodosState(todosState.map(todo => {
        // Here is some logic to update existing todos..
        // But I can't see any logic for adding them
        if (todo.id === id) return { ...todo, value }
        return todo
    }))
    useEffect(() => onChange(todosState), [todosState])

    return (
    <div className={cx(styles.main)}>
        {/* This is our existing todos, adding a new one should be outside this loop */}
        {todos.map(todo => (
            <React.Fragment key={todo.id}>
                <button onClick={() => {
                    addTodo({ value: newTodo }
                }}>Add Todo</button>
                <TodoItem
                    todo={todo}
                    onChange={onItemChange}
                >{todo.value}</TodoItem>
            </React.Fragment>
        ))}
    </div>
    );
};

TodoList.propTypes = {
    onChange: func.isRequired,
}
export default TodoList
