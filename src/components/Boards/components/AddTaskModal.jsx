import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextareaAutosize from 'react-textarea-autosize';


export default function AddTaskModal({ onAdd, id, data }) {
  const [on,setOn] = useState(false);
  const [task, setTask] = useState({
    content: "",
    description: "",
    dueDate: ""
  });

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (task.content ) {
      onAdd(id, task.content, task.description, task.dueDate);

      setTask({
        content: "",
        description: "",
        dueDate: ""
      });
      setOn(false);
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "16px",
      width: "270px",
      marginLeft : "10px"
    }}>
      {!on &&   <button style={{ border : "none" , backgroundColor : "#fafafa", fontSize: "14px"}}  onClick={()=>setOn(true)}><AddCircleIcon style={{color : "#3f50b5"}} /> Add Task</button> }


{on && 

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
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" , gap :"10px" }}>
           <button
             style={{
               borderRadius: "5px",
               backgroundColor: "#757ce8",
               color: "white",
               border: "none",
               padding: "6px 10px", // Reduced padding for a smaller button
               fontSize: "14px", // Adjust font size
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
               padding: "6px 10px", // Reduced padding for a smaller button
               fontSize: "14px", // Adjust font size
               cursor: "pointer",
             }}
             type="button" // Prevent form submission
             onClick={() => setOn(false)}
           >
             Cancel
           </button>
          
         </div>
       </form>
     </div>
      }



      
    
    </div>
  );
}
