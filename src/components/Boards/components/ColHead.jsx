import react , {useEffect , useContext , useState} from 'react';
import EditTaskModal from './EditTaskModal';
import FadeMenu from './ColumnDropdown'
import { TaskContext } from '../BoardsScreen';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function ColHead({column , tasks}){


    const [anchorEl, setAnchorEl] = useState(null);
    const {  editColTitle , deleteColumn  } =useContext(TaskContext);

    const [onEditcol ,setEditCol] = useState(false);
    const [title , setTitle] = useState("");

    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    

  
    function editColumnTitle(colId){
         setEditCol(true);
          setAnchorEl(null);
  
    }
  
    function deleteColumnTitle(colId){
        console.log(colId)
          deleteColumn(colId)
     }

     function handletitleEdit(){
        setEditCol(false);
        editColTitle(column.id  , title );
     }


    useEffect(()=>{
        setTitle(column.title)
      },[column]);
  
      function handleChange(e){
            e.preventDefault();
            setTitle(e.target.value);
      }

    

    return (
        <>

          
      {
        onEditcol && (
          <div style={{ display : "felx" , flexDirection : "column"}}>
                    <div>
                    <input
                        type="text"
                        placeholder="Column name"
                        value={title}
                        onChange={handleChange}
                        style={{ borderRadius: "10px", paddingLeft: "10px", width: "250px", display: "inline-block", marginBottom: "10px" }}
                    />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "10px" }}>
                        <button
                         disabled={!title}
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#757ce8",
                                color: "white",
                                border: "none",
                                padding: "6px 10px", // Reduced padding for a smaller button
                                fontSize: "14px", // Adjust font size
                                cursor: "pointer",
                            }}
                            onClick={ handletitleEdit}
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
                            onClick={() => setEditCol(false)}
                        >
                            Cancel
                        </button>
                    </div>
          </div>
        )
      }

        
        {
        !onEditcol && (
          <div >
          {column.title} <p style={{display: "inline" , fontWeight : "lighter" ,color : "gray"}}> {tasks.length ? tasks.length : 0} </p>
          </div>
        )
      }

      {
        !onEditcol && (
        <div  >




<MoreHorizIcon size="small" id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>

      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}  
      >
        <MenuItem onClick={() => editColumnTitle(column.id)}>Edit</MenuItem>
        <MenuItem onClick={() => deleteColumnTitle(column.id)}>Delete</MenuItem>
      </Menu>









        {/* <FadeMenu colId={column.id} oldTitle={column.title} onEdit={setEditCol} /> */}
        </div>
        )

      }
        


        </>
    )
}