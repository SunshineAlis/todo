import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, SetNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <>
      <h1>To-Do list</h1>
      <div className="addTask">
        <input placeholder=" Add new task" type="text" className="container" />
        <button className="button">Add</button>
      </div>
      <div className="buttons">
        <button className="secondButton">All</button>
        <button className="secondButton">Active</button>
        <button className="secondButton">Completed</button>
      </div>
      <div className="div3">
        <p className="p2">No task yet. Add one above!</p>
        <p className="p3">
          Powered by <span className="span">Pinecone academy</span>
        </p>
      </div>
    </>
  );
}

export default App;
