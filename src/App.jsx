import { useState } from "react";
import "./App.css";

const test = [{ id: "", text: "test", action: "action" }];

function App() {
  const [logs, setLogs] = useState([]); // all logs
  const [tasks, setTasks] = useState([]); // all tasks
  const [newTask, setNewTask] = useState(""); // new task input
  const [filter, setFilter] = useState("all"); // filter (all, active, completed)
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalCount = tasks.length;

  // 1. Add Task
  const addTask = () => {
    if (!newTask.trim()) {
      alert("Please write task!");
      return;
    }
    const newTaskId = Date.now(); //  unique ID
    const newTaskObj = { id: newTaskId, text: newTask, status: "active" };

    setLogs((prevLogs) => [
      ...prevLogs,
      {
        id: newTaskId,
        text: newTask,
        logs: [
          {
            action: "created",
            createdAt: `Created at: ${new Date().toISOString().split("T")[0]}`,
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
    const taskStatus = deletedTask.status === "deleted";
    const deletedLogs = logs.map((log) => {
      if (log.id === id) {
        return {
          ...log,
          logs: [
            ...log.logs,
            { status: taskStatus, timeline: new Date().toISOString() },
          ],
        };
      } else {
        return log;
      }
    });

    setLogs(deletedLogs);
    setTasks(tasks.filter((task) => task.id !== id));
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
      .filter((task) => task.status === "completed")
      .map((task) => ({
        id: Date.now(),
        text: task.text,
        action: "cleared",
        clearAt: `Cleared at: ${new Date().toISOString().split("T")[0]}`,
      }));

    setLogs((prevLogs) => [...prevLogs, ...clearedLogs]);
    setTasks(tasks.filter((task) => task.status !== "completed"));
  };

  // 4.Task Filter Logic
  const filteredTasks = tasks.filter((task) => {
    return filter === "all" || task.status === filter;
  });

  // 5.Toggle Task (Complete/Active)
  const toggleTask = (id) => {
    console.log(id);
    // Find the task by its ID
    const toggledTask = tasks.find((task) => task.id === id);
    const taskStatus = toggledTask.status === "active" ? "completed" : "active";

    // Update the tasks array
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: taskStatus } : task
    );

    const updatedLogs = logs.map((log) => {
      if (log.id === id) {
        return {
          ...log,
          logs: [
            ...log.logs,
            { status: taskStatus, timeline: new Date().toISOString() },
          ],
        };
      } else {
        return log;
      }
    });

    setLogs(updatedLogs);
    setTasks(updatedTasks);
  };
  console.log(logs);

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
              // <ul>
              //   {logs.map((log) => (
              //     <li key={log.id}>
              //       <p>{log.text}</p>
              //       <p>{log.createdAt}</p>
              //       {log.action === "created" && (
              //         <>
              //           <p>{log.timestamp}</p>
              //         </>
              //       )}
              //       {log.action === "deleted" && (
              //         <>
              //           <p>{log.deleteAt}</p>
              //         </>
              //       )}
              //       {log.action === "marked completed" && (
              //         <>
              //           <p>{log.timestamp}</p>
              //         </>
              //       )}
              //       {log.action === "marked active" && (
              //         <>
              //           <p>{log.timestamp}</p>
              //         </>
              //       )}
              //       {log.action === "cleared" && (
              //         <>
              //           <p>{log.clearAt}</p>
              //         </>
              //       )}
              //     </li>
              //   ))}
              // </ul>
              <div>hello</div>
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
