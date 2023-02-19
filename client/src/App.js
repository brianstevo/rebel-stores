import { Container } from "react-bootstrap"
import "./App.css"
import Home from "./components/Home"
import Header from "./utility/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetails from "./components/ProductDetails"

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App
