import React , { useEffect }from 'react'
import mTodo from '../Models/mTodo';
import Todo from './Todo';


const TodoList : React.FC<
{
    todos:mTodo[],
    filterKeyword:string,
    editBtnHandler:Function,
    updateTodoHandler:Function,
    abortEditTodoHandler:Function,
    deleteBtnHandler:Function
}> = 
(
    {
        todos,
        filterKeyword,
        editBtnHandler,
        updateTodoHandler,
        abortEditTodoHandler,
        deleteBtnHandler
    }) => 
    {

    return (<>
    {todos.filter(d=> d.todo.indexOf(filterKeyword)>-1)
    .map((t)=> (
    <Todo 
    todo={t}
    editBtnHandler ={editBtnHandler}
    updateTodoHandler={updateTodoHandler}
    abortEditTodoHandler={abortEditTodoHandler}
    deleteBtnHandler={deleteBtnHandler}
    ></Todo>
    ))}
</>);}

export default TodoList; 