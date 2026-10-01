import React from 'react'
import Home from '../pages/Home'
import Student from '../pages/Student'
import AddStudent from '../pages/AddStudent'
import { Link } from 'react-router-dom'
import "./Navebar.css"

const Navebar = () => {
    return (
        <nav>
            <div>
                <img src="src/assets/logo.jpg" />
                <h1>Student Hub</h1>
            </div>

            <Link to="/">Home</Link>
            <Link to="/student">Student</Link>
            <Link to="/AddStudent">Add Student</Link>
            <Link to="/student/data">
                <div>
                    <img src="src/assets/prologo.jpg" />
                </div>
                Profile
            </Link>
        </nav>
    )
}

export default Navebar
