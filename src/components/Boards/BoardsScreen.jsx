import React, { useState, useEffect, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './components/Column.jsx';
import { styled } from '@mui/system';
import AddTaskModal from './components/AddTaskModal.jsx';
import AddColumnModal from './components/AddColumnModal.jsx';
import { Typography } from '@mui/material';
import EditTaskModal from './components/EditTaskModal.jsx';
import './BoardsScreen.module.css';
import axios from 'axios';
import BoardTitle from './components/BoardTitle.jsx';


const BASE_URL = 'https://render-backend-ngn1.onrender.com'


// Styling for the board
const Board = styled('div')(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const TaskContext = createContext();

const BoardsScreen = ({ data, boardName , onChange }) => {
  // Initialize state with an empty object
  const [state, setState] = useState({});

  // Effect to update the state when `boardName` or `data` changes
  useEffect(() => {
    console.log(boardName+ " use effect " , data )
    if (data && data[boardName]) {
      setState(data[boardName]);
    }
  }, [data, boardName]);


  async function addTaskInDB(board){
      try{
        const resp = await axios.post(BASE_URL+'/addTask',board);
        console.log(resp);

      }
      catch(err){
        console.error("Error during adding task:", err);
      }
  }

  async function updateboard(board){
    try{
      const resp = await axios.post(BASE_URL+'/updateBoard',board);
      console.log(resp);

    }
    catch(err){
      console.error("Error during adding task:", err);
    }
  }

  // Function to add a new task
  const addTask = (columnId, taskContent, description, dueDate) => {
    const newTaskId = uuidv4();  // Generate unique task ID
    const newTask = {
      id: newTaskId,
      content: taskContent,
      description: description,
      dueDate: dueDate,
    };
  
    // Update the state with the new task
    setState((prevState) => {
      const newTaskIds = [...prevState.columns[columnId].taskIds, newTaskId];
      return {
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [newTaskId]: newTask,
        },
        columns: {
          ...prevState.columns,
          [columnId]: {
            ...prevState.columns[columnId],
            taskIds: newTaskIds,
          },
        },
      };
    });


    
    const newTaskIds = [...state.columns[columnId].taskIds, newTaskId];

    const boarddata = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          taskIds: newTaskIds,
        },
      },
    };

    addTaskInDB(boarddata)
    console.log(boarddata , data);
    onChange({...data , 
      [state._id] : boarddata}
      )
  };

  // Function to handle task editing
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  function onEdit(taskId) {
    setEditData(taskId);
    setEditMode(true);
  }

  function editColTitle(colId , newTitle){
  
     const currColObj = state.columns[colId];
     currColObj.title = newTitle;

    const newObj = {
      ...state,
      columns : {
        ...state.columns,
        [colId]: currColObj
      }
    }

    setState(newObj);

    onChange({...data , 
      [state._id] :  newObj}
      )
    updateboard(newObj);
      console.log(newObj);

  }

  function deleteColumn(colId) {
    const { [colId]: removed, ...remainingColumns } = state.columns;
    const newcolumnOrder = state.columnOrder;
    const inx= newcolumnOrder.findIndex(obj => obj === colId);
    if(inx!==-1){
      newcolumnOrder.splice(inx, 1);
    }

    const newObj = {
      ...state,
      columns: remainingColumns,
      columnOrder : newcolumnOrder
    };
  
    setState(newObj);
    onChange({...data , 
      [state._id] :  newObj}
      )
    updateboard(newObj);
   
    console.log(newObj);
  }
  
  

  // Function to handle task deletion
  function onDelete(taskId, columnId) {
    const newTasks = { ...state.tasks };
    delete newTasks[taskId];

    const newColumns = { ...state.columns };
    newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);

    setState({
      ...state,
      tasks: newTasks,
      columns: newColumns,
    });

    onChange({...data , 
      [state._id] : {
        ...state,
        tasks: newTasks,
        columns: newColumns,
      }}
      )
    updateboard({
      ...state,
      tasks: newTasks,
      columns: newColumns,
    });
    console.log("call for delete")
  }

  // Function to add a new column
  const addColumn = (columnTitle) => {
    const newColumnId = uuidv4();  // Generate unique column ID
    const newColumn = {
      id: newColumnId,
      title: columnTitle,
      taskIds: [],
    };

    // Update the state with the new column
    setState((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...prevState.columnOrder, newColumnId],
    }));

    const boardData = {
      ...state,
      columns: {
        ...state.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...state.columnOrder, newColumnId],
    }
    updateboard(boardData)
    console.log(state, boardData);
    onChange({...data , 
      [state._id] : boardData}
      )
    console.log(state);
  };

  // Drag and drop handlers
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart() {
    setIsDragging(true);
  }

  const onDragEnd = (result) => {
    setIsDragging(false);
    
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState((prevState) => ({
        ...prevState,
        columnOrder: newColumnOrder,
      }));

      const boardData = {
        ...state,
        columnOrder: newColumnOrder
      };

      updateboard(boardData);
      onChange({...data , 
        [state._id] : boardData}
        )
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setState((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          [start.id]: { ...start, taskIds: newTaskIds },
        },
      }));



      const boardData = {
        ...state,
        columns: {
          ...state.columns,
          [start.id]: { ...start, taskIds: newTaskIds },
        }
      };

      updateboard(boardData);
      onChange({...data , 
        [state._id] : boardData}
        )
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setState((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));

    const boardData = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    onChange({...data , 
      [state._id] : boardData}
      )
    updateboard(boardData);
  };

  // Render component
  return (
    <TaskContext.Provider value={{ state, setState, editMode, setEditMode, editData, setEditData, onEdit, onDelete , editColTitle , deleteColumn    }}>

    <BoardTitle title = {state.title} onTitleChange={updateboard}/>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <Board {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder?.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column?.taskIds.map((taskId) => state.tasks[taskId]);

                return (
                  <Draggable draggableId={column.id} index={index} key={column.id}>
                    {(provided) => (
                     <div style={{ transition: 'box-shadow 0.3s ease', boxShadow: 'none' , borderRadius : '10px'  }}
                     onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)'}
                     onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <Column column={column} tasks={tasks} />
                    <AddTaskModal onAdd={addTask} id={column.id} />
                  </div>
                </div>
                
                    )}
                  </Draggable>
                );
              })}
              <AddColumnModal onAdd={addColumn} drag={isDragging} />
              {provided.placeholder}
            </Board>
          )}
        </Droppable>
      </DragDropContext>
    </TaskContext.Provider>
  );
};

export default BoardsScreen;
