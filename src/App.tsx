import Login from "components/admin/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App
