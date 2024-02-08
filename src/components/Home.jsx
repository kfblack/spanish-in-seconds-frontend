import React from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar'
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


const Home = () => {

    const [state, setState] = useState({left: false})

    const iconMapping = {
        "Home": <HomeIcon />,
        "Lessons": <NewspaperIcon />,
        "My Progress": <CheckCircleIcon />,
        "New Lesson": <CreateNewFolderIcon />,
        "New Activity": <PlaylistAddIcon />,
        "New Quiz": <QuizIcon />
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
                        <ListItemButton>
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
                        <ListItemButton>
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
                            Spanish in Seconds!
                        </Typography>
                        <Button color='inherit'><Link to='/register'>Sign Up</Link></Button>
                        <Button color='inherit'><Link to='/signin'>Log In</Link></Button>
                    </ToolBar>
                </AppBar>
            </Box>
            <h2>Welcome to your guide to learning Spanish quickly for your next big trip! Whether you are completly new, or took 2  classes in High School and cheated your way through, we aim to get you proficient in no time!</h2>
            <h3>Level Descriptions: </h3>
            Note that with every lesson, comes "Levels" that signify what degree of difficulty each lesson contains. As a reference: 
            <ul>
                <li>Level 0 = Complete beginners could be successful</li>
                <li>Level 1 = For new students comfortable with the bare essentials</li>
                <li>Level 2 = For newer students that have a grasp on the basics</li>
                <li>Level 3 = For a more "intermediate" student ready to step-up their game!</li>
                <li>Level 4 = A confident and prepared student, with good background in Spanish fundamentals, ready to take on a challenge!</li>
                <li>Level 5 = For someone with comprehensive background in the language, ready to reach conversational ability!</li>
            </ul>
            <Sidebar /> 
        </div>
    )
}

export default Home