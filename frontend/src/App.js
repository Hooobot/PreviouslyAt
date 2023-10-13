import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import IconList from "./IconList";
import { useCanvas } from "./Canvas";
import githubImage from "./assets/github.png";

const App = () => {
  const canvasRef = useRef(null);
  const { icons, addIcon, moveIcon, resizeIcon } = useCanvas(); // Destructure moveIcon from the context
  const [iconSize, setIconSize] = useState(100);
  const [isDragging, setIsDragging] = useState(null);
  const [isResizing, setIsResizing] = useState(null);
  const [handleResize, setResizeHandle] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const iconName = e.dataTransfer.getData("iconName");

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; // Ensure this is the top-left x coordinate of where you want the image
    const y = e.clientY - rect.top; // Ensure this is the top-left y coordinate of where you want the image
    addIcon(iconName, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawIcons = () => {
      icons.forEach((icon) => {
        const img = new Image();
        img.src = githubImage;
        img.onload = () => {
          // Draw the image on the canvas at the specified x, y coordinates with the scaled width and height
          ctx.drawImage(img, icon.x, icon.y, iconSize, iconSize);
        };
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
      setIsResizing(null);
      setResizeHandle(null);
    };

    const handleMouseMove = (e) => {
      if (isDragging !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - offset.x;
        const y = e.clientY - rect.top - offset.y;
        moveIcon(isDragging, x, y);
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
  }, [icons, isDragging, offset.x, offset.y, moveIcon, iconSize]);

  return (
    <div className="App">
      <h1 className="title">PreviouslyAt</h1>
      <div className="icon-list-wrapper">
        <IconList />
      </div>
      <canvas
        className="in-canvas"
        ref={canvasRef}
        width={800}
        height={400}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default App;
