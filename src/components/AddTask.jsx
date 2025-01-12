import React from "react";

const AddTask=( probs)=> {
 const { newTask, setNewTask, addTask }= probs
    return (
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
  );
}

export default AddTask;