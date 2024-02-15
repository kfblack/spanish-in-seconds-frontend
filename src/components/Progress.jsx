import NavBar from './NavBar'
import {useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Client from '../services/api.js'
import {Card, CardContent, Box, Container, Typography} from '@mui/material'

const Progress = ({user, setUser}) => {


    const [userData, setUserData] = useState({})



    let {userId} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            let res = await Client.get(`/auth/user/${userId}`)
            setUserData(res.data)
        }
        fetchUser();
    }, [user])

    return (
        <div>
            <NavBar user={user} setUser={setUser}/>
            <Container>
                <Typography variant='h6' component='h1' gutterBottom sx={{marginTop: '10px'}}><h2>Lessons Completed</h2></Typography>
                <Box>
                    {userData.progress && userData?.progress.map((prog, index) => (
                        <Card key={index} sx={{ mb: 2}}>
                            <CardContent>
                                <Typography variant='h6'>Level: {prog.level}</Typography>
                                <Typography variant='h5'>Title: {prog.title}</Typography>
                                <Typography variant='boyd1'>Description: {prog.description}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </div>
    )
}

export default Progress