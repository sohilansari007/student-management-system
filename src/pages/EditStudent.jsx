import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EditStu.css'

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    course: 'React Development',
    city: '',
    address: '',
    enrollmentDate: '',
    status: 'Active'
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/students/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/students/${id}`, form)
      .then(() => navigate(-1))
      .catch(err => console.error(err));
  };

  const onCancel = () => navigate(-1);

  return (
    <>
      <main className="edit-student-page">
        <section className="edit-student-card">
          <header className="edit-student-header">
            <h1>Edit Student</h1>
            <p>Update the student information</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="edit-student-grid">
              <label className="form-field">
                <span>Full Name <b>*</b></span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Email <b>*</b></span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Phone <b>*</b></span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Age <b>*</b></span>
                <input
                  type="number"
                  name="age"
                  min="1"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Gender <b>*</b></span>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="form-field">
                <span>Course <b>*</b></span>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                >
                  <option>React Development</option>
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Data Science</option>
                  <option>B.Tech</option>
                  <option>BCA</option>
                  <option>MCA</option>
                  <option>BBA</option>
                  <option>MBA</option>
                </select>
              </label>

              <label className="form-field">
                <span>City <b>*</b></span>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Address <b>*</b></span>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Enrollment Date <b>*</b></span>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Status <b>*</b></span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>
            </div>

            <div className="edit-student-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="update-button">
                Update Student
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditStudent;
