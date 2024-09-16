import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import TodoScreen from './TodoScreen';
import AddProjectModal from './TaskModal/AddProjectModal';
import { Button, Drawer, IconButton, Box, Typography, useTheme, useMediaQuery ,List , ListItem ,ListItemText } from '@mui/material';

const MainContent = ({
  open,
  groupByProjects,
  currProject,
  show,
  onClose,
  onAdd,
  onToggleDrawer
}) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        transition: 'margin 0.3s',
        marginLeft: open ? 240 : 0,
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={onToggleDrawer}
        sx={{
          position: 'absolute',
          top: 16,
          left: open ? 190 : 16,
          transition: 'left 0.3s',
          zIndex: 1201,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        aria-label={open ? "close sidebar" : "open sidebar"}
      >
        <MenuIcon />
      </IconButton>

      <TodoScreen data={groupByProjects} project={currProject} />
      <AddProjectModal show={show} onClose={onClose} onAdd={onAdd} />
    </Box>
  );
};

export default MainContent;
