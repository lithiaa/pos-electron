import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  Filter,
  Download,
  UserPlus
} from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  dateJoined: string;
  totalSpent: number;
  totalOrders: number;
  lastPurchase: string;
  loyaltyPoints: number;
  status: 'active' | 'inactive' | 'vip';
  notes: string;
}

interface CustomerTransaction {
  id: number;
  customerId: number;
  date: string;
  amount: number;
  items: number;
  paymentMethod: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      dateJoined: '2024-01-15',
      totalSpent: 1250.75,
      totalOrders: 18,
      lastPurchase: '2024-06-10',
      loyaltyPoints: 125,
      status: 'vip',
      notes: 'Prefers organic coffee'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0124',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      zipCode: '90210',
      dateJoined: '2024-03-22',
      totalSpent: 680.50,
      totalOrders: 12,
      lastPurchase: '2024-06-12',
      loyaltyPoints: 68,
      status: 'active',
      notes: 'Regular customer, visits every Tuesday'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1-555-0125',
      address: '789 Pine St',
      city: 'Chicago',
      zipCode: '60601',
      dateJoined: '2024-02-10',
      totalSpent: 120.25,
      totalOrders: 3,
      lastPurchase: '2024-05-15',
      loyaltyPoints: 12,
      status: 'inactive',
      notes: ''
    }
  ]);

  const [transactions] = useState<CustomerTransaction[]>([
    { id: 1, customerId: 1, date: '2024-06-10', amount: 45.99, items: 3, paymentMethod: 'Credit Card' },
    { id: 2, customerId: 1, date: '2024-06-08', amount: 28.50, items: 2, paymentMethod: 'Cash' },
    { id: 3, customerId: 2, date: '2024-06-12', amount: 32.75, items: 4, paymentMethod: 'Debit Card' },
    { id: 4, customerId: 2, date: '2024-06-09', amount: 15.99, items: 1, paymentMethod: 'Cash' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const statuses = ['all', 'active', 'inactive', 'vip'];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerData = {
      ...formData,
      dateJoined: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      totalOrders: 0,
      lastPurchase: '',
      loyaltyPoints: 0,
      status: 'active' as const
    };

    if (editingCustomer) {
      setCustomers(customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...editingCustomer, ...formData }
          : customer
      ));
      setEditingCustomer(null);
    } else {
      const newCustomer = {
        ...customerData,
        id: Math.max(...customers.map(c => c.id)) + 1
      };
      setCustomers([...customers, newCustomer]);
    }

    setFormData({ name: '', email: '', phone: '', address: '', city: '', zipCode: '', notes: '' });
    setShowAddModal(false);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      zipCode: customer.zipCode,
      notes: customer.notes
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingCustomer(null);
    setFormData({ name: '', email: '', phone: '', address: '', city: '', zipCode: '', notes: '' });
  };

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const customerTransactions = selectedCustomer
    ? transactions.filter(t => t.customerId === selectedCustomer.id)
    : [];

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const vipCustomers = customers.filter(c => c.status === 'vip').length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);

  return (
    <div className="customers">
      {/* Header */}
      <div className="customers-header">
        <div>
          <h1>Customer Management</h1>
          <p>Manage your customer database and relationships</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={20} />
            Export
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus size={20} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{activeCustomers}</h3>
            <p>Active Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{vipCustomers}</h3>
            <p>VIP Customers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>${totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="customers-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <Filter size={20} />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Joined</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Loyalty Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-info">
                    <h4>{customer.name}</h4>
                    <small>{customer.email}</small>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="contact-item">
                      <Mail size={14} />
                      <span>{customer.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="location-info">
                    <MapPin size={14} />
                    <span>{customer.city}, {customer.zipCode}</span>
                  </div>
                </td>
                <td>{customer.dateJoined}</td>
                <td className="orders">{customer.totalOrders}</td>
                <td className="total-spent">${customer.totalSpent.toFixed(2)}</td>
                <td className="loyalty-points">{customer.loyaltyPoints}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(customer.status)}`}>
                    {customer.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="action-btn view"
                      onClick={() => viewCustomerDetails(customer)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(customer)}
                      title="Edit Customer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(customer.id)}
                      title="Delete Customer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes about the customer..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingCustomer ? 'Update' : 'Add'} Customer
                </button>
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="detail-header">
              <h2>{selectedCustomer.name}</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>

            <div className="detail-content">
              <div className="customer-details">
                <div className="detail-section">
                  <h3>Contact Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <Mail size={16} />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="detail-item">
                      <Phone size={16} />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{selectedCustomer.address}, {selectedCustomer.city} {selectedCustomer.zipCode}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>Joined: {selectedCustomer.dateJoined}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Purchase Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <ShoppingBag size={20} />
                      <div>
                        <h4>{selectedCustomer.totalOrders}</h4>
                        <p>Total Orders</p>
                      </div>
                    </div>
                    <div className="summary-item">
                      <DollarSign size={20} />
                      <div>
                        <h4>${selectedCustomer.totalSpent.toFixed(2)}</h4>
                        <p>Total Spent</p>
                      </div>
                    </div>
                    <div className="summary-item">
                      <Users size={20} />
                      <div>
                        <h4>{selectedCustomer.loyaltyPoints}</h4>
                        <p>Loyalty Points</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCustomer.notes && (
                  <div className="detail-section">
                    <h3>Notes</h3>
                    <p>{selectedCustomer.notes}</p>
                  </div>
                )}
              </div>

              <div className="transaction-history">
                <h3>Recent Transactions</h3>
                <div className="transactions-list">
                  {customerTransactions.length > 0 ? (
                    customerTransactions.map(transaction => (
                      <div key={transaction.id} className="transaction-item">
                        <div className="transaction-date">{transaction.date}</div>
                        <div className="transaction-details">
                          <span className="amount">${transaction.amount.toFixed(2)}</span>
                          <span className="items">{transaction.items} items</span>
                          <span className="payment">{transaction.paymentMethod}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-transactions">No transactions found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
