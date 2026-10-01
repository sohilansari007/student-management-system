import React from 'react'
import "./HomeLeft.css"

const HomeLeft = () => {
  return (
    <>
          <div className="course-card">

              <h3>Course Distribution</h3>

              <div className="course-content">

                  <div className="course-circle">
                      <strong>20</strong>
                      <span>Total Students</span>
                  </div>

                  <div className="course-list">

                      <div className="course-item">
                          <span className="dot react"></span>
                          <span>React Development</span>
                          <b>6</b>
                      </div>

                      <div className="course-item">
                          <span className="dot node"></span>
                          <span>Node.js Development</span>
                          <b>4</b>
                      </div>

                      <div className="course-item">
                          <span className="dot python"></span>
                          <span>Python Development</span>
                          <b>3</b>
                      </div>

                      <div className="course-item">
                          <span className="dot fullstack"></span>
                          <span>Full Stack Development</span>
                          <b>3</b>
                      </div>

                      <div className="course-item">
                          <span className="dot java"></span>
                          <span>Java Development</span>
                          <b>2</b>
                      </div>

                      <div className="course-item">
                          <span className="dot web"></span>
                          <span>Web Development</span>
                          <b>2</b>
                      </div>

                  </div>

              </div>

          </div>
    </>
  )
}

export default HomeLeft
