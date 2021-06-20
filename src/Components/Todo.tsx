import React, { useState } from 'react';
import {Button , Form } from 'react-bootstrap';
import mTodo from '../Models/mTodo';
//import mTodo from '../Models/mTodo';



const Todo: React.FC<{todo:mTodo,updateTodo:Function,deleteTodo:Function}> = ({todo,updateTodo,deleteTodo}) =>{

    const [showBtn, setShowBtn] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const btnEditOnClick = (e:any) => 
    {
        setShowEdit(t=>!t);
    }
    const enterUpdateTodo = (e:any) => 
    {
        if(e.key === 'Enter'){
            setShowEdit(t=>!t);

            todo.setTodo = e.target.value;
            updateTodo(todo);
        } 
    }
    const AbortEdit = (e:any) => 
    {
        if(e.key === 'Escape')
        {
            e.target.value= todo.getTodo;
            setShowEdit(t=>!t);
        }
    }


    const btnDeleteOnClick = (e:any) => 
    {
        deleteTodo(todo.getId)
    }

    const ShowBtn = (e:any) =>
    {
        setShowBtn(true)
    }
    const HideBtn = (e:any) =>
    {
        setShowBtn(false);
    }

   return (
       <>
        <tr style={!showEdit ? {display:""}: {display:"none"}} onMouseEnter={ShowBtn} onMouseLeave={HideBtn}>
            <td>
                <div className="row px-3">
                <div className="mr-auto">{todo.getTodo}</div>
                <div className="d-line ml-auto mt-3" style={ showBtn ? {display:""}:{display:"none"}}>
                <Button variant="btn btn-secondary btn-sm" onClick={btnEditOnClick}>Edit</Button>
                <Button variant="btn btn-danger btn-sm ml-1" onClick={(btnDeleteOnClick)}>Remove</Button>
                </div>
                </div>
            </td>
        </tr>
        <tr style={showEdit ? {display:""}: {display:"none"}}>
        <td>
            <div className="row">
            <div className="col-12">
            <Form.Control as="textarea" className="form-control-md" defaultValue={todo.getTodo} onKeyUp={AbortEdit} onKeyPress={enterUpdateTodo}></Form.Control></div>
            </div>
        </td>
    </tr> 
    </>
    )}

export default Todo;