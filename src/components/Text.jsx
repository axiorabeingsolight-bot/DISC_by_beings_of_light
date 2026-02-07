import React from "react";
import { motion } from "motion/react";

const Text = ({ delay, children }) => {
  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay, duration: 0.5 }}
        className="lg:max-w-[50vw]"
      >
        {children.endsWith("*") ? children.slice(0, -1) : children}
      </motion.p>
      {children.endsWith("*") && <br />}
    </>
  );
};

export default Text;
