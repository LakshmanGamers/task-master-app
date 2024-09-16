import React ,{useState} from "react";

export default function Date(props){
    const [inputType, setInputType] = useState('text');

    const handleFocus = () => {
      setInputType('date');
    };
  
   
    return (
        <>
         <input type={inputType}  name='duedate' onFocus={handleFocus} value={props.value} onChange={props.onChange} style={{ marginRight: "4px" }}/>
        </>
    )
}

