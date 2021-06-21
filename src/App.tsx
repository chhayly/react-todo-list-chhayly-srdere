import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Table , Card ,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Header  from './Components/Header';
import Filter from './Components/Filter';
import mTodo from './Models/mTodo';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

import { collection, getDocs, addDoc , updateDoc , deleteDoc, setDoc, doc} from "firebase/firestore"; 
import  db  from "./DataAccessLayers/firebase";


function App() {
  //Filter Componenet
  const [filterKeyword, setFilterKeyword] = useState("");
  const [todos,setTodos] = useState<mTodo[]>([]);

  /*------------------------------------------------------------------------*/
  useEffect(() => {    
    const  getTodos = async()=>
    {
      console.log("getTodos")
      const todofromserver = await getDocs(collection(db, "todos"))
      const _todos = todofromserver.docs.map(t=> {
        return new mTodo(t.data().id,t.data().todo,t.data().isLocked)
      });
      setTodos(_todos);
    }
    getTodos();
    // Update the document title using the browser API    
  },[filterKeyword]);

  useEffect(()=>
  {
    const onbeforeunloadFn = () => {
      
      todos.forEach(async t=>
        {
          if(t.isEdit)
          {
            await updateDoc(doc(db,"todos",t.getId),{isLocked:false});
          }
        })
    }

    window.addEventListener('beforeunload', onbeforeunloadFn);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn);
    }
  },[])


  /*------------------------------------------------------------------------*/

  //AddTodo
  async function addTodo(todo:string)
  {
    if(CheckDuplicateTodo(todo))
    {
      if(!window.confirm("Warning: Duplicated todo entered. Do you want to procceed?")) return;
    }
    const _todo = mTodo.CreateTodo(todo);

    await setDoc(doc(db, "todos", _todo.getId), _todo.getObject());

    setTodos(t=> [mTodo.CreateTodo(todo),...t])
  }
  //updateTodo
  async function updateTodo(todo:mTodo)
  {
    todo.isLocked = false;
    await setDoc(doc(db, "todos", todo.getId), todo.getObject());
  }
  //DeleteTodo
  async function deleteTodo(id:string)
  {
    await deleteDoc(doc(db,"todos",id))
  }


  //FilterTodoList
  function filterInputOnChange(keyword:string)
  {
    setFilterKeyword(keyword);
  }


  //TodoList Component
  async function editBtnHandler(id:string)
  {
    await updateDoc(doc(db,"todos",id),
    {
      isLocked:true
    })

    setTodos(t=>t.map(d=>
      {
        d.isEdit = d.getId === id;
        return d;
      }))
  }
  function updateTodoHandler(todo:mTodo)
  {
    abortEditTodoHandler();
    updateTodo(todo);
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
    deleteTodo(id);
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
