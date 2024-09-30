import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, Drawer, Box, useTheme, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TodoScreen from './TodoScreen';
import AddProjectModal from './TaskModal/AddProjectModal';
import { projectContext } from './MainScreen';
import BackgroundLetterAvatars from './BackgroundLetterAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import MenuAppBar from './Appbar';
import KanbanBoard from './Boards';
import BoardsScreen from './Boards/BoardsScreen';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, Collapse } from '@mui/material';
import axios from 'axios';
import AddBoardModal from './Boards/components/AddBoardModal';
import Loader from "./Loading";
import Error from "./Error";

export const BoardTitleContext = createContext();
const SideBar = (props) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { projects, addProject } = useContext(projectContext);
  const [boardItems, setBoardItems] = useState([]);
  const [currBoard, setCurrBoard] = useState("Home");
  const [boards, setBoards] = useState({});

  const [showBoard, setShowBoard] = useState(false);

  const handleCloseBoard = () => setShowBoard(false);

  const [showList, setShowList] = useState(false);

  const handleCloseList = () => setShowList(false);

  

  const [currCategory, setCurrCategory] = useState(true);
  const [groupByProjects, setgroupByProjects] = useState([]);

  const [currProject, setCurrProject] = useState("Inbox");

  useEffect(() => {

    const result = props.data.reduce((acc, item) => {
      if (!acc[item.project]) {
        acc[item.project] = [];
      }
      acc[item.project].push(item);
      return acc;
    }, {});
    //console.log(groupByProjects);
    setgroupByProjects(result);
  }, [props.data]);

  useEffect(() => {
    const proj = localStorage.getItem("cproj");
    if (proj) setCurrProject(proj);
    else
      localStorage.setItem("cproj", "Inbox");
  }, [])


  const BASE_URL = 'https://render-backend-ngn1.onrender.com/'


  const fetchBoards = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(BASE_URL + `getUsers/${uid}`);
      console.log(response.data);
      if (response.status === 200) {
        const reducedData = response.data.data.reduce((acc, item) => {
          acc[item._id] = item;
          return acc;
        }, {});
        setBoards(reducedData);
        const obj = Object.values(reducedData).map(board => ({
          id: board._id, // Ensure this is the correct field for ID
          name: board.name,
        }))
        setBoardItems(obj);
        
      
        const proj = localStorage.getItem("cboard");
        if (proj) setCurrBoard(proj);
        else setCurrBoard(response.data.homeId);
        
        setBoardLoaded(true)
      }
    } catch (err) {
      setCurrCategory(false);
      console.error("Error fetching boards", err);
    }
  };

  useEffect(() => {
    fetchBoards();
    console.log("Iam Called");
  }, []);


  

  const handleBoardClick = (id) => {
    const resultObj = boardItems.find(obj => obj.id === id);
    if (resultObj) {
      setCurrBoard(resultObj.id);
      localStorage.setItem('cboard', resultObj.id);
      setCurrCategory(true)
      setCurrProject("")
    }
  };





  function handleClick(id) {
    // navigate(`/app/${currProject}`);
    // setCurrProject(projects[index].name);
    const resultObj = Object.values(projects).find(obj => obj.id === id);

    setCurrProject(resultObj.name);
    setCurrBoard("");
    // console.log(resultObj.name);

    localStorage.setItem('cproj', resultObj.name);
    setCurrCategory(false);
    //console.log("curr project changed to "+ resultObj.name );
  }


  // const handleShow = () => setShow(true);

  function handleShowList() {
    setCurrCategory(false)
    setShowList(true);
    props.onOpen(false);
  }
  function handleShowBoard() {
    setCurrCategory(true)
    setShowBoard(true);
    props.onOpen(false);
  }

  const [openCategory1, setOpenCategory1] = useState(false);
  const [openCategory2, setOpenCategory2] = useState(false);

  const handleToggleCategory1 = () => {
    setOpenCategory1(!openCategory1);
  };

  const handleToggleCategory2 = () => {
    setOpenCategory2(!openCategory2);
  };

  const [isBoardLoaded, setBoardLoaded] = useState(false);

  const drawerWidth = 320;
  //console.log(currProject , groupByProjects )
  return (

    <Box sx={{
      display: 'flex', // Changed from 'relative' to 'fixed' to ensure proper stacking
    }}>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={props.open}

        sx={{
          position: 'fixed',
          top: 64,
          height: "100vh",
          width: props.open ? ((isMobile) ? 0 : drawerWidth) : 0,
          flexShrink: 0,
          zIndex: theme.zIndex.appBar - 1, // Ensures the Drawer is below the AppBar
          '& .MuiDrawer-paper': {
            height: "100%",
            position: 'relative',
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

          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleShow}
            sx={{ marginTop: 2, '&:hover': { backgroundColor: theme.palette.primary.main } }}
          >
            Add Project
          </Button> */}

          <List>
            <ListItemButton onClick={handleToggleCategory1}>
              <ListItemText primary="Boards" />
              {openCategory1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory1} timeout="auto" unmountOnExit>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowBoard}
                sx={{ marginTop: 2, '&:hover': { backgroundColor: theme.palette.primary.main }, marginBottom: 2 }}
              >
                Add Board
              </Button>
              <List component="div" disablePadding>
                {boardItems.map((project) => (
                  <ListItem
                    onClick={() => handleBoardClick(project.id)}
                    key={project.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: project.id === currBoard ? theme.palette.primary.light : theme.palette.action.hover,
                        borderRadius: 10,
                        cursor: 'pointer',
                      },
                      backgroundColor: project.id === currBoard ? theme.palette.primary.light : 'transparent',
                      color: project.id === currBoard ? "white" : "black",
                      borderRadius: 10,
                    }}
                  >
                    <ListItemText primary={project.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>

          <List>
            <ListItemButton onClick={handleToggleCategory2}>
              <ListItemText primary="Lists" />
              {openCategory1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategory2} timeout="auto" unmountOnExit>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowList}
                sx={{ marginTop: 2, '&:hover': { backgroundColor: theme.palette.primary.main }, marginBottom: 2 }}
              >
                Add Project
              </Button>
              <List component="div" disablePadding>
                {projects.map((project) => (
                  <ListItem
                    onClick={() => handleClick(project.id)}
                    key={project.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: project.name === currProject ? theme.palette.primary.light : theme.palette.action.hover,
                        borderRadius: 10,
                        cursor: 'pointer',

                      },
                      backgroundColor: project.name === currProject ? theme.palette.primary.light : 'transparent',
                      color: project.name === currProject ? "white" : "black",
                      borderRadius: 10,
                    }}
                  >
                    <ListItemText primary={project.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>




        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s',
          marginLeft: props.open ? 40 : 0,

          padding: 2,
          overflow: 'hidden',
          marginTop: 10
          ,
        }}
      >

        {currCategory ? (
          isBoardLoaded ? (
            <BoardTitleContext.Provider value={ { setBoardItems , boardItems}}>
              <BoardsScreen data={boards} onChange={setBoards} boardName={currBoard} />
              <AddBoardModal
                onAddTitle={setBoardItems}
                show={showBoard}
                onClose={handleCloseBoard}
                onAddBoard={setBoards}
              />
            </ BoardTitleContext.Provider>
          ) : (
            <Loader />
          )
        ) : (
          <>
            <TodoScreen
              data={groupByProjects}
              setData={setgroupByProjects}
              project={currProject}
            />
            <AddProjectModal
              show={showList}
              onClose={handleCloseList}
              onAdd={addProject}
            />
          </>
        )}

      </Box>
    </Box>
  );
};

export default SideBar;
