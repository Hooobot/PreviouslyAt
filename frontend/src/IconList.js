import React from 'react';
import './App.css';

const IconList = ({ canvasRef }) => {
  const handleDragStart = (e, iconName) => {
    e.dataTransfer.setData('iconName', iconName);
  };

  const handleDrop = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const iconName = e.dataTransfer.getData('iconName');

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // For demonstration, we'll just draw the icon name as text
    ctx.fillText(iconName, x, y);
  };

  return (
    <div>
      <div
        className="icon"
        draggable
        onDragStart={(e) => handleDragStart(e, 'Icon1')}
      >
        1
      </div>
      <div
        className="icon"
        draggable
        onDragStart={(e) => handleDragStart(e, 'Icon2')}
      >
        2
      </div>
      {/* Attach the drop event to the canvas */}
      <div style={{ display: 'none' }}>
        <canvas ref={canvasRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} />
      </div>
    </div>
  );
};

export default IconList;
