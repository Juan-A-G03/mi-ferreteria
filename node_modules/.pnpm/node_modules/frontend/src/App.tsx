import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Ticket } from './pages/Ticket';

export function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <NavLink to="/" end style={{ marginRight: '1rem' }}>Categorías</NavLink>
        <NavLink to="/cart" style={{ marginRight: '1rem' }}>Carrito</NavLink>
      </nav>
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:catId" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ticket/:id" element={<Ticket />} />
        </Routes>
      </div>
    </div>
  );
}
