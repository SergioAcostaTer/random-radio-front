import { useState, useEffect } from "react";
import getContrastColor from "../services/getContrastColor";

const useContrast = ({ color }) => {
  const [contrast, setContrast] = useState("#FFFFFF");

  useEffect(() => {
    if (color) {
      setContrast(getContrastColor(color));
    }
  }, [color]);

  return contrast;
};

export default useContrast;
