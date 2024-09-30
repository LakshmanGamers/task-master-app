import React, { useContext, useState  } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Task from './Task';
import EditTaskModal from './EditTaskModal';
import { TaskContext } from '../BoardsScreen';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FadeMenu from './ColumnDropdown';
import ColHead from './ColHead';


const ColumnContainer = styled('div')(({ theme }) => ({
  minWidth: 300,
  
  width: '30%',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const ColumnHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),

  display: 'flex',
  justifyContent:'space-between'

}));

// const [hover ,setHover]

const Column = ({ column, tasks }) => {
  const { editData, setEditData, editMode } = useContext(TaskContext);

  const [onEditcol ,setEditCol] = useState(false);

  return (
    <>
      <ColumnHeader variant="h6" gutterBottom sx={{fontSize : "16px" , fontWeight : "bold" , marginLeft : "20px"}}>
      
      {/* {
        onEditcol && (
          <EditTaskModal
            id={column.id}
            title={column.title}
            setEditCol={setEditCol}
          />
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
        <FadeMenu colId={column.id} oldTitle={column.title} onEdit={setEditCol} />
        </div>
        )

      } */}
        
        <ColHead column={column} tasks={tasks} />
        
      </ColumnHeader>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {task.id === editData && editMode ? (
                  <EditTaskModal id={task.id} />
                ) : (
                  <Task task={task} index={index} columnId={column.id} />
                )}
              </React.Fragment>
            ))}
            {provided.placeholder}
          </ColumnContainer>
        )}
      </Droppable>
    </>
  );
};

export default Column;
