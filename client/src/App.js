import { Container } from "react-bootstrap"
import "./App.css"
import Home from "./components/Home"
import Header from "./utility/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetails from "./components/ProductDetails"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Users from "./components/Users"

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/admin" element={<Users />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/" element={<Home />} exact />
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App
