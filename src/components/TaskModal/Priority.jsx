import React from "react";

export default function Priority(props){
    return (
        <>
        <select name='priority' value={props.value} onChange={props.onChange} >
        <option value="" disabled>Priority</option>
          <option value="Priority 1">Priority 1</option>
          <option value="Priority 2">Priority 2</option>
          <option value="Priority 3">Priority 3</option>
          <option value="Priority 4">Priority 4</option>
        </select>
        </>
    )
}
