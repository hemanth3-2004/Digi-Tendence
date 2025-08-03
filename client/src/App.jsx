import React, { useState } from "react"
import LoginPage from "./components/Authentication/LoginPage";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
function App() {
  const [teacher,setNewTeacher] = useState(false);
  const [student,setNewStudent] = useState(false);
  const [loggedInUser,setLoggedInUser] = useState(null);

  const handleLoginSuccess = (studentData)=> {
    setLoggedInUser(studentData);
  }
  return (
    <>
      <div className="font-outfit">
        {!teacher && !student  ? 
        (<LoginPage setNewStudent={setNewStudent} setNewTeacher={setNewTeacher} onLoginSuccess={handleLoginSuccess}/>

        ) : null}
        {teacher && <TeacherDashboard loggedInUser={loggedInUser}/>}
        {student && <StudentDashboard loggedInUser={loggedInUser}/>}
       
      </div>
    </>
  )
}

export default App
