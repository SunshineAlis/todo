// App.jsx
import React, { useState } from "react";
import AddTask from "./components/AddTask";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import LogList from "./components/LogList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [showLogs, setShowLogs] = useState(false);

  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const totalCount = tasks.length;

  const addTask = () => {
    if (!newTask.trim()) {
      alert("Please write task!");
      return;
    }
    const newTaskId = Date.now();
    const newTaskObj = { id: newTaskId, text: newTask, status: "active", logs: [] };
    const newLog = {
      id: newTaskId,
      text: newTask,
      logs: [
        { action: "Created", timeline: new Date().toISOString().split("T")[0] },
      ],
    };
    setTasks([...tasks, newTaskObj]);
    setLogs([...logs, newLog]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setLogs(
      logs.map((log) =>
        log.id === id
          ? {
              ...log,
              logs: [
                ...log.logs,
                { action: "Deleted", timeline: new Date().toISOString().split("T")[0] },
              ],
            }
          : log
      )
    );
  };

  const isConfirmed = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) deleteTask(id);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "active" ? "completed" : "active" }
        : task
    );
    const updatedLogs = logs.map((log) =>
      log.id === id
        ? {
            ...log,
            logs: [
              ...log.logs,
              { action: "Status changed", timeline: new Date().toISOString().split("T")[0] },
            ],
          }
        : log
    );
    setTasks(updatedTasks);
    setLogs(updatedLogs);
  };

  const clearCompleted = () => {
    const updatedLogs = logs.map((log) => {
      const task = tasks.find((task) => task.id === log.id && task.status === "completed");
      if (task) {
        return {
          ...log,
          logs: [
            ...log.logs,
            { action: "Cleared", timeline: new Date().toISOString().split("T")[0] },
          ],
        };
      }
      return log;
    });

    setLogs(updatedLogs);
    setTasks(tasks.filter((task) => task.status !== "completed"));
  };
  
  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <FilterButtons filter={filter} setFilter={setFilter} showLogs={showLogs} setShowLogs={setShowLogs} />
      {showLogs ? <LogList logs={logs} /> : <TaskList tasks={tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} isConfirmed={isConfirmed} />}
      {completedCount > 0 && (
        <p className="countTask">
          {completedCount} of {totalCount} tasks completed
        <span className="clearButton" onClick={clearCompleted}>Clear completed</span></p>
      )}
        <p className="p3"> Powered by <span className="span">Pinecone Academy</span></p>
    </div>
  );
}

export default App;
