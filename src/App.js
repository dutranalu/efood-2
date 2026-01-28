import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil/:id" element={<Profile />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/entrega" element={<Delivery />} />
      <Route path="/pagamento" element={<Payment />} />
      <Route path="/confirmacao" element={<Confirmation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
