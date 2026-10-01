import React, { useEffect, useState } from 'react'
import "./HomeRight.css"
import axios from 'axios';


const HomeRight = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const response = await axios.get(
                "https://student-management-system-6sa1.onrender.com/students"
            );

            setData(response.data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    console.log(data);
    

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }
  return (
   <>
          <div className="recent-students">

              <div className="recent-header">
                  <h3>Recent Students</h3>
                  <span>View All</span>
              </div>

              <ul className="student-list">
                  {data.slice(0, 5).map((user) => (
                      <li className="student-item" key={user.id}>

                          <div className="student-info">
                              <div className="student-avatar">
                                  {user.name.charAt(0)}
                              </div>

                              <div className="student-details">
                                  <h4>{user.name}</h4>
                                  <span>{user.course}</span>
                              </div>
                          </div>

                          <b className={`student-status ${user.status?.toLowerCase()}`}>
                              {user.status}
                          </b>

                      </li>
                  ))}
              </ul>

          </div>
   
   </>
  )
}

export default HomeRight
