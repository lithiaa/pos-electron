import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Download,
  Eye,
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ShoppingBag,
  User,
  Clock
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  customerName?: string;
  customerId?: number;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'mobile_payment';
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  cashier: string;
  receiptNumber: string;
  notes?: string;
}

interface TransactionItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      date: '2024-06-13',
      time: '14:30:25',
      customerName: 'John Smith',
      customerId: 1,
      items: [
        { productId: 1, productName: 'Premium Coffee', quantity: 2, unitPrice: 4.99, total: 9.98 },
        { productId: 2, productName: 'Croissant', quantity: 1, unitPrice: 3.50, total: 3.50 }
      ],
      subtotal: 13.48,
      tax: 1.35,
      discount: 0,
      total: 14.83,
      paymentMethod: 'credit_card',
      status: 'completed',
      cashier: 'Alice Johnson',
      receiptNumber: 'RCP-001',
      notes: 'Customer requested extra hot'
    },
    {
      id: 'TXN-002',
      date: '2024-06-13',
      time: '13:45:12',
      items: [
        { productId: 3, productName: 'Sandwich', quantity: 1, unitPrice: 8.99, total: 8.99 },
        { productId: 4, productName: 'Juice', quantity: 1, unitPrice: 3.99, total: 3.99 }
      ],
      subtotal: 12.98,
      tax: 1.30,
      discount: 1.30,
      total: 12.98,
      paymentMethod: 'cash',
      status: 'completed',
      cashier: 'Bob Wilson',
      receiptNumber: 'RCP-002'
    },
    {
      id: 'TXN-003',
      date: '2024-06-13',
      time: '12:15:08',
      customerName: 'Sarah Johnson',
      customerId: 2,
      items: [
        { productId: 1, productName: 'Premium Coffee', quantity: 3, unitPrice: 4.99, total: 14.97 }
      ],
      subtotal: 14.97,
      tax: 1.50,
      discount: 0,
      total: 16.47,
      paymentMethod: 'mobile_payment',
      status: 'completed',
      cashier: 'Alice Johnson',
      receiptNumber: 'RCP-003'
    },
    {
      id: 'TXN-004',
      date: '2024-06-12',
      time: '16:22:45',
      items: [
        { productId: 5, productName: 'Muffin', quantity: 2, unitPrice: 2.99, total: 5.98 }
      ],
      subtotal: 5.98,
      tax: 0.60,
      discount: 0,
      total: 6.58,
      paymentMethod: 'debit_card',
      status: 'refunded',
      cashier: 'Bob Wilson',
      receiptNumber: 'RCP-004',
      notes: 'Customer returned - quality issue'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const statusOptions = ['all', 'completed', 'pending', 'refunded', 'cancelled'];
  const paymentMethods = ['all', 'cash', 'credit_card', 'debit_card', 'mobile_payment'];
  const dateOptions = ['today', 'yesterday', 'week', 'month', 'custom'];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.customerName && transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      transaction.cashier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesPayment = selectedPaymentMethod === 'all' || transaction.paymentMethod === selectedPaymentMethod;

    // Simple date filtering (in real app, you'd want more sophisticated date handling)
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = transaction.date === '2024-06-13';
    } else if (dateFilter === 'yesterday') {
      matchesDate = transaction.date === '2024-06-12';
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const viewTransactionDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return '💵';
      case 'credit_card': return '💳';
      case 'debit_card': return '💳';
      case 'mobile_payment': return '📱';
      default: return '💰';
    }
  };

  // Calculate stats
  const totalTransactions = filteredTransactions.length;
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed').length;
  const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return (
    <div className="transactions">
      {/* Header */}
      <div className="transactions-header">
        <div>
          <h1>Transaction History</h1>
          <p>View and manage all sales transactions</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <RefreshCw size={20} />
            Refresh
          </button>
          <button className="btn-secondary">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-content">
            <h3>{totalTransactions}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>${totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{completedTransactions}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <CreditCard size={24} />
          </div>
          <div className="stat-content">
            <h3>${avgTransactionValue.toFixed(2)}</h3>
            <p>Avg. Transaction</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="transactions-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by ID, receipt, customer, or cashier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <CreditCard size={16} />
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method === 'all' ? 'All Payments' : method.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <Calendar size={16} />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              {dateOptions.map(option => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Cashier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>
                  <div className="transaction-id">
                    <strong>{transaction.id}</strong>
                    <small>{transaction.receiptNumber}</small>
                  </div>
                </td>
                <td>
                  <div className="datetime">
                    <div className="date">{transaction.date}</div>
                    <div className="time">{transaction.time}</div>
                  </div>
                </td>
                <td>
                  <div className="customer">
                    {transaction.customerName ? (
                      <div className="customer-info">
                        <User size={14} />
                        <span>{transaction.customerName}</span>
                      </div>
                    ) : (
                      <span className="walk-in">Walk-in Customer</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="items-summary">
                    <span className="item-count">{transaction.items.length} items</span>
                    <small>{transaction.items.reduce((sum, item) => sum + item.quantity, 0)} qty</small>
                  </div>
                </td>
                <td>
                  <div className="amount">
                    <strong>${transaction.total.toFixed(2)}</strong>
                    {transaction.discount > 0 && (
                      <small className="discount">-${transaction.discount.toFixed(2)}</small>
                    )}
                  </div>
                </td>
                <td>
                  <div className="payment-method">
                    <span className="payment-icon">{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                    <span>{transaction.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </td>
                <td>{transaction.cashier}</td>
                <td>
                  <div className="actions">
                    <button
                      className="action-btn view"
                      onClick={() => viewTransactionDetail(transaction)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="detail-header">
              <h2>Transaction Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>

            <div className="transaction-detail">
              <div className="detail-summary">
                <div className="summary-item">
                  <strong>Transaction ID:</strong> {selectedTransaction.id}
                </div>
                <div className="summary-item">
                  <strong>Receipt:</strong> {selectedTransaction.receiptNumber}
                </div>
                <div className="summary-item">
                  <strong>Date & Time:</strong> {selectedTransaction.date} {selectedTransaction.time}
                </div>
                <div className="summary-item">
                  <strong>Cashier:</strong> {selectedTransaction.cashier}
                </div>
                {selectedTransaction.customerName && (
                  <div className="summary-item">
                    <strong>Customer:</strong> {selectedTransaction.customerName}
                  </div>
                )}
              </div>

              <div className="items-detail">
                <h3>Items Purchased</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>${item.unitPrice.toFixed(2)}</td>
                        <td>${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="payment-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${selectedTransaction.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${selectedTransaction.tax.toFixed(2)}</span>
                </div>
                {selectedTransaction.discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount:</span>
                    <span>-${selectedTransaction.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${selectedTransaction.total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Payment Method:</span>
                  <span>
                    {getPaymentMethodIcon(selectedTransaction.paymentMethod)} {selectedTransaction.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Status:</span>
                  <span className={`status-badge ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedTransaction.notes && (
                <div className="transaction-notes">
                  <h3>Notes</h3>
                  <p>{selectedTransaction.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
