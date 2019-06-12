import React, { useState } from 'react'
import cx from 'classnames'
import styles from './App.css'
import TodoList from '../ToDo/TodoList';


const App = () => {
  const [todos, setTodos] = useState([{ id: 1, value: 'Test' }]);

  console.log({ todos })
  return (
    
      <div className={cx(styles.App)}>
        <TodoList 
          onChange={newTodos => console.log({ newTodos }) || setTodos(newTodos)}
          todos={todos}
        />
      </div>
      );
};

   
export default App
  