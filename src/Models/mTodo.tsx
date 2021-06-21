import { getUUID } from '../Utilities/Common';

class mTodo {

    private id:string;
    public todo:string;
    public isEdit:boolean;
    public createdDate: number;

    public get getId() : string {
        return this.id;
    }

    constructor(id:string,todo:string,createdDate: number)
    {
        this.id = id;
        this.todo = todo;
        this.isEdit = false;
        this.createdDate = createdDate;
    }

    public static CreateTodo(todo:string)
    {
        return new mTodo(getUUID(),todo,Date.now());
    }
    

    public getObject = () => {return {id:this.id,todo:this.todo,createdDate:this.createdDate}}
}

export default mTodo;