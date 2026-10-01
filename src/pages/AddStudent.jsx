import React, { useState } from "react";
import "./AddStu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    course: "",
    city: "",
    address: "",
    enrollmentDate: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/students", newStudent)
      .then((res) => {
        navigate("/Student");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onCancel = () => {
    navigate("/Student");
  };

  return (
    <>
      <main className="add-student-page">
        <section className="add-student-card">
          <header className="add-student-header">
            <h1>Add New Student</h1>
            <p>Fill in the details to add a new student</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="add-student-grid">
              <label className="form-field">
                <span>Full Name <b>*</b></span>
                <input type="text" name="name" placeholder="Enter full name" value={newStudent.name} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Email <b>*</b></span>
                <input type="email" name="email" placeholder="Enter email address" value={newStudent.email} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Phone <b>*</b></span>
                <input type="tel" name="phone" placeholder="Enter phone number" value={newStudent.phone} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Age <b>*</b></span>
                <input type="number" name="age" placeholder="Enter age" value={newStudent.age} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Gender <b>*</b></span>
                <select name="gender" value={newStudent.gender} onChange={handleChange} required>
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="form-field">
                <span>Course <b>*</b></span>
                <select name="course" value={newStudent.course} onChange={handleChange} required>
                  <option value="" disabled>Select course</option>
                  <option value="React Development">React Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                </select>
              </label>

              <label className="form-field">
                <span>City <b>*</b></span>
                <input type="text" name="city" placeholder="Enter city" value={newStudent.city} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Address <b>*</b></span>
                <input type="text" name="address" placeholder="Enter address" value={newStudent.address} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Enrollment Date <b>*</b></span>
                <input type="date" name="enrollmentDate" value={newStudent.enrollmentDate} onChange={handleChange} required />
              </label>

              <label className="form-field">
                <span>Status <b>*</b></span>
                <select name="status" value={newStudent.status} onChange={handleChange} required>
                  <option value="" disabled>Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="add-student-actions">
              <button type="button" className="cancel-button" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Add Student
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddStudent;