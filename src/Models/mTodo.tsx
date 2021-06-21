import getUUID from '../Utilities/Common';

class mTodo {

    private id:string;
    public todo:string;
    public isEdit:boolean;
    public isLocked: boolean;

    public get getId() : string {
        return this.id;
    }

    constructor(id:string,todo:string,isLocked: boolean)
    {
        this.id = id;
        this.todo = todo;
        this.isEdit = false;
        this.isLocked = isLocked;
    }

    public static CreateTodo(todo:string)
    {
        return new mTodo(getUUID(),todo,false);
    }
    

    public getObject = () => {return {id:this.id,todo:this.todo,isLocked:this.isLocked}}
}

export default mTodo;