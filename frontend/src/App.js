import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import IconList from "./IconList";
import { useCanvas } from "./Canvas";
import githubImage from "./assets/github.png";

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
    const x = e.clientX - rect.left; // Ensure this is the top-left x coordinate of where you want the image
    const y = e.clientY - rect.top; // Ensure this is the top-left y coordinate of where you want the image
    addIcon(iconName, x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // const drawIcons = () => {
    //   icons.forEach((icon, index) => {
    //     ctx.fillText(icon.iconName, icon.x, icon.y);
    //   });
    // };
    const drawIcons = () => {
      icons.forEach((icon) => {
        const img = new Image();
        img.src = githubImage;
        img.onload = () => {
          // Calculate scale ratio to maintain the aspect ratio of the image
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );

          // Calculate the width and height of the image after scaling
          const imgWidth = img.width * scale;
          const imgHeight = img.height * scale;

          // Draw the image on the canvas at the specified x, y coordinates with the scaled width and height
          ctx.drawImage(img, icon.x, icon.y, imgWidth, imgHeight);
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
        <h1 className="title">PreviouslyAt</h1>
        <div className="icon-list-wrapper">
          <IconList />
        </div>
        <canvas
          ref={canvasRef}
          width={800}
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
