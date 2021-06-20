import React, {Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';
import { Form } from 'react-bootstrap';
import mTodo from '../Models/mTodo';

const Filter: React.FC<{filterKeyword:string,filterTodoList:Function}> = ({filterKeyword,filterTodoList}) => {

    return (<>      
    <Form.Control className="mt-3" value={filterKeyword} onChange={(e:any)=>filterTodoList(e.target.value)} type="text" placeholder="Filter todos"></Form.Control>
    </>
);}

export default Filter;