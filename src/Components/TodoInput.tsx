import React from 'react'
import { Form } from 'react-bootstrap';

const TodoInput : React.FC<{addTodo:Function,onFocus:Function}> = ({addTodo,onFocus}) => 
{
    const enterUpdateTodo = (e:any) => 
    {
        if(e.key === 'Enter'){
            e.preventDefault()

            addTodo(e.target.value)
            e.target.value = "";
        }
    }
    const AbortEdit = (e:any) => 
    {
        if(e.key === 'Escape')
        {
            e.target.value = "";
        }
    }

    function onFocusTodoInput(e:any) {
        onFocus();
    }


    return (
        <>
        <tr>
        <td>
            <div className="row">
            <div className="col-12 h-auto">
            <Form.Control 
            as="textarea" 
            className="form-control-md h-75" 
            defaultValue="" 
            onKeyUp={AbortEdit} 
            onKeyPress={enterUpdateTodo}
            onFocus={onFocusTodoInput} 
            placeholder="Create todo"
            ></Form.Control></div>
            </div>
            </td>
        </tr> 
        </>
    );
}

export default TodoInput;