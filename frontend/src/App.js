import React, { useRef, useEffect } from "react";
import "./App.css";
import IconList from "./IconList";
import { useCanvas } from "./Canvas";

const App = () => {
  const canvasRef = useRef(null);
  const { icons, addIcon } = useCanvas();

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

    let rectX = 10,
      rectY = 10;
    let offsetX = 0,
      offsetY = 0;
    let isDragging = false;

    const drawIcons = () => {
      icons.forEach((icon) => {
        ctx.fillText(icon.iconName, icon.x, icon.y);
      });
    };

    const drawRect = () => {
      ctx.fillStyle = "#f00";
      ctx.fillRect(rectX, rectY, 50, 50);
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= rectX && x <= rectX + 50 && y >= rectY && y <= rectY + 50) {
        isDragging = true;
        offsetX = x - rectX;
        offsetY = y - rectY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        rectX = x - offsetX;
        rectY = y - offsetY;
        renderCanvas();
      }
    };

    const renderCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRect();
      drawIcons();
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
  }, [icons]);

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
