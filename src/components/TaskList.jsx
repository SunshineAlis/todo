// components/TaskList.jsx
import React from "react";

const TaskList=(probs)=> {
 const { tasks, toggleTask, isConfirmed, filteredTasks }=probs;
    return (
    <div className="taskList">
      {filteredTasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleTask(task.id)}
              />
              <span
                style={{
                  textDecoration: task.status === "completed" ? "line-through" : "none",
                  color: task.status === "completed" ? "#888" : "#000",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => isConfirmed(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
