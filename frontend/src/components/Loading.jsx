import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

function RotatingC() {
  const [outerColor, setOuterColor] = useState(colors[0]);
  const [innerColor, setInnerColor] = useState(colors[1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOuterColor((prev) => colors[(colors.indexOf(prev) + 1) % colors.length]);
      setInnerColor((prev) => colors[(colors.indexOf(prev) + 1) % colors.length]);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className={`w-48 h-48 border-[12px] border-${outerColor}-500 rounded-full border-r-transparent flex items-center justify-center`}
      >
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className={`w-24 h-24 border-[8px] border-${innerColor}-500 rounded-full border-r-transparent`}
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default RotatingC;
