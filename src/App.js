
import { React } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import CartPage from './components/CartPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product';
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
