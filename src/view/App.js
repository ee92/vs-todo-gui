import React, {useState, useEffect} from 'react';
import Todos from './Todos';
import styles from './App.css';

const vscode = acquireVsCodeApi(); 

const App = () => {
   const [list, setList] = useState([]);

   useEffect(() => {
      vscode.postMessage({action: 'init'})
   }, [])

   useEffect(() => {
      window.addEventListener('message', event => {
         const todos = event.data.project.todos;
         setList(todos);
      });
   }, [list])

   const openTodo = (path) => {
      vscode.postMessage({action: 'open', payload: path})
   }

   return (
      <div className={styles.root}>
         <Todos list={list} openTodo={openTodo}/>
      </div>
   )
}

export default App;