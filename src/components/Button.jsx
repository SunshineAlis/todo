// components/Button.jsx
import React from "react";

const Button= (probs)=> {
    const {onClick, className, text} =probs;
  return (
   
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default Button;