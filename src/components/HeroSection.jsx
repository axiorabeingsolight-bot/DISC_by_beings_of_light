import React from "react";
import { motion } from "motion/react";
import image from "../assets/home.png";

import Navbar from "./Navbar";
import Lines from "./Lines";
import Text from "./Text";

const Questions = () => {
  return (
    <div className="p-12">
      <h1 className="text-3xl pb-6">What is DISC?</h1>

      {[
        'The DISC assessment is a powerful, affirmative tool designed to illuminate your natural behavioral strengths and communication style. By categorizing personality traits into four vibrant quadrants, it provides a clear "blueprint" of how you interact with the world around you. This analysis does far more than just label behavior.*',
        "By highlighting your unique gifts, DISC fosters deeper, more harmonious relationships and provides an encouraging framework to navigate professional challenges with confidence. It offers a bright sense of hope by proving that every communication style is a valuable superpower. Purpose-driven life where you can truly thrive in any environment.*",
        "Embracing DISC is an invitation to view your personality as a dynamic engine for success rather than a static set of rules. It illuminates the hidden patterns in your interactions. This journey of discovery allows you to stand taller in your natural talents while gaining the graceful flexibility to connect with anyone, regardless of their style.",
      ].map((text, index) => (
        <Text key={index} delay={0.08 * (index + 1)}>
          {text}
        </Text>
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <div>
      <Lines direction={"left"} />

      <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-around">
        <Questions />
        <div className="w-full sm:w-120 overflow-hidden">
          <motion.img
            src={image}
            alt="Image"
            initial={{ scale: 1.1, transition: { duration: 1 } }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
