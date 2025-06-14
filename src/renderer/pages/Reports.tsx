import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Users,
  Package,
  ShoppingBag,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';

interface SalesData {
  date: string;
  sales: number;
  transactions: number;
}

interface ProductSales {
  name: string;
  quantity: number;
  revenue: number;
}

interface CategorySales {
  category: string;
  sales: number;
  percentage: number;
}

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'sales' | 'products' | 'customers' | 'inventory'>('sales');
  const [dateRange, setDateRange] = useState('week');

  // Sample data - in real app, this would come from your database
  const salesData: SalesData[] = [
    { date: '2024-06-07', sales: 1250.75, transactions: 45 },
    { date: '2024-06-08', sales: 980.50, transactions: 38 },
    { date: '2024-06-09', sales: 1180.25, transactions: 42 },
    { date: '2024-06-10', sales: 1450.00, transactions: 52 },
    { date: '2024-06-11', sales: 1320.75, transactions: 48 },
    { date: '2024-06-12', sales: 1680.25, transactions: 61 },
    { date: '2024-06-13', sales: 1580.50, transactions: 55 }
  ];

  const productSales: ProductSales[] = [
    { name: 'Premium Coffee', quantity: 156, revenue: 778.44 },
    { name: 'Sandwich', quantity: 89, revenue: 800.11 },
    { name: 'Pastry', quantity: 134, revenue: 469.00 },
    { name: 'Tea', quantity: 67, revenue: 267.33 },
    { name: 'Juice', quantity: 45, revenue: 269.55 }
  ];

  const categorySales: CategorySales[] = [
    { category: 'Beverages', sales: 3250.75, percentage: 45.2 },
    { category: 'Food', sales: 2890.50, percentage: 40.1 },
    { category: 'Snacks', sales: 750.25, percentage: 10.4 },
    { category: 'Others', sales: 298.50, percentage: 4.3 }
  ];

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
  const avgTransaction = totalSales / totalTransactions;
  const bestDay = salesData.reduce((max, day) => day.sales > max.sales ? day : max);

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: BarChart3 },
    { id: 'products', label: 'Product Report', icon: Package },
    { id: 'customers', label: 'Customer Report', icon: Users },
    { id: 'inventory', label: 'Inventory Report', icon: Activity }
  ];

  const SalesReport = () => (
    <div className="report-content">
      {/* Sales Overview */}
      <div className="report-section">
        <h3>Sales Overview</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>${totalSales.toFixed(2)}</h3>
              <p>Total Sales</p>
              <span className="stat-change positive">+12.5%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">
              <ShoppingBag size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalTransactions}</h3>
              <p>Total Transactions</p>
              <span className="stat-change positive">+8.2%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>${avgTransaction.toFixed(2)}</h3>
              <p>Avg. Transaction</p>
              <span className="stat-change positive">+4.1%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>${bestDay.sales.toFixed(2)}</h3>
              <p>Best Day ({bestDay.date})</p>
              <span className="stat-change positive">Peak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Sales Chart */}
      <div className="report-section">
        <h3>Daily Sales Trend</h3>
        <div className="chart-container">
          <div className="chart-placeholder">
            <LineChart size={48} />
            <p>Sales Chart Visualization</p>
            <div className="chart-data">
              {salesData.map((day, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="bar"
                    style={{ height: `${(day.sales / 2000) * 100}%` }}
                    title={`${day.date}: $${day.sales}`}
                  ></div>
                  <span className="bar-label">{day.date.split('-')[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="report-section">
        <h3>Sales by Category</h3>
        <div className="category-breakdown">
          {categorySales.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-info">
                <h4>{category.category}</h4>
                <p>${category.sales.toFixed(2)}</p>
              </div>
              <div className="category-bar">
                <div
                  className="bar-fill"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <span className="percentage">{category.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductReport = () => (
    <div className="report-content">
      <div className="report-section">
        <h3>Top Selling Products</h3>
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {productSales.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.revenue.toFixed(2)}</td>
                  <td>
                    <div className="performance-bar">
                      <div
                        className="performance-fill"
                        style={{ width: `${(product.quantity / 200) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-section">
        <h3>Product Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Best Performer</h4>
            <p>{productSales[0].name}</p>
            <span>{productSales[0].quantity} units sold</span>
          </div>
          <div className="metric-card">
            <h4>Highest Revenue</h4>
            <p>{productSales.reduce((max, p) => p.revenue > max.revenue ? p : max).name}</p>
            <span>${productSales.reduce((max, p) => p.revenue > max.revenue ? p : max).revenue.toFixed(2)}</span>
          </div>
          <div className="metric-card">
            <h4>Total Products Sold</h4>
            <p>{productSales.reduce((sum, p) => sum + p.quantity, 0)} units</p>
            <span>Across all products</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomerReport = () => (
    <div className="report-content">
      <div className="report-section">
        <h3>Customer Analytics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>247</h3>
              <p>Total Customers</p>
              <span className="stat-change positive">+15 new</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>189</h3>
              <p>Active Customers</p>
              <span className="stat-change positive">76.5%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>23</h3>
              <p>VIP Customers</p>
              <span className="stat-change positive">9.3%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>$67.50</h3>
              <p>Avg. Customer Value</p>
              <span className="stat-change positive">+$12.30</span>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3>Customer Segmentation</h3>
        <div className="segmentation-chart">
          <div className="segment">
            <h4>New Customers (30 days)</h4>
            <div className="segment-bar">
              <div className="segment-fill new" style={{ width: '25%' }}></div>
            </div>
            <span>25% (62 customers)</span>
          </div>
          <div className="segment">
            <h4>Regular Customers</h4>
            <div className="segment-bar">
              <div className="segment-fill regular" style={{ width: '60%' }}></div>
            </div>
            <span>60% (148 customers)</span>
          </div>
          <div className="segment">
            <h4>VIP Customers</h4>
            <div className="segment-bar">
              <div className="segment-fill vip" style={{ width: '15%' }}></div>
            </div>
            <span>15% (37 customers)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryReport = () => (
    <div className="report-content">
      <div className="report-section">
        <h3>Inventory Status</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <Package size={24} />
            </div>
            <div className="stat-content">
              <h3>156</h3>
              <p>Total Items</p>
              <span className="stat-change positive">In Stock</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow">
              <Activity size={24} />
            </div>
            <div className="stat-content">
              <h3>23</h3>
              <p>Low Stock</p>
              <span className="stat-change warning">Need Reorder</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>5</h3>
              <p>Out of Stock</p>
              <span className="stat-change negative">Critical</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <h3>$15,250</h3>
              <p>Inventory Value</p>
              <span className="stat-change positive">Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3>Inventory Turnover</h3>
        <div className="turnover-list">
          <div className="turnover-item">
            <h4>Fast Moving</h4>
            <p>Premium Coffee, Sandwiches, Tea</p>
            <span className="turnover-rate high">High Turnover</span>
          </div>
          <div className="turnover-item">
            <h4>Medium Moving</h4>
            <p>Pastries, Juice, Snacks</p>
            <span className="turnover-rate medium">Medium Turnover</span>
          </div>
          <div className="turnover-item">
            <h4>Slow Moving</h4>
            <p>Specialty Items, Merchandise</p>
            <span className="turnover-rate low">Low Turnover</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (activeReport) {
      case 'sales': return <SalesReport />;
      case 'products': return <ProductReport />;
      case 'customers': return <CustomerReport />;
      case 'inventory': return <InventoryReport />;
      default: return <SalesReport />;
    }
  };

  return (
    <div className="reports">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Comprehensive business insights and analytics</p>
        </div>
        <div className="header-actions">
          <div className="date-filter">
            <Calendar size={16} />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="btn-primary">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="report-nav">
        {reportTypes.map(report => (
          <button
            key={report.id}
            className={`report-tab ${activeReport === report.id ? 'active' : ''}`}
            onClick={() => setActiveReport(report.id as any)}
          >
            <report.icon size={20} />
            <span>{report.label}</span>
          </button>
        ))}
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default Reports;
