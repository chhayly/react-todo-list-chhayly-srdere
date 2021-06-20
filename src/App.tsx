import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Table , Card ,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header  from './Components/Header';
import Todo from './Components/Todo';
import Filter from './Components/Filter';
import mTodo from './Models/mTodo';
import TodoInput from './Components/TodoInput';

let mytodos = 
[
  {id:"1",todo:"finish project",createdDate:new Date()},
  {id:"2",todo:"research on react",createdDate:new Date()},
  {id:"3",todo:"call mom",createdDate:new Date()},
  {id:"4",todo:"buy grocceries",createdDate:new Date()},
  {id:"5",todo:"buy phone",createdDate:new Date()},
  {id:"6",todo:"buy car",createdDate:new Date()}
]

function App() {

  const mytd = getTodos();

  //Filter Componenet
  const [filterKeyword, setFilterKeyword] = useState("");

  const [todos,setTodos] = useState(mytd);
  
  useEffect(() => {    
    console.log("update")
    // Update the document title using the browser API    

  });
  
  //getTodos
  function getTodos() {
    return mytodos.map<mTodo>((t)=> new mTodo(t.id,t.todo,new Date()));
  }
  //AddTodo
  function addTodo(todo:string)
  {
    setTodos(t=> [mTodo.CreateTodo(todo),...t])
  }
  //updateTodo
  function updateTodo(todo:mTodo)
  {
    setTodos(t=> t.map(d=> d.getId === todo.getId ? todo : d));
  }
  //DeleteTodo
  function deleteTodo(id:string)
  {
     //UI Delete
    setTodos(t=> t.filter(d=>d.getId!=id));
  }


  //FilterTodoList
  function filterTodoList(keyword:string)
  {
    setFilterKeyword(keyword);
  }
  //GetTodosList
  function getTodosList(keyword:string)
  {
    return todos
    .filter((t)=> t.getTodo.indexOf(keyword)>-1)
    .map((t)=> <Todo todo={t} deleteTodo={deleteTodo} updateTodo={updateTodo} ></Todo>);
    
  }
  

  return (
    <>
      <div className="container mx-auto px-auto">
      <Header></Header>
      <Filter filterKeyword={filterKeyword} filterTodoList={filterTodoList}></Filter>
      <Table striped bordered hover variant="light" className="mt-4">
        <tbody>
          <TodoInput addTodo={addTodo}></TodoInput>
        {getTodosList(filterKeyword)}
        </tbody>
      </Table>
      </div>
    </>
  );
}

export default App;
