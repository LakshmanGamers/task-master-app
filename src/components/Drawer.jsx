import React from 'react';

import { Button, Drawer, IconButton, Box, Typography, useTheme, useMediaQuery ,List , ListItem ,ListItemText } from '@mui/material';


const DrawerComponent = ({
  open,
  onToggle,
  projects,
  currProject,
  onProjectClick,
  onShowModal
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerWidth = 240;

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onToggle}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 0,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ paddingLeft: 2, paddingTop: 2 }}
        >
          {currProject}
        </Typography>
        <List>
          {projects.map((project, index) => (
            <ListItem
              key={index}
              onClick={() => onProjectClick(index)}
              sx={{
                paddingLeft: 2,
                paddingTop: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemText primary={project} />
            </ListItem>
          ))}
        </List>
        <Button
          sx={{ paddingLeft: 2, paddingTop: 1 }}
          onClick={onShowModal}
        >
          Add Project
        </Button>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
