import NavBar from './NavBar'
import {useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Client from '../services/api.js'

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
            <h1>My Progress</h1>
            <h2>Lessons completed: </h2>
            {userData.progress && userData?.progress.map(prog => (
                <h1>{prog.title}</h1>
            ))}
        </div>
    )
}

export default Progress