import React from "react";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
const BASE_URL = 'https://render-backend-ngn1.onrender.com/'



export default function AddBoardModal(props) {
  const [title, setTitle] = React.useState('');
  function handleChange(event) {
    setTitle(event.target.value);
  }

  async function addInDB(data) {
  
    try {
      const resp = await axios.post(BASE_URL+"addBoard", data);
      const BoardId = resp.data._id;
      props.onAddTitle((prev) => {
        if (prev) {
          // If prev exists, spread the array and add a new object
          return [...prev, { id: BoardId, name: title }];
        } else {
          // If prev is null or undefined, initialize with a new array
          return [{ id: BoardId, name: title }];
        }
      });

    props.onAddBoard((prev)=>{
        if(prev){
            return {
                ...prev,
                [BoardId] : {
                    _id : BoardId,
                    name : title,
                    userId : localStorage.getItem("uid"),
                    tasks : {},
                    columns : {},
                    columnOrder : []
                }
            }
        }
        else{
            return {
              
                [BoardId] : {
                    _id : BoardId,
                    name : title,
                    userId : localStorage.getItem("uid"),
                    tasks : {},
                    columns : {},
                    columnOrder : []
                }
            }
        }
    }

)
      console.log("Board added successfully:", resp);
      
    }
    catch (err) {
      console.error("Error during adding project:", err);
    }
    
  }

  function handleSubmit() {
    if (!title) {
      alert("Please enter a Board title.");
      return;
    }
    const postData = {
      name: title,
      userId: localStorage.getItem("uid")
    };

    
    const BoardId =   addInDB(postData);

    // "board-1": {
    //     "id": "board-1",
    //     "name": "Project Alpha",
    //     "userId" : "user-1",
    //     "tasks": {
          
    //     },
    //     "columns": {
       
    //     },
    //     "columnOrder": []
    //   }

   
          setTitle('');
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
      style={{zIndex : "100000000000000 !important" }}
    >
      <Modal.Header>
        <Modal.Title style={{ width: '100%' }} aria-labelledby="contained-modal-title-vcenter">
          <h3>Board  Title</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" placeholder="Enter Board Title" value={title} onChange={handleChange} style={{width : "100%" , borderRadius : "10px" , display : "inline-block"}}/>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">


        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}   style={{backgroundColor:"#3f50b5"}}  >
          Add
        </Button>

      </Modal.Footer>
    </Modal>
  )
}