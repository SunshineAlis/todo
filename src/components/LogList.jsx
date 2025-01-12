// components/LogList.jsx
import React from "react";

const LogList=(probs )=> {
    const { logs }=probs; 
  return (
    <div className="logList">
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              <h4 className="logList">Task: {log.text}</h4>
              {log.logs.map((logEntry, i) => (
                <p className="spanLog" key={i}>
                  <span>
                    - {logEntry.action}: {logEntry.timeline}
                  </span>
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LogList;
