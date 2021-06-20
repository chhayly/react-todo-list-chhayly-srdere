import getUUID from '../Services/Common';

class mTodo {

    private id:string;
    public todo:string;
    public isEdit:boolean;
    public isShow:boolean;

    public get getId() : string {
        return this.id;
    }

    constructor(id:string,todo:string)
    {
        this.id = id;
        this.todo = todo;
        this.isEdit = false;
        this.isShow = true;
    }

    public static CreateTodo(todo:string)
    {
        return new mTodo(getUUID(),todo);
    }

    public AddTodo() {
        
    }

    /**
     * RemoveTodo
     */
    public RemoveTodo() {
        
    }
    
}

export default mTodo;