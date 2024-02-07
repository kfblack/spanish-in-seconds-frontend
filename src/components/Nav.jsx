import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <NavLink to='/lesson/1'>Lesson 1</NavLink>
            <NavLink to='/lesson/2'>Lesson 2</NavLink>
            <NavLink to='/lesson/3'>Lesson 3</NavLink>
        </div>
    )
}

export default Nav