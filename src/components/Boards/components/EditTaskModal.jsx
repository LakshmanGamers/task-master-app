import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../BoardsScreen";
import axios from "axios";
import TextareaAutosize from 'react-textarea-autosize';



const BASE_URL = 'https://render-backend-ngn1.onrender.com'
export default function EditTaskModal({ id }) {
  const { state, setState } = useContext(TaskContext);
  const {setEditMode} = useContext(TaskContext);

  const [task, setTask] = useState({
    content: "",
    description: "",
    dueDate: ""
  });

  useEffect(() => {
    console.log(state);
    if (id) {
      const currTask = state.tasks[id];
      if (currTask) {
        setTask(currTask); 
      }
    }
  }, [id, state.tasks]);

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  async function updateInDB(board){
    try{
      const resp = await axios.post(BASE_URL +'/updateBoard',board);
      console.log(resp);
    }
    catch(err){
      console.error("Error during updating task:", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

   
    if (task.content) {
      const updatedTasks = {
        ...state.tasks,
        [id]: { ...task } // Update the task at the given id
      };
      
      setState((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
      }));
      updateInDB({...state , tasks : updatedTasks});
      setTask({
        heading: "",
        description: "",
        dueDate: ""
      });
      setEditMode(false);
    }
   
  }
 
  

  return (
    <div style={{ border: "1px solid black", padding: "10px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"  , width : "250px" }}>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <TextareaAutosize
        name="content"
        placeholder="Task Name"
        value={task.content}
        onChange={handleChange}
        required
        style={{
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
          minRows : "1",
          resize: "none",
          outline: "none",
          fontSize : "16px"


        }}
      />
      <TextareaAutosize
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        style={{
         border: "none",
         borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
         minRows : "1",
         resize: "none",
         outline : "none",
         fontSize : "12px"

           }}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",


        }}
      />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <button
          style={{
            borderRadius: "5px",
            backgroundColor: "#757ce8",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
          }}
          type="submit"
        >
          Save
        </button>
        <button
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "10px 15px",
            cursor: "pointer",
          }}
          type="button" // Prevent form submission
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  );
}
