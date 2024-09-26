import React, { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Task from './Task';
import EditTaskModal from './EditTaskModal';
import { TaskContext } from '../BoardsScreen';

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

}));

const Column = ({ column, tasks }) => {
  const { editData, setEditData, editMode } = useContext(TaskContext);

  return (
    <>
      <ColumnHeader variant="h6" gutterBottom sx={{fontSize : "16px" , fontWeight : "bold"}}>
        {column.title} <p style={{display: "inline" , fontWeight : "lighter" ,color : "gray"}}> {tasks.length ? tasks.length : 0} </p>
        
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
