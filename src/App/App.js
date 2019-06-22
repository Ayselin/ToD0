import React, { useState } from 'react'
import cx from 'classnames'
import styles from './App.css'
import TodoList from '../ToDo/TodoList';


const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    
      <div className={cx(styles.App)}>
        <div className={cx(styles.header)}>React Todo Application</div>
        <TodoList 
          onChange={newTodos => console.log({ newTodos }) || setTodos(newTodos)}
          todos={todos}
        />
      </div>
      );
};

   
export default App
  