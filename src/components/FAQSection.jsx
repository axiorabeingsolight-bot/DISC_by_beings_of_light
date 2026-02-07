import React, { useState } from "react";
import { motion } from "motion/react";

import arr from "../constants/FAQs.js";
import image from "../assets/FAQ.png";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import Lines from "./Lines.jsx";

const Accordion = ({ question, answer, state, setState, divider, delay }) => {
  return (
    <motion.div
      className="max-w-full md:min-w-xl md:max-w-2xl cursor-pointer"
      onClick={() => setState(!state)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <div className="flex items-center h-13.5 w-full">
        <div className="aspect-square h-full flex items-center justify-center">
          {state ? <FaMinus /> : <FaPlus />}
        </div>

        <p>{question}</p>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: state ? "auto" : 0,
          opacity: state ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden pl-13.5"
      >
        <p className="pb-4">{answer}</p>
      </motion.div>

      {divider && <hr className="text-zinc-500 w-full" />}
    </motion.div>
  );
};

const Questions = () => {
  const [state, setState] = useState(Array(arr.length).fill(false));

  const helper = (index, curr) => {
    const copy = Array(arr.length).fill(false);
    copy[index] = curr;
    setState(copy);
  };

  return (
    <div className="md:p-12">
      <h1 className="underline text-3xl text-center p-4">
        Frequently Asked Questions
      </h1>

      {arr.map((item, index) => (
        <Accordion
          key={index}
          question={item.Q}
          answer={item.A}
          state={state[index]}
          setState={(curr) => helper(index, curr)}
          divider={index !== arr.length - 1}
          delay={0.08 * (index + 1)}
        />
      ))}
    </div>
  );
};

const FAQSection = () => {
  return (
    <div>
      <Lines direction={"left"} />
      <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-around lg:items-start">
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

export default FAQSection;
