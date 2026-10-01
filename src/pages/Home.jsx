import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"
import { Link } from 'react-router-dom';
import HomeRight from '../components/HomeRight';
import HomeLeft from '../components/HomeLeft';

// Single-file combined component + styles to satisfy compilation requirements
function Home() {
    const [studentsCount, setStudentsCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [activePercent, setActivePercent] = useState(0);
    const [inactivePercent, setInactivePercent] = useState(0);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/students"
            );

            const students = response.data;
            setData(students);
            setStudentsCount(students.length);
            const active = students.filter(student => student.status === 'Active').length;
            const inactive = students.filter(student => student.status === 'Inactive').length;
            
            setActiveCount(active);
            setInactiveCount(inactive);
            
            if (students.length > 0) {
                setActivePercent(Math.round((active / students.length) * 100));
                setInactivePercent(Math.round((inactive / students.length) * 100));
            }
            
            const uniqueCourses = new Set(students.map(student => student.course).filter(Boolean));
            setTotalCourses(uniqueCourses.size);
            
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getUser();
    }, []);
    

    return (
        <>
            <div className="home-container">
                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="banner-content">
                        <div className="banner-text">
                            <h1>Welcome to StudentHub!</h1>
                            <p>Manage your students efficiently and easily.</p>
                            <Link to="AddStudent">
                            <button
                                className="add-student-btn"

                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Add Student
                            </button></Link>
                        </div>
                        <div className="banner-illustration">
                            <div className="illustration-gradient-overlay"></div>
                            <div className="books-graphic">
                                <div className="grad-cap">
                                    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                                </div>
                                <div className="book book-1"></div>
                                <div className="book book-2"></div>
                                <div className="book book-3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards Grid */}
                <div className="stats-grid">
                    {/* Card 1: Total Students */}
                    <div className="stat-card stat-blue">
                        <div className="stat-header">
                            <span className="stat-title">Total Students</span>
                            <div className="stat-icon-wrapper blue-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                        </div>
                        <div className="stat-body">
                            <h2 className="stat-value">{studentsCount}</h2>
                            <div className="stat-badge blue-badge">
                                <span>Live</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Active Students */}
                    <div className="stat-card stat-green">
                        <div className="stat-header">
                            <span className="stat-title">Active Students</span>
                            <div className="stat-icon-wrapper green-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                            </div>
                        </div>
                        <div className="stat-body">
                            <h2 className="stat-value">{activeCount}</h2>
                            <div className="stat-badge green-badge">
                                <span>{activePercent}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Inactive Students */}
                    <div className="stat-card stat-red">
                        <div className="stat-header">
                            <span className="stat-title">Inactive Students</span>
                            <div className="stat-icon-wrapper red-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
                            </div>
                        </div>
                        <div className="stat-body">
                            <h2 className="stat-value">{inactiveCount}</h2>
                            <div className="stat-badge red-badge">
                                <span>{inactivePercent}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Total Courses */}
                    <div className="stat-card stat-purple">
                        <div className="stat-header">
                            <span className="stat-title">Total Courses</span>
                            <div className="stat-icon-wrapper purple-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            </div>
                        </div>
                        <div className="stat-body">
                            <h2 className="stat-value">{totalCourses}</h2>
                            <div className="stat-badge purple-badge">
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-panels" >
                    <HomeLeft/>
                    <HomeRight />
                </div>
            </div>

        </>
    );
};
export default Home