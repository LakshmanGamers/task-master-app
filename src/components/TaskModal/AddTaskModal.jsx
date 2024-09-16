import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Date from './Date';
import Priority from './Priority';
import ProjectDropdown from './ProjectDropDown';
import TaskInputArea from './TaskInputArea';
import axios from 'axios';


function AddTaskModal(props) {
  const [taskData, setTaskData] = useState({
    id: -1,
    heading: "",
    description: "",
    duedate: "Due Date",
    priority: "",
    completed: false,
    userId: -1,
    project: "Inbox"
  });
  const [error, setError] = useState("");

  const validate = (taskData) => {
    if (
      !taskData.heading ||
      !taskData.description ||
      taskData.duedate === "Due Date" ||
      !taskData.priority ||
      taskData.userId < 0
    ) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };

  function handleChange(event) {
    const { name, value } = event.target;
    var val;
    if (name==="date"){
      val =  `${value.getFullYear()}-${(value.getMonth()+1).toString().padStart(2, '0')}-${value.getDate()}`;
    }
    setTaskData((prev) => (
      {
      ...prev,
      [name]: value
    }));
  }

  async function addInDb(data){
    try{
    const result = await axios.post("/api/add",data);
    console.log("Task added successfully:", result);
    }
    catch(err){
    
    console.error("Error during adding task:", err);}
  }
  function handleSubmit(event) {
    
    event.preventDefault(); 

    
    const uid = localStorage.getItem("uid");
    const newData = {...taskData , userId : uid   };
    // const today = new Date();
    // const dueDate = new Date(taskData.duedate);

    // // Check if the due date is in the past
    // if (dueDate < today) {
    //   alert("Due date cannot be in the past");
    //   return ;
    // }
    // if(!validate(newData)){
    //   alert("Please enter all fields");
    //   return;
    // }
    console.log("Task submitted successfully:", newData);
   
    addInDb(newData);
    props.onAdd(newData);


    setTaskData({
      id : -1,
      heading: "",
      description: "",
      duedate: "Due Date",
      priority: "",
      completed: false,
      userId: -1,
      project: ""
    });
    props.onClose(); 
    
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      backdrop= "static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      style={{
        zIndex:99999
      }}
      centered

    >
      <Modal.Header>
        <Modal.Title style={{ width: '100%' }} aria-labelledby="contained-modal-title-vcenter">
          <TaskInputArea name="heading" placeholder="Task Name" value={taskData.heading} onChange={handleChange} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskInputArea name="description" placeholder="Description" value={taskData.description} onChange={handleChange}  />
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: "column" }}>
          <div >
            <Date value={taskData.duedate} onChange={handleChange} />
            <Priority value={taskData.priority} onChange={handleChange} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <ProjectDropdown  value={taskData.project} onChange={handleChange} />
        <div  >
          <Button variant="secondary" onClick={props.onClose} style={{ marginRight: "4px" }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}  style={{backgroundColor:"#3f50b5"}}  >
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTaskModal;
