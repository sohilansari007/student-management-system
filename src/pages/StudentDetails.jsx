import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./StuDet.css";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all students when component mounts
  useEffect(() => {
    axios.get("https://student-management-system-6sa1.onrender.com/students")
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch students", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading student details...</div>;
  }

  // 2. Find the current student index based on the ID in URL
  const currentIndex = id ? students.findIndex(s => String(s.id) === String(id)) : 0;
  const student = students[currentIndex];
  
  // 3. Find the next student (if available)
  const nextStudent = students[currentIndex + 1];

  // 4. Handle if student ID is invalid or deleted
  if (!student) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
        <h2>Student Not Found</h2>
        <p>The student you are looking for does not exist.</p>
        <Link to="/Student" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Go back to Students list
        </Link>
      </div>
    );
  }

  const details = [
    { icon: "✉", label: "Email", value: student.email },
    { icon: "☎", label: "Phone", value: student.phone },
    { icon: "♟", label: "Age", value: student.age },
    { icon: "⚥", label: "Gender", value: student.gender },
    { icon: "▣", label: "Course", value: student.course },
    { icon: "⌖", label: "City", value: student.city },
    { icon: "⌖", label: "Address", value: student.address },
    { icon: "◷", label: "Enrollment Date", value: student.enrollmentDate },
  ];

  const isActive = (student.status || "Active").toLowerCase() === "active";

  // Actions
  const onBack = () => navigate('/Student');
  const onEdit = () => navigate(`/edit/${student.id}`);
  
  const onDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${student.name}?`)) return;
    try {
      await axios.delete(`https://student-management-system-6sa1.onrender.com/students/${student.id}`);
      navigate('/Student');
    } catch (err) {
      console.error(err);
      alert("Failed to delete student");
    }
  };

  // Next Student navigation
  const handleNext = () => {
    if (nextStudent) {
      navigate(`/student/data/${nextStudent.id}`);
    }
  };

  return (
    <>
      <main className="student-profile-page">
        <section className="student-profile-card">
          <button className="student-back-button" onClick={onBack} type="button">
            ← <span>Back to Students</span>
          </button>

          <header className="student-profile-header">
            <div className="student-avatar-wrap">
              {student.profileImage || student.image ? (
                <img
                  className="student-avatar"
                  src={student.profileImage || student.image}
                  alt={`${student.name || "Student"} profile`}
                />
              ) : (
                <div className="student-avatar student-avatar-placeholder">
                  {(student.name || "S").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="student-heading">
              <div className="student-name-row">
                <h1>{student.name || "Student Name"}</h1>
                <span className={`student-status ${isActive ? "is-active" : ""}`}>
                  <span className="status-dot" />
                  {student.status || "Active"}
                </span>
              </div>
              <p>{student.department || student.course || "Course not specified"}</p>
            </div>
          </header>

          <div className="student-section-heading">
            <h2>Personal Information</h2>
            <span>Student details</span>
          </div>

          <div className="student-details-grid">
            {details.map(({ icon, label, value }) => (
              <div className="student-detail" key={label}>
                <span className="student-detail-icon" aria-hidden="true">
                  {icon}
                </span>
                <div className="student-detail-text">
                  <span className="student-detail-label">{label}</span>
                  <span className="student-detail-value">{value || "—"}</span>
                </div>
              </div>
            ))}
          </div>

          <footer className="student-profile-actions">
            <button
              className="student-edit-button"
              type="button"
              onClick={onEdit}
            >
              <span aria-hidden="true">✎</span> Edit Student
            </button>
            <button
              className="student-delete-button"
              type="button"
              onClick={onDelete}
            >
              <span aria-hidden="true">⌫</span> Delete Student
            </button>
            {/* New Next Student Button */}
            <button
              className="student-next-button"
              type="button"
              onClick={handleNext}
              disabled={!nextStudent}
            >
              {nextStudent ? "Next Student →" : "No More Students"}
            </button>
          </footer>
        </section>
      </main>
    </>
  )
}

export default StudentDetails;
