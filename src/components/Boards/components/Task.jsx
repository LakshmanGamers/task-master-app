import React, { useContext, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FaCalendarAlt } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskContext } from '../BoardsScreen';

const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  cursor: 'grab',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  borderRadius: '12px',
  padding: theme.spacing(1),
  backgroundColor: '#f9f9f9',
  height : "auto"
}));

const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.05rem',
  color: theme.palette.text.primary,
  wordWrap: 'break-word', // Enable word wrapping
    
maxWidth: '150px',

}));

const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  wordWrap: 'break-word',// Enable word wrapping
  maxWidth: '200px',
}));

const CardFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const IconContainer = styled('div')({
  display: 'flex',
  gap: '8px',
});

const Task = ({ task, index, columnId }) => {
  const [hover, setHover] = useState(false);
  const { onEdit, onDelete } = useContext(TaskContext);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <CardContent>
            <CardHeader>
              <CardTitle variant="h6">{task.content}</CardTitle>
              {hover && (
                <IconContainer>
                  <Tooltip title="Edit Task">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(task.id)}
                      style={{ color: '#1976d2' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(task.id, columnId)}
                      style={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </IconContainer>
              )}
            </CardHeader>
            {task.description && (
              <CardDescription variant="body2">{task.description}</CardDescription>
            )}
            <CardFooter>
              {task.dueDate && (
                <Chip
                  icon={<FaCalendarAlt  />}
                  label={task.dueDate}
                  size="small"
                  color="primary"
                  style={{backgroundColor: '#757ce8' , }}
                />
              )}
            </CardFooter>
          </CardContent>
        </TaskCard>
      )}
    </Draggable>
  );
};

export default Task;
