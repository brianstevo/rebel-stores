import './App.css'
import './Media.css'
// import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderResponsive from './utility/Header'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import LoginUser from './components/user/LoginUser'
import SignupUser from './components/user/SignupUser'
import Shipping from './components/Shipping'
import Payment from './components/Payment'
import PlaceOrder from './components/PlaceOrder'
import Order from './components/Order'
import Profile from './components/user/Profile'
import Users from './components/admin/Users'
import ProductList from './components/admin/products/ProductList'
import ViewProducts from './components/admin/products/ViewProducts'
import CreateProduct from './components/admin/products/CreateProduct'
import EditProduct from './components/admin/products/EditProduct'

function App() {
  return (
    <Router>
      <HeaderResponsive></HeaderResponsive>
      <main className='stickyGapMain'>
        <Routes>
          <Route path='/admin/products' element={<ProductList />} exact>
            <Route path='create' element={<CreateProduct />} exact />
            <Route path='edit' element={<EditProduct />} exact />
            <Route path='edit/:id' element={<EditProduct />} exact />

            <Route path='view' element={<ViewProducts />} exact />
            <Route index element={<ViewProducts />} exact />
          </Route>
          <Route path='/admin/users' element={<Users />} exact />
          <Route path='/profile' element={<Profile />} exact />
          <Route path='/order/:id' element={<Order />} exact />
          <Route path='/placeorder' element={<PlaceOrder />} exact />
          <Route path='/shipping' element={<Shipping />} exact />
          <Route path='/payment' element={<Payment />} exact />
          <Route path='/login' element={<LoginUser />} exact />
          <Route path='/signup' element={<SignupUser />} exact />
          <Route path='/cart' element={<Cart />} exact />
          <Route path='/product/:id' element={<ProductDetails />} exact />
          <Route path='/' element={<Home />} exact />
        </Routes>
      </main>
    </Router>
  )
}

export default App
