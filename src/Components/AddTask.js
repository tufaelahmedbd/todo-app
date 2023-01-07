import React from "react";

const AddTask = () => {
  return (
    <form className=" bg-gray-900 container mx-auto flex justify-between p-10">
      <input
        type="text"
        placeholder="What things to do?"
        className=" bg-transparent outline-none border-b-2  py-2 px-5 foucs: border-teal-600"
      />
      <button
        type="submit"
        className=" bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
