import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

export  default function TaskInputArea(props){
    return (
        <TextareaAutosize
        className='text-area-auto'
        name={props.name}
        maxRows={6}
        value={props.value}
        style={{
          border: "none",
          display: "inline-block",
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.25rem",
          outline: "none",
          resize: "none",
          borderRadius: "5px",
          overflow: "auto" 
        }}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    )
}