import React from "react";
import { format } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { RiListView } from "react-icons/ri";
const HeroSection = ({ view, setView, search, setSearch }) => {
  const handleSearch = () => {
    setSearch(!search);
    setView(false);
  };
  const handleView = () => {
    setView(!view);
    setSearch(false);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-20 mb-5">
        <div>
          <h1 className="font-bold text-white text-2xl md:text-3xl">
            Today's Tasks
          </h1>
          <p className="text-sm md:text-lg font-semibold text-black">
            {format(new Date(), "EEEE, dd MMM yyyy")}
          </p>
        </div>
        <button
          className="flex items-center gap-1 text-lg font-semibold
             bg-blue-100 text-blue-600 px-5 py-2 md:px-10 md:py-3 rounded-xl"
          onClick={handleSearch}
        >
          <IoMdAdd className=" size-5 font-bold" />
          New Task
        </button>
        <button
          className="flex items-center gap-1 text-lg font-semibold
             bg-blue-100 text-blue-600 px-5 py-2 md:px-10 md:py-3 rounded-xl"
          onClick={handleView}
        >
          <RiListView className=" size-5 font-bold" />
          View Task
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
