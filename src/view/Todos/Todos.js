import React from 'react';
import styles from './Todos.css';

const Todo = ({todo}) => {
   return (
      <div className={styles.todo}>
         <div className={styles.todoText}>{todo.text}</div>
         <div className={styles.todoPath}>
            <span className={styles.link}>
               {todo.path}
            </span>
         </div>
      </div>
   )
}

const Todos = ({list}) => {
   return (
      <div className={styles.todos}>
         {list.map(todo => 
               <Todo
                  todo={todo} 
                  key={todo.path + todo.text}
               />
         )}
      </div>
   )
}

export default Todos;