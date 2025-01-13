// components/FilterButtons.jsx
import React from "react";

const FilterButtons = (props) => {
  const { filter, setFilter, showLogs, setShowLogs } = props;
  return (
    <div className="buttons">
      {["all", "active", "completed"].map((status) => (
        <button
          key={status}
          className={`secondButton ${filter === status ? "active" : ""}`}
          onClick={() => setFilter(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
      <button
        className={`secondButton ${showLogs ? "active" : ""}`}
        onClick={() => setShowLogs(!showLogs)}
      >
        {showLogs ? "Hide Logs" : "Show Logs"}
      </button>
    </div>
  );
};

export default FilterButtons;
