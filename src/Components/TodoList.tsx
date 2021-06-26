import React from 'react'
import mTodo from '../Models/mTodo';
import Todo from './Todo';

const TodoList: React.FC<
    {
        todos: mTodo[],
        filterKeyword: string,
        editBtnHandler: Function,
        updateTodoHandler: Function,
        abortEditTodoHandler: Function,
        deleteBtnHandler: Function
    }> =
    (
        {
            todos,
            filterKeyword,
            editBtnHandler,
            updateTodoHandler,
            abortEditTodoHandler,
            deleteBtnHandler
        }) => {

        return (<>
            {todos.filter(d => d.todo.toUpperCase().indexOf(filterKeyword.toUpperCase()) > -1)
                .map((t) => (
                    <Todo
                        todo={t}
                        editBtnHandler={editBtnHandler}
                        updateTodoHandler={updateTodoHandler}
                        abortEditTodoHandler={abortEditTodoHandler}
                        deleteBtnHandler={deleteBtnHandler}
                    ></Todo>
                ))}

            <tr
                className="text-center"
                style={todos.filter(d => d.todo.toUpperCase().indexOf(filterKeyword.toUpperCase()) > -1).length === 0 ? { display: "" } : { display: "none" }} >No result. Create a new one instead!</tr>
        </>);
    }

export default TodoList;