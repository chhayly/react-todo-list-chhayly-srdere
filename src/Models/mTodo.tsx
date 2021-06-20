import getUUID from '../Services/Common';

class mTodo {

    private id:string;
    private todo:string;
    private createdDate:Date;

    public get getId() : string {
        return this.id;
    }
    public get getTodo() : string {
        return this.todo;
    }

    public set setTodo(v : string) {
        this.todo = v;
    }    

    constructor(id:string,todo:string,createdDate:Date)
    {
        this.id = id;
        this.todo = todo;
        this.createdDate = createdDate;
    }

    public static CreateTodo(todo:string)
    {
        return new mTodo(getUUID(),todo,new Date());
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