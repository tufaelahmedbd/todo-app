import React, { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    //getting data from the server
    fetchingData();
  }, []);

  //fetching data
  const fetchingData = async () => {
    try {
      const res = await fetch(
        "https://flax-diagnostic-notebook.glitch.me/tasks"
      );
      if (!res.ok) throw new Error("Something wrong😢");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <Header />
      <AddTask />
      <TaskList tasks={tasks} />
      <Footer />
    </div>
  );
};

export default App;
