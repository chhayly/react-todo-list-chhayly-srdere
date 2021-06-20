import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Table , Card ,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header  from './Components/Header';
import Filter from './Components/Filter';
import mTodo from './Models/mTodo';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

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


  /*------------------------------------------------------------------------*/
  useEffect(() => {    
    console.log("update")
    // Update the document title using the browser API    
  });
  /*------------------------------------------------------------------------*/


  //getTodos
  function getTodos() {
    return mytodos.map<mTodo>((t)=> new mTodo(t.id,t.todo));
  }
  //AddTodo
  function addTodo(todo:string)
  {
    if(CheckDuplicateTodo(todo))
    {
      if(!window.confirm("Warning: Duplicated todo entered. Do you want to procceed?")) return;
    }
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
  function filterInputOnChange(keyword:string)
  {
    setFilterKeyword(keyword);
  }


  //TodoList Component
  function editBtnHandler(id:string)
  {
    setTodos(t=>t.map(d=>
      {
        d.isEdit = d.getId === id;
        return d;
      }))
  }
  function updateTodoHandler(todo:mTodo)
  {
    if(CheckDuplicateTodo(todo.todo))
    {
      if(!window.confirm("Warning: Duplicated todo entered. Do you want to procceed?")) return;
    }

    abortEditTodoHandler();
    setTodos(t=>t.map(d=>
      {
        if(d.getId === todo.getId)
        {
          return todo;
        }
        return d;
      }))
  }
  function abortEditTodoHandler()
  {
    setTodos(t=>t.map(d=>{
      d.isEdit = false;
      return d;
    }));
  }
  function deleteBtnHandler(id:string)
  {
    setTodos(t=>t.filter(d=>d.getId !== id));
  }

  function CheckDuplicateTodo(todo:string)
  {
    return todos.findIndex(t=> t.todo.toUpperCase()==todo.toUpperCase()) >-1
  }
  

  return (
    <>
      <div className="container mx-auto px-auto" style={{width:"750px"}}>
      <Header></Header>
      <Filter 
      filterKeyword={filterKeyword} 
      filterInputOnChange={filterInputOnChange}
      onFocus={abortEditTodoHandler}></Filter>
      <Table striped bordered hover variant="light" className="mt-4">
        <tbody>
          <TodoInput 
          addTodo={addTodo}
          onFocus={abortEditTodoHandler}
          ></TodoInput>
          <TodoList
          todos={todos}
          filterKeyword={filterKeyword}
          editBtnHandler={editBtnHandler}
          updateTodoHandler={updateTodoHandler}
          abortEditTodoHandler = {abortEditTodoHandler}
          deleteBtnHandler={deleteBtnHandler}
          ></TodoList>
        </tbody>
      </Table>
      </div>
    </>
  );
}

export default App;
