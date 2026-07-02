import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Signup from "./pages/auth/signup"
import Login from "./pages/auth/login"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
