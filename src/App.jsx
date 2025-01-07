import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // all plan
  const [newTask, setNewTask] = useState(""); // new plan
  const [filter, setFilter] = useState("all"); // filter (all, active, completed)
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  // 1.add task
  const addTask = () => {
    if (newTask.trim() === "") return; // Хоосон текст шалгах
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false },
    ]);
    setNewTask(""); // Оруулсан утгыг цэвэрлэх
  };

  // 2.task статус өөрчлөх
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3.delete 
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const isConfirmed = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      deleteTask(id); // confirm hiiged utgana
    }
  };

  // 4.clearcomplete
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // 5.task filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <><div className="app">
      <h1>To-Do List</h1>
      <div className="addTask">
        <input
          placeholder="Add new task"
          type="text"
          className="container"
          value={newTask} // Input утга
          onChange={(e) => setNewTask(e.target.value)} // Input утга өөрчлөлт
        />
        <button className="button" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="buttons">
        <button
          className={`secondButton ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`secondButton ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`secondButton ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="taskList">
     {filteredTasks.length === 0 ? (
    <p className="p2">No tasks yet. Add one above!</p>
  ) : (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
          <button onClick={() => isConfirmed(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )}
</div>
      <p className="p3">
        Powered by <span className="span">Pinecone academy</span>
      </p>
    </div>
    <div className="countTask">
  <span className="countSpan">{completedCount} of {totalCount} tasks completed</span>
  <button className="clearButton" onClick={clearCompleted}>
    Clear completed
  </button>
</div>
</>
  );

}

export default App;