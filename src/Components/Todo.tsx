import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import mTodo from '../Models/mTodo';


const Todo: React.FC<{
    todo: mTodo,
    editBtnHandler: Function,
    updateTodoHandler: Function,
    abortEditTodoHandler: Function,
    deleteBtnHandler: Function
}> =
    (
        {
            todo,
            editBtnHandler,
            updateTodoHandler,
            abortEditTodoHandler,
            deleteBtnHandler
        }
    ) => {
        const [showBtn, setShowBtn] = useState(false);

        const [todoText, setTodoText] = useState(todo.todo);

        const [showInvalid, setShowInvalid] = useState(false);

        const textLineThrough: any = { "text-decoration-line": "line-through" };

        const disabled: any = { "pointer-events": "none", "opacity": "0.4", "color": "red" };

        const ShowBtn = (e: any) => {
            if (todo.isFailed) return;

            setShowBtn(true)
        }
        const HideBtn = (e: any) => {
            if (todo.isFailed) return;

            setShowBtn(false);
        }

        function btnDeleteOnClick(e: any) {
            deleteBtnHandler(todo.getId);
        }
        function btnEditOnClick(e: any) {
            setTodoText(todo.todo);
            editBtnHandler(todo.getId);
        }
        function abortEditOnKeyUp(e: any) {
            if (e.key === 'Escape') {
                abortEditTodoHandler();
                setTodoText(todo.todo);
            }

        }
        function updateTodo(e: any) {
            if (e.key === 'Enter') {
                if (todoText.trim() === "") {
                    setShowInvalid(true);
                    return;
                }
                setShowInvalid(false);
                todo.todo = todoText

                updateTodoHandler(todo);

            }
            else {
                setTodoText(e.target.value);
            }


        }
        function onCheck(e: any) {
            todo.isDone = e.target.checked;
            updateTodoHandler(todo);
        }

        return (
            <>
                <tr>
                    <td>
                        <div
                            style={!todo.isEdit ? { display: "" } : { display: "none" }}
                            onMouseEnter={ShowBtn}
                            onMouseLeave={HideBtn}>
                            <div
                                className="row px-3 text-break"
                                style={todo.isFailed ? disabled : {}}>
                                    <div className="col-1 my-2">
                                    <Form.Check type="checkbox" checked={todo.isDone} onChange={onCheck} className="float-left" />
                                    </div>
                                

                                <div className="mr-auto col my-2" style={todo.isDone ? textLineThrough : {}}>{todo.todo}</div>
                                <Form.Control.Feedback type="invalid" style={todo.isFailed ? { display: "block" } : { display: "none" }}>
                                    Failed to enter todo
                                </Form.Control.Feedback>

                                <div className="d-line ml-auto my-2" style={showBtn ? { display: "" } : { display: "none" }}>

                                    <Button variant="btn btn-secondary btn-sm" onClick={btnEditOnClick}>edit</Button>
                                    <Button variant="btn btn-danger btn-sm ml-1" onClick={(btnDeleteOnClick)}>remove</Button>
                                </div>

                            </div>

                        </div>
                        <Button variant="btn btn-warning btn-sm float-right" style={todo.isFailed ? { display: "" } : { display: "none" }}>retry</Button>


                        <div style={todo.isEdit ? { display: "" } : { display: "none" }}>
                            <div className="row">
                                <div className="col-12">
                                    <Form.Control
                                        as="textarea"
                                        required
                                        className="form-control-md"
                                        value={todoText}
                                        onKeyUp={abortEditOnKeyUp}
                                        onKeyPress={updateTodo}
                                        onChange={(e) => { setTodoText(e.target.value) }}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid" style={showInvalid ? { display: "block" } : { display: "none" }}>
                                        This field cannot be blank.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        )
    }

export default Todo;