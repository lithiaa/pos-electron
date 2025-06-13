import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>POS Dashboard</h1>
      <p>Welcome to your Point of Sale system</p>
    </div>
  );
}

function Sales() {
  return (
    <div className="sales">
      <h1>Sales</h1>
      <p>Sales transactions page</p>
    </div>
  );
}

function Products() {
  return (
    <div className="products">
      <h1>Products</h1>
      <p>Product management page</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}
