import React from 'react'
import NavBar from './NavBar'


const Home = () => {

    return (
        <div>
            <NavBar />
        <div>
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
        </div>
        </div>
    )
}

export default Home