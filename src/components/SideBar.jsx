import React, { useContext, useEffect, useState } from 'react';
import { Button, Drawer, IconButton, Box, Typography, useTheme, useMediaQuery ,List , ListItem ,ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TodoScreen from './TodoScreen';
import AddProjectModal from './TaskModal/AddProjectModal';
import { projectContext } from './MainScreen';
import BackgroundLetterAvatars from './BackgroundLetterAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import MenuAppBar from './Appbar';

const SideBar = (props) => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 const {projects , addProject} = useContext(projectContext);

  
  console.log(props.data);
  const data = [
    {
      id : 1,
      heading : "task1",
      description : "1desc",
      dueDate : "2022-12-12",
      priority : "Priority 1",
      project : "Project1",
      completed : false,
      

    },
    {
      id : 2 , 
      heading : "task2",
      description : "2desc",
      dueDate : "2022-12-13",
      priority : "Priority 2",
      project : "Project2",
      completed : false
    },
    {
      id : 3,
      heading : "task3",
      description : "3desc",
      dueDate : "2022-12-14",
      priority : "Priority 3",
      project : "Project1",
      completed : false
    },{
      id : 4,
      heading : "task4",
      description : "4desc",
      dueDate : "2022-12-15",
      priority : "Priority 4",
      project : "Project2",
      completed : false
    }
  ];

  const [groupByProjects , setgroupByProjects] = useState([]);
  

  useEffect(()=>{
    const result = props.data.reduce((acc,item)=>{
      if(!acc[item.project]){
        acc[item.project] = [];
      }
      acc[item.project].push(item);
      return acc;
    },{});
    console.log(groupByProjects);
    setgroupByProjects(result);
  },[ props.data]);
  
 




  const [ currProject , setCurrProject ] = useState("Inbox");
  // const {project} = useParams();
 
  
  function handleClick(id){
    // navigate(`/app/${currProject}`);
    // setCurrProject(projects[index].name);
    const resultObj = Object.values(projects).find(obj => obj.id === id);

    setCurrProject(resultObj.name);
    console.log("curr project changed to "+ resultObj.name );
  }
  
  const [show ,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const drawerWidth = 320;
console.log(currProject , groupByProjects )
  return (
    
    <Box sx={{ display: 'flex', // Changed from 'relative' to 'fixed' to ensure proper stacking
       }}>
    
        {/* Sidebar */}
        <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={props.open}
        
        sx={{
          position : 'fixed',
          top : 64,
          height : "100vh",
          width: props.open ? drawerWidth : 0,
          flexShrink: 0,
          zIndex: theme.zIndex.appBar - 1, // Ensures the Drawer is below the AppBar
          '& .MuiDrawer-paper': {
            height : "100%" , 
            position : 'relative',
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            overflowX: 'hidden',
            backgroundColor: theme.palette.background.default,
          },
        }}
        ModalProps={{
          keepMounted: true, // Better props.open performance on mobile.
        }}
      >

        <Box sx={{ padding: 2 }}>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleShow}
            sx={{ marginTop: 2  ,  '&:hover': { backgroundColor : theme.palette.primary.main } }}
          >
            Add Project
          </Button>
          <List>
            {projects.map((project) => (
              <ListItem
                onClick={() => handleClick(project.id)}
                key={project.id}
                sx={{
                  '&:hover': {
                    backgroundColor: project.name === currProject ? theme.palette.primary.light :  theme.palette.action.hover,
                    borderRadius: 10,
                    cursor: 'pointer',
                    
                  },
                  backgroundColor: project.name === currProject ? theme.palette.primary.light : 'transparent',
                  color : project.name === currProject ? "white" : "black",
                  borderRadius: 10,
                }}
              >
                <ListItemText primary={project.name}  />
              </ListItem>
            ))}
          </List>
         
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s',
          marginLeft: props.open ? 3 : 0,
        
          padding: 2,
          overflow: 'hidden',
          marginTop : 10
        ,
        }}
      >
         {/* <IconButton
          onClick={handleToggleDrawer}
          sx={{
            position: 'absolute',
            top: 16,
            left: props.open ? 250 : 64,
            transition : 'left 0.3s',
            zIndex: 1201, // Ensure it's above the drawer
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          aria-label={props.open ? "close sidebar" : "open sidebar"}
        >
          <MenuIcon />
        </IconButton> */}
       
        

        <TodoScreen data={groupByProjects} setData={setgroupByProjects} project={currProject}/>
        <AddProjectModal show={show} onClose={handleClose} onAdd={addProject}/>
      </Box>
    </Box>
  );
};

export default SideBar;
