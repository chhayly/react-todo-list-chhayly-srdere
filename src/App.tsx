import React, { useState, useEffect } from 'react';

import './App.css';
import { Table , Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import  Header  from './Components/Header';
import Filter from './Components/Filter';
import mTodo from './Models/mTodo';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

import { collection, getDocs, deleteDoc, setDoc, doc} from "firebase/firestore"; 
import {db,dbRT} from "./DataAccessLayers/firebase";
import {  ref, set , onValue } from "firebase/database";

import {MD5} from './Utilities/Common';


function App() {
  
  const [filterKeyword, setFilterKeyword] = useState("");
  const [todos,setTodos] = useState<mTodo[]>([]);
  const [todosChecksum, setTodosChecksum] = useState("");

  /*------------------------------------------------------------------------*/
  //Run when todos are updated
  useEffect(() => {  
     getTodos(); 
  },[todosChecksum]);

  //Run on Startup
  useEffect(() => { 
   onValue(ref(dbRT, '/todos/checksum'), (snapshot) => {
    setTodosChecksum(snapshot.val())
  }, {
    onlyOnce: false
  });
},[]);
  /*------------------------------------------------------------------------*/
//Change Checksum
  function getTodosCheckSum()
  {
    return MD5(todosChecksum);
  }

//Action
  async function addTodo(todo:string)
  {
    if(CheckDuplicateTodo(todo))
    {
      if(!window.confirm("Warning: Duplicated todo entered. Do you want to procceed?")) return;
    }
    const _todo = mTodo.CreateTodo(todo);

    await setDoc(doc(db, "todos", _todo.getId), _todo.getObject());

    set(ref(dbRT, 'todos/checksum'), getTodosCheckSum());
  }
  async function getTodos()
    {
      const todofromserver = await getDocs(collection(db, "todos"))

      let _todos = todofromserver.docs.map(t=> {
        
        return new mTodo(t.data().id,t.data().todo,t.data().createdDate)
      });

      _todos = _todos.sort((a,b)=> b.createdDate- a.createdDate);

      setTodos(_todos);
    }
  async function updateTodo(todo:mTodo)
  {

    await setDoc(doc(db, "todos", todo.getId), todo.getObject());
  }
  async function deleteTodo(id:string)
  {
    await deleteDoc(doc(db,"todos",id))
  }

  

  //Handlder
  function filterInputOnChange(keyword:string)
  {
    setFilterKeyword(keyword);
  }
  async function editBtnHandler(id:string)
  {
  

    setTodos(t=>t.map(d=>
      {
        d.isEdit = d.getId === id;
        return d;
      }))
  }
  async function updateTodoHandler(todo:mTodo)
  {
    if(CheckDuplicateTodo(todo.todo,todo.getId))
    {
      if(!window.confirm("Warning: Duplicated todo entered. Do you want to procceed?")) return;
    }

    abortEditTodoHandler();
    await updateTodo(todo);
    set(ref(dbRT, 'todos/checksum'), getTodosCheckSum());
  }
  function abortEditTodoHandler()
  {
    setTodos(t=>t.map(d=>{
      d.isEdit = false;
      return d;
    }));
  }
  async function deleteBtnHandler(id:string)
  {
    deleteTodo(id);
    set(ref(dbRT, 'todos/checksum'), getTodosCheckSum());
  }
  function CheckDuplicateTodo(todo:string, id:string = "")
  {
    return todos.findIndex(t=> t.todo.toUpperCase()==todo.toUpperCase()&&t.getId!=id) >-1
  }
  

  return (
    <>
      <div className="container mx-auto px-auto" style={{minWidth:"380px", maxWidth:"60%"}}>
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
