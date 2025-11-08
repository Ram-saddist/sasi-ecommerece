import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'; 
import Register from './pages/Register';
import AdminAddProduct from './pages/AdminAddProduct';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="after-nav">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App