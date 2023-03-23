import { Container } from "react-bootstrap"
import "./App.css"
import Home from "./components/Home"
import Header from "./utility/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetails from "./components/ProductDetails"
import Login from "./components/user/Login"
import Signup from "./components/user/Signup"
import Profile from "./components/user/Profile"
import Users from "./components/admin/Users"
import ProductList from "./components/admin/products/ProductList"
import CreateProduct from "./components/admin/products/CreateProduct"
import ViewProducts from "./components/admin/products/ViewProducts"
import Cart from "./components/Cart"
import Shipping from "./components/Shipping"
import Payment from "./components/Payment"
import PlaceOrder from "./components/PlaceOrder"

function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Routes>
            {/* <Route path="/admin/users" element={<Users />} exact> */}
            {/* <Route path="/users" element={<Users />} exact /> */}
            {/* </Route> */}
            <Route path="/admin/users" element={<Users />} exact />
            <Route path="/admin/products" element={<ProductList />} exact>
              <Route path="create" element={<CreateProduct />} exact />
              <Route path="edit/:id" element={<CreateProduct />} exact />
              <Route path="view" element={<ViewProducts />} exact />
              <Route index element={<ViewProducts />} exact />
            </Route>
            <Route path="/login" element={<Login />} exact />
            <Route path="/cart" element={<Cart />} exact />
            <Route path="/shipping" element={<Shipping />} exact />
            <Route path="/payment" element={<Payment />} exact />
            <Route path="/placeorder" element={<PlaceOrder />} exact />
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
