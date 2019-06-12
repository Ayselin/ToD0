import React, {useState, useEffect} from 'react';
import { func, number, string, shape } from 'prop-types';

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
        if (todo.id === id) return { ...todo, value }
        return todo
    }))
    useEffect(() => onChange(todosState), [todosState])

    return (
    <div>
        {todos.map(todo => (
            <button>Add Todo</button>
            <TodoItem
                key={todo.value}
                todo={todo}
                onChange={onItemChange}
            >{todo.value}</TodoItem>
        ))}
    </div>
    );
};

TodoList.propTypes = {
    onChange: func.isRequired,
}
export default TodoList
