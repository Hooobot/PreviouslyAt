import React, { createContext, useContext, useState } from "react";

const CanvasContext = createContext();

export const useCanvas = () => {
  return useContext(CanvasContext);
};

export const CanvasProvider = ({ children }) => {
  const [icons, setIcons] = useState([]);

  const addIcon = (iconName, x, y) => {
    setIcons((prevIcons) => [...prevIcons, { iconName, x, y }]);
  };

  const value = {
    icons,
    addIcon,
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};
