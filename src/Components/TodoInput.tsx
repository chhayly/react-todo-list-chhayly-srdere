import React from 'react'
import { Form } from 'react-bootstrap';

const TodoInput : React.FC<{addTodo:any}> = ({addTodo}) => 
{
    const enterUpdateTodo = (e:any) => 
    {
        if(e.key === 'Enter'){
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
    return (
        <>
        <tr>
        <td>
            <div className="row">
            <div className="col-12">
            <Form.Control as="textarea" className="form-control-md" defaultValue="" onKeyUp={AbortEdit} onKeyPress={enterUpdateTodo} placeholder="Enter todo"></Form.Control></div>
            </div>
            </td>
        </tr> 
        </>
    );
}

export default TodoInput;