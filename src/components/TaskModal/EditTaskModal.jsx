import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Date from './Date';
import DateForEdit from './DateForEdit';
import Priority from './Priority';
import ProjectDropdown from './ProjectDropDown';
import TaskInputArea from './TaskInputArea';
import axios from 'axios';
function EditTaskModal(props) {
  const [taskData, setTaskData] = useState({
    id : -1,
    heading: "",
    description: "",
    duedate: "",
    priority: "",
    completed: false,
    userId: -1,
    project: ""
  });
  useEffect(() => {
    console.log(props.tasks  , props.index);
    if (props.tasks && props.index ) {
      var resObj = props.tasks.find((item) => item.id === props.index);
      console.log(resObj);
        setTaskData(resObj);
    }
}, [props.tasks, props.index]);
  function handleChange(event) {
    const { name, value } = event.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function saveChangesInDb(data){
     try{
      const resp = await axios.put(`/api/task/${data.id}`,data);
      console.log("Changes saved successfully:", resp);
     }
     catch(err){
      console.error("Error during saving changes:", err);
     }
  }

  

  function handleSubmit(event) {
    event.preventDefault(); 
    console.log(taskData);

    const uid = localStorage.getItem("uid");
    const newData = {...taskData , userId : uid   };

    saveChangesInDb(newData);

    props.onSave((prevItems)=>
    prevItems.map((item,inx)=> item.id===props.index ? {...newData} : item));
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
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"

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
            <DateForEdit value={taskData.duedate} type='date' onChange={handleChange} />
            <Priority value={taskData.priority} onChange={handleChange} />


          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <ProjectDropdown  value={taskData.project} onChange={handleChange} />
        <div  >
          <Button variant="secondary" onClick={()=>props.onClose(false)} style={{ marginRight: "4px" }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}  style={{backgroundColor:"#3f50b5"}} >
            Update
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
