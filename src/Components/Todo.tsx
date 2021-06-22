import React, { useState } from 'react';
import {Button , Form } from 'react-bootstrap';
import mTodo from '../Models/mTodo';
//import mTodo from '../Models/mTodo';



const Todo: React.FC<{
    todo:mTodo,
    editBtnHandler:Function,
    updateTodoHandler:Function,
    abortEditTodoHandler:Function,
    deleteBtnHandler:Function
}> = 
(
    {
        todo,
        editBtnHandler,
        updateTodoHandler,
        abortEditTodoHandler,
        deleteBtnHandler
    }
    ) =>
    {
    const [showBtn, setShowBtn] = useState(false);

    const [todoText, setTodoText] = useState(todo.todo);

    const [showInvalid, setShowInvalid] = useState(false);

    const ShowBtn = (e:any) =>
    {
        setShowBtn(true)
    }
    const HideBtn = (e:any) =>
    {
        setShowBtn(false);
    }

    function btnDeleteOnClick (e: any)
    {
        deleteBtnHandler(todo.getId);
    }
    function btnEditOnClick (e: any)
    {
        setTodoText(todo.todo);
        editBtnHandler(todo.getId);
    }
    function abortEditOnKeyUp(e:any)
    {
        if(e.key=== 'Escape'){
        abortEditTodoHandler();
        setTodoText(todo.todo);
    }
    }
    function enterUpdateTodo(e:any)
    {
        if(e.key === 'Enter')
        {
            if(todoText=="")
            {
                setShowInvalid(true);
                return;
            }
            setShowInvalid(false);
            todo.todo = todoText
            updateTodoHandler(todo);
        }
        else
        {
            setTodoText(e.target.value);
        }
    }

   return (
       <>
        <tr style={!todo.isEdit ? {display:""}: {display:"none"}} onMouseEnter={ShowBtn} onMouseLeave={HideBtn}>
            <td>
                <div className="row px-3">
                <div className="mr-auto my-2">{todo.todo}</div>
                <div className="d-line ml-auto" style={ showBtn ? {display:""}:{display:"none"}}>
                <Button variant="btn btn-secondary btn-sm" onClick={btnEditOnClick}>edit</Button>
                <Button variant="btn btn-danger btn-sm ml-1" onClick={(btnDeleteOnClick)}>remove</Button>
                </div>
                </div>
            </td>
        </tr>
        <tr style={todo.isEdit ? {display:""}: {display:"none"}}>
        <td>
            <div className="row">
            <div className="col-12">
            <Form.Control  
            required
            className="form-control-md" 
            value={todoText} 
            onKeyUp={abortEditOnKeyUp} 
            onKeyPress={enterUpdateTodo}
            onChange={(e)=>{setTodoText(e.target.value)}}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" style={showInvalid ? {display:"block"} : {display:"none"}}>
            This field cannot be blank.
          </Form.Control.Feedback>
            </div>
            </div>
        </td>
    </tr> 
    </>
    )}

export default Todo;