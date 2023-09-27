import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import IconList from "./IconList";
import { useCanvas } from "./Canvas";

const App = () => {
  const canvasRef = useRef(null);
  const { icons, addIcon, moveIcon } = useCanvas(); // Destructure moveIcon from the context
  const [isDragging, setIsDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const iconName = e.dataTransfer.getData("iconName");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addIcon(iconName, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawIcons = () => {
      icons.forEach((icon, index) => {
        ctx.fillText(icon.iconName, icon.x, icon.y);
      });
    };

    const renderCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawIcons();
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      icons.forEach((icon, index) => {
        if (
          x >= icon.x &&
          x <= icon.x + 50 &&
          y >= icon.y &&
          y <= icon.y + 50
        ) {
          setIsDragging(index);
          setOffset({ x: x - icon.x, y: y - icon.y });
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    const handleMouseMove = (e) => {
      if (isDragging !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        moveIcon(isDragging, x - offset.x, y - offset.y);
      }
    };

    renderCanvas();
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [icons, isDragging, offset.x, offset.y, moveIcon]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="icon-list-wrapper">
          <IconList />
        </div>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: "2px solid #000" }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
      </header>
    </div>
  );
};

export default App;
