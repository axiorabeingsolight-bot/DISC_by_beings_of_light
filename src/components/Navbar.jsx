import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [state, setState] = useState(false);
  return (
    <div className="flex items-center justify-around pt-1 pb-8">
      <img src={logo} alt="Logo" className="aspect-square w-24 lg:w-32" />

      <nav className="border rounded-2xl md:flex items-center justify-between px-16 py-1 gap-16 hidden">
        <a href="/#home">Home</a>
        <a href="/#test">Take Test</a>
        <a href="/#faq">FAQ</a>
      </nav>

      <div className="w-24 aspect-square flex items-center justify-center">
        <IoMenu
          className="text-4xl md:hidden cursor-pointer"
          onClick={() => setState(true)}
        />
      </div>

      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ left: "100%" }}
            animate={{ left: "60%" }}
            exit={{ left: "100%" }}
            className="w-screen h-screen bg-white fixed inset-0 flex flex-col items-center"
            transition={{ duration: 0.3 }}
          >
            <div className="w-full flex justify-start px-[30%] py-5">
              <button onClick={() => setState(false)}>
                <FaXmark className="text-2xl cursor-pointer hover:text-red-700" />
              </button>
            </div>

            <a
              href="#home"
              className="w-full text-center h-10 hover:bg-zinc-400 hover:text-white flex items-center pl-6"
              onClick={() => setState(false)}
            >
              Home
            </a>
            <a
              href="#test"
              className="w-full text-center h-10 hover:bg-zinc-400 hover:text-white flex items-center pl-6"
              onClick={() => setState(false)}
            >
              Take Test
            </a>
            <a
              href="#faq"
              className="w-full text-center h-10 hover:bg-zinc-400 hover:text-white flex items-center pl-6"
              onClick={() => setState(false)}
            >
              FAQ
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
