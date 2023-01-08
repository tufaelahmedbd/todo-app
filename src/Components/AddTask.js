import React, { useRef, useState } from "react";

const AddTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const inputRef = useRef(null);

  //Add Task Handle Event
  const addSubmitHandler = (e) => {
    e.preventDefault();
    //task post into server
    taskPosting(task);
    inputRef.current.blur();
    setTask("");
  };
  //task posting
  const taskPosting = async (text) => {
    const res = await fetch("https://imminent-blush-haumea.glitch.me/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    //real time data updating
    setTasks([...tasks, data]);
  };

  return (
    <form
      className=" bg-gray-900 container mx-auto flex justify-between p-10"
      onSubmit={addSubmitHandler}
    >
      <input
        required
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
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
