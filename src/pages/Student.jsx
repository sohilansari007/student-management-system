import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Student.css";
import { Link, useNavigate } from "react-router-dom";
import DeleteAlert from "../components/DeleteAlert";

const API_URL = "http://localhost:3000/students";
const PAGE_SIZE = 10;

const Student = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Could not load students:", error);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  const courses = [...new Set(data.map((student) => student.course).filter(Boolean))];

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim();

    return data.filter((student) => {
      const matchesSearch = [
        student.name,
        student.email,
        student.course,
      ].some((value) => value?.toLowerCase().includes(query));

      const matchesCourse =
        !courseFilter || student.course === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [data, search, courseFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleStudents = filteredStudents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const deleteStudent = (student) => {
    setStudentToDelete(student);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      await axios.delete(`${API_URL}/${studentToDelete.id}`);
      setData((students) =>
        students.filter((item) => item.id !== studentToDelete.id)
      );
    } catch (error) {
      console.error("Could not delete student:", error);
      alert("Student could not be deleted.");
    } finally {
      setStudentToDelete(null);
    }
  };

  const viewStudent = (student) => {
    navigate(`/view/${student.id}`);
  };

  const editStudent = (student) => {
    navigate(`/edit/${student.id}`);
  };

  if (loading) {
    return <div className="student-loading">Loading students...</div>;
  }

  return (
    <main className="students-page">
      <header className="students-header">
        <div>
          <h1>Students</h1>
          <p>Manage all student records</p>
        </div>
        <Link to="/AddStudent">
          <button
            className="add-student-button"
          >
            + Add Student
          </button></Link>
      </header>

      <section className="students-toolbar">
        <input
          type="search"
          placeholder="Search by name, email, course or city..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          aria-label="Search students"
        />

        <select
          value={courseFilter}
          onChange={(event) => {
            setCourseFilter(event.target.value);
            setCurrentPage(1);
          }}
          aria-label="Filter by course"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          defaultValue=""
          aria-label="Sort students"
          onChange={(event) => {
            const direction = event.target.value;
            if (!direction) return;

            setData((students) =>
              [...students].sort((a, b) =>
                direction === "asc"
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name)
              )
            );
          }}
        >
          <option value="">Sort By</option>
          <option value="asc">Name: A to Z</option>
          <option value="desc">Name: Z to A</option>
        </select>
      </section>

      <div className="students-table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleStudents.length > 0 ? (
              visibleStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{startIndex + index + 1}</td>

                  <td>
                    <div className="student-name">
                      <span className="student-avatar">
                        {student.name?.charAt(0)?.toUpperCase() || "S"}
                      </span>
                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>{student.email}</td>
                  <td>{student.course}</td>

                  <td>
                    <span
                      className={`status-badge ${student.status?.toLowerCase() === "active"
                        ? "status-active"
                        : "status-inactive"
                        }`}
                    >
                      {student.status || "Unknown"}
                    </span>
                  </td>

                  <td>
                    <div className="student-actions">
                      <button
                        className="action-button view-button"
                        onClick={() => viewStudent(student)}
                      >
                        View
                      </button>
                      <button
                        className="action-button edit-button"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => deleteStudent(student)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: 0 }}>
                  <div className="empty-state-container">
                    <div className="empty-illustration">
                      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="80" r="70" fill="#f8fafc" />
                        <rect x="75" y="40" width="50" height="70" rx="4" fill="#3b82f6" />
                        <rect x="79" y="44" width="42" height="62" rx="2" fill="#ffffff" />
                        <rect x="85" y="55" width="30" height="4" rx="2" fill="#e2e8f0" />
                        <rect x="85" y="65" width="30" height="4" rx="2" fill="#e2e8f0" />
                        <rect x="85" y="75" width="20" height="4" rx="2" fill="#e2e8f0" />
                        <circle cx="65" cy="70" r="12" fill="#0f172a" />
                        <path d="M50 110C50 90 55 85 65 85C75 85 80 90 80 110" fill="#2563eb" />
                        <path d="M75 75 L 90 70" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="empty-heading">No students found.</h3>
                    <p className="empty-subtext">Start by adding your first student.</p>
                    <Link to="/AddStudent">
                      <button className="empty-add-button">+ Add Student</button>
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="students-footer">
        <span>
          Showing{" "}
          {filteredStudents.length === 0 ? 0 : startIndex + 1}-
          {Math.min(startIndex + PAGE_SIZE, filteredStudents.length)} of{" "}
          {filteredStudents.length} students
        </span>

        <nav className="pagination" aria-label="Student pages">
          <button
            disabled={page === 1}
            onClick={() => setCurrentPage(page - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === page ? "current-page" : ""}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setCurrentPage(page + 1)}
          >
            Next
          </button>
        </nav>
      </footer>
      {studentToDelete && (
        <DeleteAlert 
          onCancel={() => setStudentToDelete(null)} 
          onConfirm={confirmDelete} 
        />
      )}
    </main>
  );
};

export default Student;