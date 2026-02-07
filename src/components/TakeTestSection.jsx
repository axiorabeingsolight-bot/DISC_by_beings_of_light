import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import image from "../assets/test.png";

import Lines from "./Lines";
import Text from "./Text";

const Questions = () => {
  return (
    <div className="p-12">
      <h1 className="text-3xl py-6">Reveal your Personality Insights</h1>

      {[
        "The DISC assessment acts as a mirror for your professional and social",
        "behavior. Rather than telling you “who you are” in your soul, it shows",
        "you “how you show up” in a room.",
      ].map((text, index) => (
        <Text key={index} delay={0.08 * (index + 1)}>
          {text}
        </Text>
      ))}

      <br />

      {[
        "1. Identifying Your “Blind Spots”",
        "2. Understanding Your Stress Triggers",
        "3. Measuring Your “Adaptive” vs. “Natural” Style",
        "4. Improving Communication (The “Mirror” Effect)",
        "5. Career Alignment",
      ].map((text, index) => (
        <Text key={index} delay={0.08 * (index + 4)}>
          {text}
        </Text>
      ))}

      <br />

      <Link
        to={"/user-info"}
        className="w-full border rounded-md text-center py-1.5 hover:bg-teal-500 hover:text-white cursor-pointer duration-200 my-4 px-8 text-xl"
      >
        Take Your Test
      </Link>
    </div>
  );
};

const TakeTestSection = () => {
  return (
    <div>
      <Lines direction={"right"} />

      <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-around">
        <div className="w-full sm:w-120 overflow-hidden pt-12 lg:pt-0">
          <motion.img
            src={image}
            alt="Image"
            initial={{ scale: 1.1, transition: { duration: 1 } }}
            animate={{ scale: 1, transition: { duration: 1 } }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <Questions />
      </div>
    </div>
  );
};

export default TakeTestSection;
