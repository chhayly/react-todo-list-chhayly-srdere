import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

const TodoInput: React.FC<
    {
        addTodo: Function,
        onFocus: Function,
        filterKeyword: string,
        filterInputOnChange: Function
    }> = (
        {
            addTodo,
            onFocus,
            filterKeyword,
            filterInputOnChange
        }
    ) => {
        const [showInvalid, setShowInvalid] = useState(false);

        const enterUpdateTodo = (e: any) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                if (e.target.value === "") {
                    setShowInvalid(true);
                    return;
                }
                setShowInvalid(false);

                addTodo(e.target.value)
                //e.target.value = "";

                filterInputOnChange("")
            }
        }
        const AbortEdit = (e: any) => {
            if (e.key === 'Escape') {
                e.target.value = "";
            }
        }

        function onFocusTodoInput(e: any) {
            onFocus();
        }


        return (
            <>
                <tr>
                    <td>
                        <div className="row">
                            <div className="col-12 h-auto">
                                <Form.Control
                                    required
                                    as="textarea"
                                    className="form-control-md h-75"
                                    value={filterKeyword}
                                    onKeyUp={AbortEdit}
                                    onKeyPress={enterUpdateTodo}
                                    onFocus={onFocusTodoInput}
                                    onChange={(e) => { filterInputOnChange(e.target.value) }}
                                    placeholder="Enter todo here..."
                                ></Form.Control></div>
                            <Form.Control.Feedback
                                className="ml-3"
                                type="invalid"
                                style={showInvalid ? { display: "block" } : { display: "none" }}>
                                This field cannot be blank.
                            </Form.Control.Feedback>
                        </div>
                    </td>
                </tr>
            </>
        );
    }

export default TodoInput;