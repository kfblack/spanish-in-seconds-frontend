import React from 'react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const NavBar = () => {
    const [state, setState] = useState({left: false})

    const iconMapping = {
        "Home": <HomeIcon />,
        "Lessons": <NewspaperIcon />,
        "My Progress": <CheckCircleIcon />,
        "New Lesson": <CreateNewFolderIcon />,
        "New Activity": <PlaylistAddIcon />,
        "New Quiz": <QuizIcon />
    }

    const pathMapping = {
        "Home": '/',
        "Lessons": '/lessons',
        "My Progress": '/progress',
        "New Lesson": '/create',
        "New Activity": '/createActivity',
        "New Quiz": '/createQuiz'
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Lessons', 'My Progress'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={RouterLink} to={pathMapping[text]}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['New Lesson', 'New Activity', 'New Quiz'].map((text, index) => (
                    <ListItem key={text} disablePadding> 
                        <ListItemButton component={RouterLink} to={pathMapping[text]}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position='static'>
                    <ToolBar>
                        <IconButton 
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx= {{ mr: 2}}
                        >
                        <div>
                            {['Menu'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button onClick={toggleDrawer(anchor, true)} sx={{ color: '#00c3ff' }}>{anchor}</Button>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Spanish in Seconds
                        </Link>
                        </Typography>
                        <Button component={Link} to='/register' color='inherit'>Sign Up</Button>
                        <Button component={Link} to='/signin' color='inherit'>Log In</Button>
                    </ToolBar>
                </AppBar>
            </Box>
        </div>
    )
}

export default NavBar