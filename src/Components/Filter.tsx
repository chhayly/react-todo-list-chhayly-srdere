import React, {Dispatch, HtmlHTMLAttributes, SetStateAction, useState} from 'react';
import { Form } from 'react-bootstrap';

const Filter: React.FC<
{
    filterKeyword:string,
    filterInputOnChange:Function,
    onFocus:Function
}> = (
    {
        filterKeyword,
        filterInputOnChange,
        onFocus
    }) => {

    function FocusOnFilter(e:any) {
        onFocus()
    }

    return (<>      
    <Form.Control 
    className="mt-3" 
    value={filterKeyword} 
    onChange={(e:any)=>filterInputOnChange(e.target.value)}
    onFocus={FocusOnFilter} 
    type="text" 
    placeholder="Filter todos"></Form.Control>
    </>
);}

export default Filter;