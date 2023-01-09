import React, { createContext, useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";

export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedText, setEditedText] = useState("");
  const [toggleEditMode, setToggleEditMode] = useState(true);

  useEffect(() => {
    //--getting data from the server--
    fetchingData();
  }, []);

  //--fetching data--
  const fetchingData = async () => {
    try {
      const res = await fetch("https://imminent-blush-haumea.glitch.me/task");
      if (!res.ok) throw new Error("Something wrong😢");
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  //--delete event--
  const handleDelete = (id) => {
    //--delete data only--
    deleteData(id);
    //--set updated tasks--
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

  //--editing event--
  const handleEdit = (id) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);

    setTasks([...tasks]);
    setToggleEditMode(false);

    //--re-arrange--
    tasks
      .filter((task) => task.id !== id)
      .map((targetEl) => (targetEl.isEditable = false));
  };

  //--editing task form handler--
  const handleEditSubmitter = (e, id) => {
    e.preventDefault();

    setToggleEditMode(!toggleEditMode);

    //--persist data--
    const editPersistance = {
      text: editedText,
      id: id,
    };

    //--put req--
    puttingRequest(id, editPersistance);

    //--real-time update--
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersistance.text;

    setTasks([...tasks]);
  };

  const puttingRequest = async (id, newData) => {
    await fetch(`https://imminent-blush-haumea.glitch.me/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={handleDelete}>
        <EditHandlerContext.Provider value={handleEdit}>
          <Header />
          <AddTask tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            error={error}
            loading={loading}
            handleEditSubmitter={handleEditSubmitter}
            editedText={editedText}
            setEditedText={setEditedText}
          />
          <Footer />
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
