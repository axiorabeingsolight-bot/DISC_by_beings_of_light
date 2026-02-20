import React, { useEffect, useState } from "react";
import useStore from "../context/Store";
import BarChart from "../components/CustomBarChart";
import CustomPieChart from "../components/CustomPieChart";
import Navbar from "../components/Navbar";
import useUser from "../context/User";
import Lines from "../components/Lines";
import full from "../constants/Description.js";
import { useNavigate } from "react-router-dom";

const Colors = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 justify-center py-6">
        <div className="flex items-center gap-2">
          <div className="h-4 aspect-square bg-[#456882]"></div>
          <p>Dominant</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 aspect-square bg-[gold]"></div>
          <p>Inspirational</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 aspect-square bg-fuchsia-500"></div>
          <p>Steady</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 aspect-square bg-teal-500"></div>
          <p>Conscientious</p>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const { user } = useUser();
  const { getData, getCompleted } = useStore();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const modified = (key) => {
    const res = [
      { type: full["D"], value: 0, fill: "#456882" },
      { type: full["I"], value: 0, fill: "gold" },
      { type: full["S"], value: 0, fill: "oklch(66.7% 0.295 322.15)" },
      { type: full["C"], value: 0, fill: "oklch(70.4% 0.14 182.503)" },
    ];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (res[i].type === data[j].type) res[i].value = data[j][key];
      }
    }

    return res;
  };

  useEffect(() => {
    if (!getCompleted()) navigate("/user-info");
    const res = [];
    const curr = getData();

    for (const [key, value] of Object.entries(curr)) {
      const row = {
        type: full[key],
        most: value[0],
        least: value[1],
      };

      res.push(row);
    }

    setData(res);
  }, []);

  const getSortedTraits = (func) => {
    const arr = ["D", "I", "S", "C"];
    arr.sort(func);
    return arr;
  };

  const getCharacter = () => {
    const curr = getData();
    const arr = getSortedTraits((a, b) => {
      const val = (key) => curr[key][0] - curr[key][1];
      return val(b) - val(a);
    });
    return arr[0] + "/" + arr[1];
  };

  const mostTraits = getSortedTraits((a, b) => {
    const curr = getData();
    return curr[b][0] - curr[a][0];
  });

  const leastTraits = getSortedTraits((a, b) => {
    const curr = getData();
    return curr[a][1] - curr[b][1];
  });

  const topMost = mostTraits.slice(0, 2).map((k) => full[k]);
  const topLeast = leastTraits.slice(0, 2).map((k) => full[k]);

  const common = topLeast.filter((t) => topMost.includes(t));
  const uncommon = topLeast.filter((t) => !topMost.includes(t));

  const formatList = (list) => {
    if (list.length === 0) return null;
    if (list.length === 1) return <b>{list[0]}</b>;
    return (
      <>
        <b>{list[0]}</b> and <b>{list[1]}</b>
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-1 pb-12">
        <div className="w-full lg:w-xl border rounded-md py-12">
          <Lines direction={"left"} />
          <div className="flex items-center justify-center flex-col pt-12">
            <p className="font-bold text-2xl">{user.name}</p>
            <p className="">{user.email}</p>
          </div>

          <hr className="mx-4 mt-8 text-gray-500" />

          <div className="flex items-center justify-center flex-col px-4">
            {data && (
              <div className="w-full max-w-full px-1 my-8">
                <h1 className="text-center font-bold text-2xl">Most Likely</h1>

                <div className="w-full flex items-center justify-around flex-wrap">
                  <Colors />
                  <div className="w-full md:max-w-64">
                    <CustomPieChart
                      chartData={modified("most")}
                      activeFunction={(x, y) => x > y}
                    />
                  </div>
                </div>

                <p className="px-8">
                  Your analysis highlights that you are most likely to lead with
                  a {formatList(topMost)} approach.
                </p>
              </div>
            )}

            <hr className="text-gray-500 w-full" />

            {data && (
              <div className="w-full max-w-full px-1 my-8">
                <h1 className="text-center font-bold text-2xl">Least Likely</h1>

                <div className="w-full flex items-center justify-around flex-wrap">
                  <Colors />
                  <div className="w-full md:max-w-64">
                    <CustomPieChart
                      chartData={modified("least")}
                      activeFunction={(x, y) => x < y}
                    />
                  </div>
                </div>

                <div className="px-8 space-y-2">
                  {common.length > 0 && (
                    <p>
                      This underscores the consistency of {formatList(common)}{" "}
                      that remains constant to the change of situation.
                    </p>
                  )}
                  {uncommon.length > 0 && (
                    <p>
                      It also shows {formatList(uncommon)} identifies as your
                      least character essence that changes with incidents.
                    </p>
                  )}
                </div>
              </div>
            )}

            <hr className="text-gray-500 w-full" />

            <div className="my-8 w-full flex flex-col items-center">
              <h1 className="text-2xl font-bold">
                Your Peak Character Essence is {getCharacter()}.
              </h1>
              <div className="w-120 max-w-full p-1">
                <BarChart chartData={data} />
              </div>

              <div className="w-full flex flex-wrap justify-around py-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 aspect-square bg-teal-500"></div>
                  <p>Most Likely</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 aspect-square bg-fuchsia-500"></div>
                  <p>Least Likely</p>
                </div>
              </div>

              <p className="px-8">
                Based on the results, your profile leans heavily toward{" "}
                <b>{full[getSortedTraits((a, b) => {
                  const curr = getData();
                  const val = (key) => curr[key][0] - curr[key][1];
                  return val(b) - val(a);
                })[0]]}</b> traits, while{" "}
                <b>{full[getSortedTraits((a, b) => {
                  const curr = getData();
                  const val = (key) => curr[key][0] - curr[key][1];
                  return val(b) - val(a);
                })[3]]}</b> behaviors are least prominent.
              </p>
            </div>
          </div>

          <div className="flex justify-center">

            <div
              onClick={() => {
                navigate("/#home");
              }}
              className="w-fit border select-none rounded-md text-center px-10 py-1 hover:bg-teal-500 hover:text-white cursor-pointer duration-200 mb-12"
            >
              Back to Home
            </div>
          </div>
          <Lines direction={"right"} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
