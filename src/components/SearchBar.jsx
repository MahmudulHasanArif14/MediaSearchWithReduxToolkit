import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from "../Redux/features/searchSlice";

const SearchBar = () => {



    const [search, setsearch] = useState("");
    const dispatch = useDispatch();
   



    const handleSubmit = (e) => {
        console.log(search);
        e.preventDefault();
        // Handle search logic here
        dispatch(setQuery(search));

        setsearch("");
    }




  return (
    <>
      <form className="flex items-center p-4" onSubmit={handleSubmit}>
        <input required
          className="w-1/4 h-12 bg-gray-800 rounded-md  px-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 text-md"
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer ml-2 bg-blue-500 text-white px-4 py-2 rounded-md text-lg active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500  active:scale-95 transition-transform duration-150"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar