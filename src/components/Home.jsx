import React from 'react'
import NavBar from './NavBar'
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Paper } from '@mui/material';
import {Link} from 'react-router-dom'


const cultureImages = [
    { url: 'https://i.postimg.cc/4xTXxsDp/images.jpg', title: 'Spanish Dance' },
    { url: 'https://i.postimg.cc/TwyPWQCb/download.jpg', title: 'Spanish Cuisine' },
    { url: 'https://i.postimg.cc/sDC2vYSB/download-1.jpg', title: 'Historical Landmarks' },
    { url: 'https://i.postimg.cc/fT7RXVj8/download-2.jpg', title: 'Spanish Art' },
];

const Home = () => {

return (
    <div>
        <NavBar />
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Learn Spanish Quickly!
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
                Welcome to your guide to learning Spanish quickly for your next big trip!
            </Typography>
            <Typography variant="body1" paragraph>
                Whether you are completely new, or took 2 classes in High School and cheated your way through, we aim to get you proficient in no time!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
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
                        <Card>
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
            <Button component={Link} to="/lessons" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Start Your First Lesson
            </Button>
        </Container>
    </div>
);
}

export default Home