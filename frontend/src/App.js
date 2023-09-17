import React, { useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Initialize the rectangle
    const drawRect = (x, y) => {
      ctx.fillStyle = '#f00';
      ctx.fillRect(x, y, 50, 50);
    };

    drawRect(10, 10);

    let dragItem = null;

    // Handle Mouse Down Event
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if the click is within the rectangle
      if (x > 10 && x < 60 && y > 10 && y < 60) {
        dragItem = { x, y };
      }
    };

    // Handle Mouse Up Event
    const handleMouseUp = () => {
      dragItem = null;
    };

    // Handle Mouse Move Event
    const handleMouseMove = (e) => {
      if (dragItem) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the rectangle at the new position
        drawRect(x - 25, y - 25);
      }
    };

    // Add Event Listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <canvas ref={canvasRef} width={600} height={400} />
      </header>
    </div>
  );
};

export default App;
