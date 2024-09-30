import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TaskContext } from '../BoardsScreen';


export default function FadeMenu({colId , oldTitle , onEdit}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {  editColTitle , deleteColumn  } = React.useContext(TaskContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
const [title , setTitle] = React.useState("");

React.useEffect(() => {
    setTitle(oldTitle);
},[oldTitle]);


  function editColumnTitle(colId){
        onEdit(true);

        editColTitle(colId , title);
  }

  function deleteColumnTitle(colId){
        deleteColumn(colId)
   }
  return (
    <div>
      

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
        <MenuItem onClick={() => editColumnTitle(colId)}>Edit</MenuItem>
        <MenuItem onClick={() => deleteColumnTitle(colId)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
