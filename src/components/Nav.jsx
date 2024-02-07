import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <NavLink to='/lessons/1'>Lesson 1</NavLink>
            <NavLink to='/lessons/2'>Lesson 2</NavLink>
            <NavLink to='/lessons/3'>Lesson 3</NavLink>
        </div>
    )
}

export default Nav