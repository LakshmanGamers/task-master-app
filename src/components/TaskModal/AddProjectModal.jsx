import React from "react";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

export default function AddProjectModal(props) {
  const [title, setTitle] = React.useState('');
  function handleChange(event) {
    setTitle(event.target.value);
  }

  async function addInDB(data) {
    try {
      const resp = await axios.post("/api/addProject", data);
    }
    catch (err) {
      console.error("Error during adding project:", err);
    }
  }

  function handleSubmit() {
    if (!title) {
      alert("Please enter a project title.");
      return;
    }
    const postData = {
      name: title,
      userId: localStorage.getItem("uid")
    };
    addInDB(postData);
    props.onAdd(title);
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
          <h3>Project Title</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" placeholder="Project Title" value={title} onChange={handleChange} style={{width : "100%" , borderRadius : "10px" , display : "inline-block"}}/>
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