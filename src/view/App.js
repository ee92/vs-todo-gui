import React, {useState, useEffect} from 'react';
import Todos from './Todos';
import styles from './App.css';

const vscode = acquireVsCodeApi(); 

const App = () => {
   const [list, setList] = useState([]);

   useEffect(() => {
      vscode.postMessage('hello from react')
   }, [])

   useEffect(() => {
      window.addEventListener('message', event => {
         const todos = event.data.project.todos;
         setList(todos);
      });
   }, [list])

   return (
      <div className={styles.root}>
         <Todos list={list}/>
      </div>
   )
}

export default App;