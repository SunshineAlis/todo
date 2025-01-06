import{useState} from "react";
import "./App.css";

function App(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState([]);
    const [filter, setFilter] = useState([]);

    const addTask = ()=>{
        if(newTask.trim()==="") return;
        setTasks([
            ...tasks,
            {id: Date.now(), text: newTask, completed:false},
        ]);
        setNewTask("");
    };
    const toggleTask = (id)=>{
        setTasks(
            tasks.map((task)=>
            task.id===id ?{ ...task,completed: !task.completed}:task
        )
        );
    };
    //delete task
    const deleteTask = (id)=>{
        setTasks(tasks.filter((task)=>task.id !==id));
    };
    //clearcompleted
    const clearcompleted = ()=>{
        setTasks(tasks.filter((task)=>!task.completed));
    };
    //filtertask

    const filteredTasks= tasks.filter((task)=>{
        if(filter==="active")return !task.completed;
        if(filter==="completed") return task.completed;
        return true;
    });
    return

    <div className="app">
        <h1>To-Do List</h1>
        <div className="addTask">
        <input
        placeholder="Add new task"
        type="text"
        className="container"
        value={newTask}
        onChange={(e)=>setNewTask(e.target.value)}/>
    <button
    className="button"
    onClick={addTask}>
        Add
    </button>
    </div>
    </div>
}
