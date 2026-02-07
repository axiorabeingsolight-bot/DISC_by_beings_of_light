import React from "react";
import { motion } from "motion/react";

const Line = ({ className, origin }) => {
  return (
    <motion.div
      initial={{ scaleX: 0, originX: origin }}
      animate={{ scaleX: 1, originX: origin }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={className}
    ></motion.div>
  );
};

const Lines = ({ direction }) => {
  return (
    <div
      className={`w-full flex flex-col gap-3 ${direction === "left" ? "" : "items-end"}`}
    >
      <Line
        className={`max-w-[80%] min-w-[40%] w-40 bg-fuchsia-500 h-1.5 ${direction === "left" ? "rounded-r-md" : "rounded-l-md"}`}
        origin={direction === "left" ? 0 : 1}
      />

      <Line
        className={`max-w-[70%] min-w-[35%] w-35 bg-teal-500 h-1.5 ${direction === "left" ? "rounded-r-md" : "rounded-l-md"}`}
        origin={direction === "left" ? 0 : 1}
      />
    </div>
  );
};

export default Lines;
