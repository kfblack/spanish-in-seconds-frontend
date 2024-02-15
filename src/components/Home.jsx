import React from 'react'
import NavBar from './NavBar'
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Paper } from '@mui/material';
import {Link} from 'react-router-dom'
import {useRef, useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';



const cultureImages = [
    { url: 'https://i.postimg.cc/4xTXxsDp/images.jpg', title: 'Spanish Dance', videoUrl: 'https://www.youtube.com/embed/cm9IYSDxagc', description: 'Traditional Spanish Flamenco dance, performed during the Flamenco Festival at the New York City Center!' },
    { url: 'https://i.postimg.cc/TwyPWQCb/download.jpg', title: 'Spanish Cuisine', videoUrl: 'https://www.youtube.com/embed/wLQFtcqSL0k', description: 'A comprehensive food tour, by Mark Wiens, in Madrid, Spain!'},
    { url: 'https://i.postimg.cc/sDC2vYSB/download-1.jpg', title: 'Historical Landmarks', videoUrl: 'https://www.youtube.com/embed/crUMhH-tfqA', description: 'A video by ROAD TRIP Spain, showing a comprehensive list of 30 famous monuments in Spain!'},
    { url: 'https://i.postimg.cc/fT7RXVj8/download-2.jpg', title: 'Spanish Art', videoUrl: 'https://www.youtube.com/embed/FHv_foVHugQ', description: 'A video made by Spanish BOLO, showcasing 7 of their best art museums found in Spain!' },
]

const Home = ({user, setUser}) => {

    const [openDialog, setOpenDialog] = useState(null)

    const clickSound = useRef(new Audio('../sounds/mixkit-quick-positive-video-game-notification-interface-265.wav'));

    const playClick = () => {
        clickSound.current.play()
    }

    const handleClickOpenDialog = (index) => {
        setOpenDialog(index)
    }

    const handleClickCloseDialog = () => {
        setOpenDialog(null)
    }


return (
    <div>
        <NavBar user={user} setUser={setUser}/>
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{marginTop: 5}}>
                Learn Spanish Quickly!
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
                Welcome to your guide to learning Spanish quickly, whether it is for your next big trip or your New Year's Resolution, we help you achieve your goals!
            </Typography>
            <Typography variant="body1" paragraph>
                Whether you are completely new, or took two classes in High School and cheated your way through, we aim to get you proficient in no time!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card onClick={handleClickOpenDialog}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://i.postimg.cc/yNMMvP7c/download.png"
                            alt="Spanish Culture"
                        />
                        <CardContent>
                            <Typography variant="h5" component="h3">
                                Why Learn Spanish?
                            </Typography>
                            <Typography variant="body2">
                                Discover the benefits of learning Spanish, from traveling with ease to opening up new career opportunities.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Dialog open={openDialog} onClose={handleClickCloseDialog}>
                    <DialogTitle>{"Why Learn Spanish?"}</DialogTitle>
                    <DialogContent>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/7QIdFk6yzh8"
                            title="11 Reasons Why You Should Learn Spanish - Olly Richards"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <DialogContentText>
                            Here's a video, by Olly Richards, on the importance of learning Spanish and all its' respective benefits!
                        </DialogContentText>
                    </DialogContent>
                    <Button onClick={handleClickCloseDialog}>Close</Button>
                </Dialog>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" component="h3">
                            Level Descriptions:
                        </Typography>
                        <li>Level 0 = Complete beginners could be successful</li>
                        <li>Level 1 = For new students comfortable with the bare essentials</li>
                        <li>Level 2 = For newer students that have a grasp on the basics</li>
                        <li>Level 3 = For a more "intermediate" student ready to step-up their game!</li>
                        <li>Level 4 = A confident and prepared student, with good background in Spanish fundamentals, ready to take on a challenge!</li>
                        <li>Level 5 = For someone with comprehensive background in the language, ready to reach conversational ability!</li>                    </Paper>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '40px' }}>
                    Explore Spanish Culture
            </Typography>
            <Grid container spacing={2}>
                {cultureImages.map((image, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card onClick={() => handleClickOpenDialog(index)} style={{ cursor: 'pointer'}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={image.url}
                                alt={image.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h4">
                                    {image.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {cultureImages.map((image, index) => (
                <Dialog open={openDialog === index} onClose={handleClickCloseDialog} key={index}>
                <DialogTitle>{image.title}</DialogTitle>
                    <DialogContent>
                        <iframe
                            width='560'
                            height='315'
                            src={image.videoUrl}
                            title={image.title}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                        <DialogContentText style={{ marginTop: '20px'}}>
                            {image.description}
                        </DialogContentText>
                    </DialogContent>
                    <Button onClick={handleClickCloseDialog}>Close</Button>
                </Dialog>
            ))}
            <Button onClick={playClick} component={Link} to="/lessons" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Start Your First Lesson
            </Button>
        </Container>
    </div>
);
}

export default Home