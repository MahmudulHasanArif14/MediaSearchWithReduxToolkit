import React from "react";
import { fetchKlipyGifs } from "./api/mediaApi";
import SearchBar from "./components/SearchBar";

import Tabs from "./components/tabs";
import ResultGrid from "./components/ResultGrid";

const App = () => {
  return (
    <>
      <div className="w-full  text-white bg-gray-900 p-4 ">
        <SearchBar />

        <Tabs />

        <ResultGrid />
      </div>
    </>
  );
};

export default App;
