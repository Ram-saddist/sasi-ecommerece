import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Profile from './pages/Profile';
import Register from './pages/Register';
import AdminAddProduct from './pages/AdminAddProduct';
import ITTalk from './pages/ITTalk';
import Cart from './pages/Cart';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />

            <Route path="/ittalk" element={<ITTalk />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}


export default App