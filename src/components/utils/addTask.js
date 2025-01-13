export const addTask = (setTasks, setLogs, setNewTask) => {
  if (!newTask.trim()) {
    alert("Please write task!");
    return;
  }
  const newTaskId = Date.now();
  const newTaskObj = {
    id: newTaskId,
    text: newTask,
    status: "active",
    logs: [],
  };
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
