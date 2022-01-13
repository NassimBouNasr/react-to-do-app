import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import ToDoList from './components/ToDoList'

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //useEffect that runs only once at the start of the application

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(()=> {
    filterhandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterhandler = () => {
    switch(status){
    case 'completed':
      setFilteredTodos(todos.filter((todo)=> todo.completed === true));
      break;
      case 'incompleted':
      setFilteredTodos(todos.filter((todo)=> todo.completed === false));
      break;
      default:
        setFilteredTodos(todos);
    }
  }

  //save to local storage
  const saveLocalTodos = () => {
   localStorage.setItem('todos', JSON.stringify(todos));
  }

  //getting todos from local storage

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
      let localTodos = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodos);
    }
  }

  return (
    <div>
        <header>Nassim's to do list</header>
        <Form 
        inputText={inputText} 
        setInputText={setInputText} 
        todos={todos} 
        setTodos={setTodos}
        setStatus={setStatus}/>
        <ToDoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}/>
    </div>
  )
}
