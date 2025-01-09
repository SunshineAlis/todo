import { useState } from "react";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]); // all logs
  const [tasks, setTasks] = useState([]); // all tasks
  const [newTask, setNewTask] = useState(""); // new task input
  const [filter, setFilter] = useState("all"); // filter (all, active, completed)
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  // 1. Add Task
  const addTask = () => {
    if (!newTask.trim()) {
      alert("Please write task!");
      return;
    }
    const newTaskId = Date.now(); //  unique ID
    const newTaskObj = { id: newTaskId, text: newTask, completed: false };

    setLogs((prevLogs) => [
      ...prevLogs,
      {
        id: newTaskId,
        text: newTask,
        action: "active",
        logs: [
          {
            createdAt: new Date().toISOString().split("T")[0],
            status: "ACTIVE",
          },
        ],
      },
    ]);
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask(""); // Clear input after adding task
  };

  // 2. Delete Task
  const deleteTask = (id) => {
    const deletedTask = tasks.find((task) => task.id === id);
    if (deletedTask) {
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          id: Date.now(),
          text: deletedTask.text,
          action: "deleted",
          deleteAt: `Deleted At: ${new Date().toISOString().split("T")[0]}`,
        },
      ]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const isConfirmed = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      deleteTask(id);
    }
  };

  // 3.Clear Completed Tasks
  const clearCompleted = () => {
    const clearedLogs = tasks
      .filter((task) => task.completed)
      .map((task) => ({
        id: Date.now(),
        text: task.text,
        action: "cleared",
        clearAt: `Cleared at: ${new Date().toISOString().split("T")[0]}`,
      }));

    setLogs((prevLogs) => [...prevLogs, ...clearedLogs]);
    setTasks(tasks.filter((task) => !task.completed));
  };

  // 4.Task Filter Logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // 5.Toggle Task (Complete/Active)
  // const changeModeTask = (id) => {
  //   const task = tasks.find((el) => el.id == id);
  //   const newTaskStatus = task.status==="COMPLETED" ? "ACTIVE"? "COMPLETED"
  //   const updatedTasks = tasks.map((task) => {
  //    task.id === id ? { ...task, completed: !task.completed } : task;
  //   });
  //   const updatedLogs = logs.map((log) => {
  //     if (log.id == task.id) {
  //       return {
  //         ...log,
  //         logs: [ ...log,logs, {status:newTaskStatus, timestamp:new Date().toISOString().split("T")[0]}
  //       ],
  //       }
  //     }
  //   });
  //   setLogs((prevLogs) => [...prevLogs, ...updatedLogs]);
  //   setTasks(updatedTasks);
  // };

  return (
    <>
      <div className="app">
        <h1>To-Do List</h1>
        <div className="addTask">
          <input
            placeholder="Add new task"
            type="text"
            className="container"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
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
              <p className="p2">No logs yet.</p>
            ) : (
              <ul>
                {logs.map((log) => (
                  <li key={log.id}>
                    {log.action === "active" && (
                      <div style={{ display: "flex" }}>
                        <p>{log.text}</p>
                        <div>
                          {log.logs.map((el) => {
                            console.log(el);

                            return (
                              <p style={{ color: "red" }}>
                                {el.status} {el.createdAt}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {log.action === "deleted" && (
                      <>
                        <span>{log.text}</span> - <span>{log.deleteAt}</span>
                      </>
                    )}
                    {log.action === "completed" && (
                      <>
                        <span>{log.text}</span> - <span>{log.action}</span>
                        {log.logs.map((el) => {
                          console.log(el);

                          return (
                            <p style={{ color: "red" }}>
                              {el.status} {el.createdAt}
                            </p>
                          );
                        })}
                      </>
                    )}
                    {log.action === "active" && (
                      <>
                        <span>{log.text}</span> - <span>{log.timestamp}</span>
                      </>
                    )}
                    {log.action === "cleared" && (
                      <>
                        <span>{log.text}</span> - <span>{log.clearAt}</span>
                      </>
                    )}
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
                      onChange={() => changeModeTask(task.id)}
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
          Powered by <span className="span">Pinecone Academy</span>
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
