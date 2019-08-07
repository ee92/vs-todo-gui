import React from 'react';
import styles from './Todos.css';

const Todo = ({todo, openTodo}) => {
   return (
      <div className={styles.todo} onClick={() => openTodo(todo.path, todo.line)}>
         <div className={styles.todoText}>{todo.text}</div>
         <div className={styles.todoPath}>
            <span className={styles.link}>
               {todo.path}
            </span>
         </div>
      </div>
   )
}

const Todos = ({list, openTodo}) => {
   return (
      <div className={styles.todos}>
         {list.map(todo => 
               <Todo
                  todo={todo}
                  openTodo={openTodo}
                  key={todo.path + todo.text}
               />
         )}
      </div>
   )
}

export default Todos;