import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import useUser from "../context/User.js";
import useStore from "../context/Store.js";
import data from "../constants/Questions.js";

import { FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

const Option = ({ option, value, onClick }) => {
  return (
    <div className="flex items-center">
      <div className="h-10 aspect-square flex items-center justify-center">
        {value === 1 ? (
          <FaCheckCircle className="text-xl text-green-900 cursor-pointer" />
        ) : (
          <FaRegCircleCheck
            className="text-xl text-zinc-700 cursor-pointer hover:text-green-600"
            onClick={() => onClick(1)}
          />
        )}
      </div>

      <div className="h-10 aspect-square  flex items-center justify-center">
        {value === -1 ? (
          <FaCircleXmark className="text-xl text-red-900 cursor-pointer" />
        ) : (
          <FaRegCircleXmark
            className="text-xl text-zinc-700 cursor-pointer hover:text-red-600"
            onClick={() => onClick(-1)}
          />
        )}
      </div>

      <div>
        <p>{option}</p>
      </div>
    </div>
  );
};

const Question = ({ question, num }) => {
  const { data, update } = useStore();
  return (
    <div className="border rounded-md w-full sm:w-108 px-8 py-6">
      <h1 className="font-bold text-xl">{question.question}</h1>

      <div className="pt-3">
        {Object.entries(question.options).map(([key, value], index) => (
          <Option
            key={index}
            option={value}
            value={data[num][key]}
            onClick={(val) => update(num, key, val)}
          />
        ))}
      </div>
    </div>
  );
};

const TestPage = () => {
  const { validate } = useUser();
  const { getCompleted } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!validate()) navigate("/user-info");
    if (getCompleted()) navigate("/results");
  }, []);

  const handleSubmit = () => {
    if(getCompleted()) {
      navigate("/results");
      return;
    }

    toast("All questions are mandatory.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-stretch px-1 xl:px-12 gap-6 py-8">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex justify-center">
            <Question question={item} num={index} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <div
          onClick={handleSubmit}
          className="w-fit border select-none rounded-md text-center px-10 py-1 hover:bg-teal-500 hover:text-white cursor-pointer duration-200 mb-12"
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default TestPage;
