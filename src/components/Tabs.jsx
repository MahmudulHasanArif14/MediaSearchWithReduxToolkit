import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { setActiveTab } from "../Redux/features/searchSlice";

const Tabs = () => {
    const tabs = ["Photos", "Videos", "Gifs"];
    const dispatch = useDispatch();
    const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 m-2 rounded-md uppercase cursor-pointer transition-colors duration-300 ${
            activeTab === tab.toLowerCase()
              ? "bg-green-600 text-white hover:bg-green-500 shadow-lg hover:shadow-xl  box-shadow-lg"
              : "bg-blue-800 text-white hover:bg-blue-600"
          }`}
          onClick={() => dispatch(setActiveTab(tab.toLowerCase()))}
        >
          {tab}
        </button>
      ))}
    </>
  );
};

export default Tabs;
