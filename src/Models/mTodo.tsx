import { getUUID } from '../Utilities/Common';

class mTodo {

    private id: string;
    public todo: string;
    public isEdit: boolean;
    public isDone: boolean;
    public isFailed: boolean;
    public createdDate: number;

    public get getId(): string {
        return this.id;
    }

    constructor(id: string, todo: string, isDone: boolean, createdDate: number) {
        this.id = id;
        this.todo = todo;
        this.isEdit = false;
        this.isDone = isDone;
        this.isFailed = false;
        this.createdDate = createdDate;

    }

    public static CreateTodo(todo: string) {
        return new mTodo(getUUID(), todo, false, Date.now());
    }


    public getObject = () => { return { id: this.id, todo: this.todo, isDone: this.isDone, createdDate: this.createdDate } }
}

export default mTodo;