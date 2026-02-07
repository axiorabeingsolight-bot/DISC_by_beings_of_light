import React, { useEffect, useState } from "react";

import Lines from "../components/Lines.jsx";
import useUser from "../context/User.js";
import image from "../assets/logo.png";

import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa6";

import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { IoMdTransgender } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../context/Store.js";

const InputBox = ({ Logo, text, value, onChange }) => {
  return (
    <div className="border rounded-md px-2.5 py-1 flex items-center justify-between gap-2.5">
      <Logo className="text-mx" />
      <input
        type="text"
        className="w-full border-0 outline-none"
        onChange={(e) => onChange(e.target.value)}
        placeholder={text}
        value={value}
        autoomplete="off"
      />
    </div>
  );
};

const arr = [
  { text: "Male", Logo: <IoMdMale className="text-xl" /> },
  { text: "Female", Logo: <IoMdFemale className="text-xl" /> },
  { text: "Other", Logo: <IoMdTransgender className="text-xl" /> },
];

const SelectBox = ({ state, setState }) => {
  const { user, update } = useUser();
  const [text, setText] = useState(null);
  const [Logo, setLogo] = useState(<FaGenderless className="text-xl" />);

  useEffect(() => {
    if(user.gender) {
      setText(user.gender);
      for(let i = 0; i < arr.length; i++) {
        if(user.gender === arr[i].text)
          setLogo(arr[i].Logo);
      }
    }
  });

  return (
    <div
      className="border rounded-md px-2.5 py-1 flex items-center justify-between gap-2 relative select-none cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setState((curr) => !curr);
      }}
    >
      {Logo}
      <p className={`w-full ${text ? "" : "text-zinc-500"}`}>
        {text ? text : "Select Gender"}
      </p>
      {state ? <FaAngleUp /> : <FaAngleDown />}

      <div
        className={`w-full border absolute right-0 top-full rounded-md mt-1 px-1.5 py-0.5 body ${state ? "" : "hidden"}`}
      >
        {arr.map((item, index) => (
          <div
            key={index}
            onClick={(e) => {
              setText(item.text);
              setLogo(item.Logo);
              update("gender", item.text);

              e.stopPropagation();
              setState(false);
            }}
            className="flex items-center justify-between gap-2 rounded-md px-2 py-0.5 my-1 hover:bg-teal-500 hover:text-white"
          >
            {item.Logo}
            <p className="w-full">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const { user, update, validate, reset } = useUser();
  const { storeReset } = useStore();

  const handleSubmit = () => {
    if (validate()) {
      navigate("/questions");
      return;
    }

    toast("Please fill all the fields!");
  };

  useEffect(() => {
    reset();
    storeReset();
  }, []);

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      onClick={() => setState(false)}
    >
      <div className="border rounded-md py-8 relative">
        <img
          src={image}
          alt="logo"
          className="absolute aspect-square w-24 left-0 top-0"
        />
        <Lines direction={"right"} />

        <div className="w-60 xs:w-72 flex flex-col gap-2 mx-8 my-6">
          <div className="text-center my-3">
            <h1 className="text-2xl font-bold">DISC Test</h1>
            <p>Reveal your Personality Insights</p>
          </div>

          <InputBox
            Logo={FaUser}
            text={"Enter Name"}
            value={user.name}
            onChange={(text) => update("name", text)}
          />

          <InputBox
            Logo={FaEnvelope}
            text={"Enter Email"}
            value={user.email}
            onChange={(text) => update("email", text)}
          />

          <SelectBox state={state} setState={setState} />

          <div
            onClick={handleSubmit}
            className="w-full border select-none rounded-md text-center py-1 hover:bg-teal-500 hover:text-white cursor-pointer duration-200 my-2"
          >
            Submit Your Data
          </div>
        </div>

        <Lines direction={"left"} />
      </div>
    </div>
  );
};

export default UserDetailsPage;
