import React ,{useEffect, useState} from "react";

export default function DateForEdit(props){
    const [inputType, setInputType] = useState('text');
    const [dateval , setDateVal]  = useState("");
    
//console.log(dateval);
    function formatDateToYYYYMMDD(dateString) {
      const res = dateString.split('T')[0];
      //console.log(res);
      return res;
    }
    

    // useEffect(()=>{
      
    //     const result =  formatDateToYYYYMMDD(props.value);
    //    props.onRender((prev)=>{
    //       return {...prev, duedate : result}
    //     })
    // },[props.value])
    // useEffect(()=>{
      
    //    const result =  formatDateToYYYYMMDD(props.value);
      

    //     setDateVal(result);
      
    // },[props.value]);
    const handleFocus = () => {
        setInputType('date');
      };
   
    return (
        <>
         <input type="date"  name='duedate' onFocus={handleFocus} value={props.value} onChange={props.onChange} style={{ marginRight : "10px"}}/>
        </>
    )
}

