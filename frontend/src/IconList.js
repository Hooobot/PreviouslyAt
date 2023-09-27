import React from "react";
import "./App.css";

const IconList = () => {
  const handleDragStart = (e, iconName) => {
    e.dataTransfer.setData("iconName", iconName);
  };

  return (
    <div>
      <div
        className="icon"
        draggable
        onDragStart={(e) => handleDragStart(e, "Icon1")}
      >
        1
      </div>
      <div
        className="icon"
        draggable
        onDragStart={(e) => handleDragStart(e, "Icon2")}
      >
        2
      </div>
    </div>
  );
};

export default IconList;
