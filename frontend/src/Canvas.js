import React, { createContext, useContext, useState } from "react";

const CanvasContext = createContext();

export const useCanvas = () => {
  return useContext(CanvasContext);
};

export const CanvasProvider = ({ children }) => {
  const [icons, setIcons] = useState([]);

  const addIcon = (iconName, x, y, width, height) => {
    setIcons((prevIcons) => [...prevIcons, { iconName, x, y, width, height }]);
  };

  const moveIcon = (index, x, y) => {
    setIcons((prevIcons) => {
      const newIcons = [...prevIcons];
      newIcons[index] = { ...newIcons[index], x, y };
      return newIcons;
    });
  };

  const value = {
    icons,
    addIcon,
    moveIcon,
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};
