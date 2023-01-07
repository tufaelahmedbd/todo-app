import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

const App = () => {
  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <Header />
      <AddTask />
      <TaskList />
      <Footer />
    </div>
  );
};

export default App;
