import { useParams } from "react-router-dom"
import "./style.scss"

const StudentDetailPage = () => {
  let { studentId } = useParams()
  
  return <>
    <p>Student ID: {studentId}</p>
  </>
}

export default StudentDetailPage
