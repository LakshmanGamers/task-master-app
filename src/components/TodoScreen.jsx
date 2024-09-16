import React, { useEffect, useState } from "react";
import AddTaskModal from "./TaskModal/AddTaskModal";
import EditTaskModal from "./TaskModal/EditTaskModal";
import TaskList from "./TaskList";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";


export default function TodoScreen(props) {
  const [show, setShow] = useState(false);
  const [taskItems, setTaskItems] = useState([]);
  useEffect(() => {

    console.log(props.data);
    console.log(taskItems);
    if (props.project) {
      setTaskItems(props.data[props.project]);
      
    }


  }, [props.data, props.project])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReorder = (newTaskList) => {
    setTaskItems(newTaskList);
  };
  async function deletefromDb(index) {
    try {
      const resp = await axios.delete(`/api/task/${index}`);
      console.log(resp);
    }
    catch (err) {
      console.error("Error during deleting task:", err);
    }
  }

  function addItem(task) {
    console.log(taskItems , task);

    var newList ; 
    if(!(taskItems)){
      newList = [task];
    }
    else{
     newList = [...taskItems, task];
    
    }

    setTaskItems(newList);
    
    

    props.setData((prev)=>{
      if(prev)
        return {...prev, [task.project]: newList }
      else
      return { [props.project]: newList };
    });
  }
  function deleteItem(index) {
    // console.log(taskItems , index);
    const newList = [...taskItems];
     const list = newList.filter(item => item.id !== index);
        deletefromDb(index);
    setTaskItems(list);
  }
  const [edit, setEdit] = useState(false);
  const [currtask, setcurrentTask] = useState({});

  function editItem(index) {
    setEdit(true);
    setcurrentTask(index);


  }




  return (
    <div className="todo-screen" >
      <div className="card-container">
        <TaskList tasks={taskItems} onReorder={handleReorder} setShow={handleShow} onDelete={deleteItem} onEdit={editItem} />
      </div>
      <button className="add-button" onClick={handleShow}><AddCircleIcon className="add-icon" /> Add Task</button>
      {show && <AddTaskModal
        show={show}
        onClose={handleClose}
        onShow={handleShow}
        items={taskItems}
        onAdd={addItem}
      />}
      {edit && 
      <EditTaskModal
        show={edit}
        onClose={setEdit}
        tasks={taskItems}
        index={currtask}
        onSave={setTaskItems}
      />
}
    </div>
  );
}
