
import './App.css'
import Navebar from './components/Navebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import AddStudent from './pages/AddStudent'
import StudentDetails from './pages/StudentDetails'
import NotFound from './pages/NotFound'
import ViewStudent from './components/ViewStudent'
import EditStudent from './pages/EditStudent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Student' element={<Student />} />
          <Route path='AddStudent' element={<AddStudent />} />
          <Route path='student/data' element={<StudentDetails />} />
          <Route path='student/data/:id' element={<StudentDetails />} />
          <Route path='view/:id' element={<ViewStudent />} />
          <Route path='edit/:id' element={<EditStudent />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
