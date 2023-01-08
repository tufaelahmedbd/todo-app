import React, { createContext, useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

export const DeleteHandlerContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //getting data from the server
    fetchingData();
  }, []);

  //fetching data
  const fetchingData = async () => {
    try {
      const res = await fetch("https://imminent-blush-haumea.glitch.me/task");
      if (!res.ok) throw new Error("Something wrong😢");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete event
  const handleDelete = (id) => {
    //delete data only
    deleteData(id);
    //set updated tasks
    setTasks(tasks.filter((task) => id !== task.id));
  };
  const deleteData = async (id) => {
    await fetch(`https://imminent-blush-haumea.glitch.me/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };
  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={handleDelete}>
        <Header />
        <AddTask tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} />
        <Footer />
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
