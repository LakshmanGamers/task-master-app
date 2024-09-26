import React, { useEffect, useState } from 'react';
import { Button, Drawer, Box, List, ListItem, ListItemText, useTheme, useMediaQuery ,ListItemButton ,Collapse} from '@mui/material';
import BoardsScreen from './BoardsScreen';
import AddBoardModal from './components/AddBoardModal';
import axios from 'axios';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

axios.defaults.withCredentials = true;

const SideBarBoards = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [boardItems, setBoardItems] = useState([]);
  const [currBoard, setCurrBoard] = useState("board-1");
  const [boards, setBoards] = useState({});

  const [currProject, setCurrProject] = useState("board-1");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'https://render-backend-ngn1.onrender.com'

  const fetchBoards = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(BASE_URL+`/getUsers/${uid}`);
      if (response.status === 200) {
        const reducedData = response.data.reduce((acc, item) => {
          acc[item._id] = item;
          return acc;
        }, {});
        setBoards(reducedData);
        const obj = Object.values(reducedData).map(board => ({
          id: board._id, // Ensure this is the correct field for ID
          name: board.name,
        }))
        setBoardItems(obj);
        setCurrBoard(obj[0].id)
      }
    } catch (err) {
      console.error("Error fetching boards", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    const proj = localStorage.getItem("cboard");
    if (proj) setCurrBoard(proj);
    else localStorage.setItem("cboard", "board-1");
  }, []);

  const handleClick = (id) => {
    const resultObj = boardItems.find(obj => obj.id === id);
    if (resultObj) {
      setCurrProject(resultObj.id);
      localStorage.setItem('cproj', resultObj.id);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    props.onOpen(false);
  };
  

  const [openCategory1, setOpenCategory1] = useState(false);
  const [openCategory2, setOpenCategory2] = useState(false);

  // Toggles for the dropdowns
  const handleToggleCategory1 = () => {
    setOpenCategory1(!openCategory1);
  };

  const handleToggleCategory2 = () => {
    setOpenCategory2(!openCategory2);
  };

  const drawerWidth = 320;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={props.open}
        sx={{
          position: 'fixed',
          top: 64,
          height: "100vh",
          width: props.open ? (isMobile ? 0 : drawerWidth) : 0,
          flexShrink: 0,
          zIndex: theme.zIndex.appBar - 1,
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
          keepMounted: true,
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShow}
            sx={{ marginTop: 2 }}
          >
            Add Board
          </Button>
          <List>
          <ListItemButton onClick={handleToggleCategory1}>
            <ListItemText primary="Category 1" />
            {openCategory1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {boardItems.map((project) => (
              <ListItem
                onClick={() => handleClick(project.id)}
                key={project.id}
                sx={{
                  '&:hover': {
                    backgroundColor: project.id === currBoard ? theme.palette.primary.light : theme.palette.action.hover,
                    borderRadius: 10,
                    cursor: 'pointer',
                  },

                  backgroundColor: project.id === currBoard ? theme.palette.primary.light : 'transparent',
                  color: project.id === currProject ? "white" : "black",
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
            {boardItems.map((project) => (
              <ListItem
                onClick={() => handleClick(project.id)}
                key={project.id}
                sx={{
                  '&:hover': {
                    backgroundColor: project.id === currProject ? theme.palette.primary.light : theme.palette.action.hover,
                    borderRadius: 10,
                    cursor: 'pointer',
                  },
                  backgroundColor: project.id === currProject ? theme.palette.primary.light : 'transparent',
                  color: project.id === currProject ? "white" : "black",
                  borderRadius: 10,
                }}
              >
                <ListItemText primary={project.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s',
          marginLeft: props.open ? 40 : 0,
          padding: 2,
          overflow: 'hidden',
          marginTop: 10,
        }}
      >
        
            <BoardsScreen data={boards}   boardName={currProject} />
            <AddBoardModal onAddTitle={setBoardItems} show={show} onClose={handleClose} onAddBoard={setBoards} />
      
      </Box>
    </Box>
  );
};

export default SideBarBoards;
