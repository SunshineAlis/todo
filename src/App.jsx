import { useState } from "react";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]); // all logs
  const [tasks, setTasks] = useState([]); // all plan
  const [newTask, setNewTask] = useState(""); // new plan
  const [filter, setFilter] = useState("all"); // filter (all, active, completed)
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  console.log(logs);

  // 1.add task
  const addTask = () => {
    if (newTask.trim() === "") return; //
    // const newDate = Date.now();
    // newDate;
    const newTaskId = Date.now();
    setTasks([...tasks, { id: newTaskId, text: newTask, completed: false }]);
    setLogs([
      ...logs,
      {
        id: newTaskId,
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewTask(""); // clear value
  };

  // 2.change task status
  const toggleTask = (id) => {
    setLogs(
      logs.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3.delete
  // const deleteTask = (id) => {
  //   setLogs(
  //     logs.filter((task) => task.id !== id, { ...tasks, updatedAt: Date.now() })
  //   );
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };
  const deleteTask = (id) => {
    setLogs(
      logs.map((task) =>
        task.id === id ? { ...task, deleteAt: new Date().toISOString() } : task
      )
    );
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const isConfirmed = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      deleteTask(id); // first confirm then delete
    }
  };

  // 4.clear complete
  const clearCompleted = () => {
    setLogs(
      logs.map((log) => {
        if (log.completed) return log;
        if (!log.completed) {
          return {
            ...log,
            completed: true,
            clearAt: new Date().toISOString(),
          };
        }
      })
    );
    setTasks(tasks.filter((task) => !task.completed));
  };

  // 5.task filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  //log

  return (
    <>
      <div className="app">
        <h1>To-Do List</h1>
        <div className="addTask">
          <input
            placeholder="Add new task"
            type="text"
            className="container"
            value={newTask} // Input value
            onChange={(e) => setNewTask(e.target.value)} // Input value changes
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
          <button
            className={`secondButton ${filter === "logs" ? "active" : ""}`}
            onClick={() => setFilter("logs")}
          >
            Logs
          </button>
        </div>

        {filter === "logs" ? (
          <div className="taskList">
            {logs.length === 0 ? (
              <p className="p2">No logs yet. </p>
            ) : (
              <ul>
                {logs.map((log) => (
                  <li key={log.id}>
                    <span>{log.text}</span>
                    <span>{log.createdAt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="taskList">
            {filteredTasks.length === 0 ? (
              <p className="p2">No tasks yet. Add one above!</p>
            ) : (
              <ul>
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className={task.completed ? "completed" : ""}
                  >
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
        )}

        <p className="p3">
          Powered by <span className="span">Pinecone academy</span>
        </p>
      </div>
      <div className="countTask">
        <span className="countSpan">
          {completedCount} of {totalCount} tasks completed
        </span>
        <button className="clearButton" onClick={clearCompleted}>
          Clear completed
        </button>
      </div>
    </>
  );
}

export default App;
