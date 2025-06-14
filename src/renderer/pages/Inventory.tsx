import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Edit,
  Eye,
  Download,
  Upload,
  Filter
} from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  lastRestocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  date: string;
  user: string;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Premium Coffee Beans',
      sku: 'COF-001',
      category: 'Beverages',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: 'kg',
      costPrice: 12.50,
      sellingPrice: 18.99,
      supplier: 'Coffee Co.',
      lastRestocked: '2024-06-10',
      status: 'in_stock'
    },
    {
      id: 2,
      name: 'Sandwich Bread',
      sku: 'BRD-001',
      category: 'Food',
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      unit: 'pcs',
      costPrice: 2.00,
      sellingPrice: 3.50,
      supplier: 'Bakery Plus',
      lastRestocked: '2024-06-12',
      status: 'low_stock'
    },
    {
      id: 3,
      name: 'Paper Cups',
      sku: 'CUP-001',
      category: 'Supplies',
      currentStock: 0,
      minStock: 100,
      maxStock: 500,
      unit: 'pcs',
      costPrice: 0.15,
      sellingPrice: 0.25,
      supplier: 'Supply Hub',
      lastRestocked: '2024-06-05',
      status: 'out_of_stock'
    },
    {
      id: 4,
      name: 'Fresh Milk',
      sku: 'MLK-001',
      category: 'Beverages',
      currentStock: 25,
      minStock: 10,
      maxStock: 40,
      unit: 'L',
      costPrice: 1.80,
      sellingPrice: 2.99,
      supplier: 'Dairy Farm',
      lastRestocked: '2024-06-13',
      status: 'in_stock'
    }
  ]);

  const [stockMovements] = useState<StockMovement[]>([
    {
      id: 1,
      productId: 1,
      productName: 'Premium Coffee Beans',
      type: 'in',
      quantity: 25,
      reason: 'Purchase order #PO-001',
      date: '2024-06-10',
      user: 'Admin'
    },
    {
      id: 2,
      productId: 2,
      productName: 'Sandwich Bread',
      type: 'out',
      quantity: 12,
      reason: 'Sale transaction',
      date: '2024-06-12',
      user: 'Cashier 1'
    },
    {
      id: 3,
      productId: 3,
      productName: 'Paper Cups',
      type: 'out',
      quantity: 50,
      reason: 'Sale transaction',
      date: '2024-06-11',
      user: 'Cashier 2'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustmentQuantity, setAdjustmentQuantity] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'movements'>('inventory');

  const categories = ['all', ...Array.from(new Set(inventory.map(item => item.category)))];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !adjustmentQuantity) return;

    const quantity = parseInt(adjustmentQuantity);
    const newStock = Math.max(0, selectedItem.currentStock + quantity);

    setInventory(inventory.map(item =>
      item.id === selectedItem.id
        ? {
            ...item,
            currentStock: newStock,
            status: newStock === 0 ? 'out_of_stock' :
                   newStock <= item.minStock ? 'low_stock' : 'in_stock'
          }
        : item
    ));

    setShowStockAdjustment(false);
    setSelectedItem(null);
    setAdjustmentQuantity('');
    setAdjustmentReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return <TrendingUp size={16} />;
      case 'low_stock': return <AlertTriangle size={16} />;
      case 'out_of_stock': return <TrendingDown size={16} />;
      default: return <Package size={16} />;
    }
  };

  const lowStockItems = inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock');
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0);

  return (
    <div className="inventory">
      {/* Header */}
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Track and manage your product inventory</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={20} />
            Export
          </button>
          <button className="btn-secondary">
            <Upload size={20} />
            Import
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowStockAdjustment(true)}
          >
            <Plus size={20} />
            Stock Adjustment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <h3>{inventory.length}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>{lowStockItems.length}</h3>
            <p>Low Stock Alerts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>${totalValue.toFixed(2)}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <Package size={20} />
          Inventory
        </button>
        <button
          className={`tab ${activeTab === 'movements' ? 'active' : ''}`}
          onClick={() => setActiveTab('movements')}
        >
          <TrendingUp size={20} />
          Stock Movements
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <>
          {/* Controls */}
          <div className="inventory-controls">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-select">
              <Filter size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min/Max</th>
                  <th>Unit Price</th>
                  <th>Total Value</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        <small>Supplier: {item.supplier}</small>
                      </div>
                    </td>
                    <td className="sku">{item.sku}</td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td>
                      <div className="stock-info">
                        <span className="current-stock">{item.currentStock} {item.unit}</span>
                      </div>
                    </td>
                    <td className="min-max">
                      <small>{item.minStock} - {item.maxStock}</small>
                    </td>
                    <td className="price">${item.costPrice.toFixed(2)}</td>
                    <td className="total-value">
                      ${(item.currentStock * item.costPrice).toFixed(2)}
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="action-btn view"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowStockAdjustment(true);
                          }}
                          title="Adjust Stock"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Stock Movements */}
          <div className="movements-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {stockMovements.map(movement => (
                  <tr key={movement.id}>
                    <td>{movement.date}</td>
                    <td>{movement.productName}</td>
                    <td>
                      <span className={`movement-type ${movement.type}`}>
                        {movement.type === 'in' ? <Plus size={16} /> : <Minus size={16} />}
                        {movement.type.toUpperCase()}
                      </span>
                    </td>
                    <td className={movement.type === 'in' ? 'quantity-in' : 'quantity-out'}>
                      {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                    </td>
                    <td>{movement.reason}</td>
                    <td>{movement.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Stock Adjustment Modal */}
      {showStockAdjustment && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Stock Adjustment</h2>
            {selectedItem && (
              <div className="selected-item">
                <h3>{selectedItem.name}</h3>
                <p>Current Stock: {selectedItem.currentStock} {selectedItem.unit}</p>
              </div>
            )}
            <form onSubmit={handleStockAdjustment}>
              <div className="form-group">
                <label>Adjustment Quantity:</label>
                <input
                  type="number"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(e.target.value)}
                  placeholder="Enter + or - quantity"
                  required
                />
                <small>Use negative numbers to decrease stock</small>
              </div>
              <div className="form-group">
                <label>Reason:</label>
                <textarea
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="Reason for adjustment..."
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Apply Adjustment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStockAdjustment(false);
                    setSelectedItem(null);
                    setAdjustmentQuantity('');
                    setAdjustmentReason('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
