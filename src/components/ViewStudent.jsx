import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import DeleteAlert from './DeleteAlert'
import "./View.css"


const ViewStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [isDeleting, setIsDeleting] = useState(false);

    const details = [
        { icon: "✉", label: "Email", value: student.email },
        { icon: "☎", label: "Phone", value: student.phone },
        { icon: "♟", label: "Age", value: student.age },
        { icon: "♙", label: "Gender", value: student.gender },
        { icon: "▣", label: "Course", value: student.course },
        { icon: "⌖", label: "City", value: student.city },
        { icon: "⌖", label: "Address", value: student.address },
        { icon: "◷", label: "Enrollment Date", value: student.enrollmentDate },
    ];
    const onCancel = () => navigate(-1);

    useEffect(() => {
        axios
            .get("https://student-management-system-6sa1.onrender.com/students/" + id)
            .then((res) => setStudent(res.data))
            .catch((err) => console.error(err));
    }, [id])

    const onBack = () => navigate(-1);
    const onEdit = () => navigate(`/edit/${id}`);
    const onDelete = () => setIsDeleting(true);
    const handleConfirmDelete = async () => {
        try {
            await axios.delete("https://student-management-system-6sa1.onrender.com/students/" + id);
            navigate('/Student');
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <>
          <main className="student-details-page">
              <header className="details-header">
                  <h1>Student Details</h1>
                  <button className="back-button" onClick={onBack}>
                      ← <span>Back to Students</span>
                  </button>
              </header>

              <section className="details-card">
                  <div className="profile-header">
                      <div className="profile-avatar" aria-hidden="true">
                          👨🏻‍💼
                      </div>

                      <div className="profile-heading">
                          <div className="name-status">
                              <h2>{student.name || "Student Name"}</h2>
                              <span
                                  className={`detail-status ${student.status?.toLowerCase() === "active" ? "active" : ""
                                      }`}
                              >
                                  {student.status || "Active"}
                              </span>
                          </div>
                          <p>{student.course || "Course not specified"}</p>
                      </div>
                  </div>

                  <div className="details-list">
                      {details.map(({ icon, label, value }) => (
                          <div className="detail-row" key={label}>
                              <span className="detail-icon" aria-hidden="true">
                                  {icon}
                              </span>
                              <span className="detail-label">{label}</span>
                              <span className="detail-value">{value || "—"}</span>
                          </div>
                      ))}
                  </div>

                  <div className="details-actions">
                      <button className="edit-student-button" onClick={onCancel}  >Cancal</button>
                      <button className="edit-student-button" onClick={onEdit}>
                          ✎ Edit Student
                      </button>
                      <button className="delete-student-button" onClick={onDelete}>
                          Delete Student
                      </button>
                     
                  </div>
              </section>
          </main>
          {isDeleting && (
              <DeleteAlert 
                  onCancel={() => setIsDeleting(false)} 
                  onConfirm={handleConfirmDelete} 
              />
          )}
    
    </>
  )
}

export default ViewStudent
