import React, { useState } from 'react';
import {
  User,
  Store,
  CreditCard,
  Receipt,
  Shield,
  Bell,
  Palette,
  Database,
  Wifi,
  Printer,
  Save,
  RotateCcw,
  Settings as SettingsIcon,
  Users,
  DollarSign,
  FileText,
  Monitor,
  Upload,
  Moon,
  Sun,
  Volume2,
  Lock,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier';
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface TaxRate {
  id: number;
  name: string;
  rate: number;
  isDefault: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Lithia POS Store',
    storeAddress: '123 Main Street, City, State 12345',
    storePhone: '+1 (555) 123-4567',
    storeEmail: 'info@lithiapos.com',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en'
  });

  // Receipt Settings
  const [receiptSettings, setReceiptSettings] = useState({
    showLogo: true,
    headerText: 'Thank you for your business!',
    footerText: 'Please visit us again',
    showTaxId: true,
    taxId: 'TAX-123456789',
    receiptWidth: '80mm',
    printAutomatically: true
  });

  // Tax Settings
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    { id: 1, name: 'Standard Tax', rate: 8.5, isDefault: true },
    { id: 2, name: 'Food Tax', rate: 0, isDefault: false },
    { id: 3, name: 'Luxury Tax', rate: 15, isDefault: false }
  ]);

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptCard: true,
    acceptMobile: true,
    tipOptions: [10, 15, 20],
    roundingEnabled: true,
    minimumCardAmount: 0
  });

  // User Management
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@lithiapos.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-06-13 14:30:00'
    },
    {
      id: 2,
      name: 'John Manager',
      email: 'john@lithiapos.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-06-13 12:15:00'
    },
    {
      id: 3,
      name: 'Alice Cashier',
      email: 'alice@lithiapos.com',
      role: 'cashier',
      status: 'active',
      lastLogin: '2024-06-13 10:45:00'
    }
  ]);

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 30,
    requirePinForVoid: true,
    requirePinForRefund: true,
    autoLockScreen: true,
    passwordExpiry: 90
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    dailySalesReport: true,
    systemUpdates: true,
    soundEnabled: true,
    emailNotifications: true
  });

  // User Form
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'cashier' as 'admin' | 'manager' | 'cashier',
    password: ''
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'receipt', label: 'Receipt', icon: Receipt },
    { id: 'tax', label: 'Tax', icon: DollarSign },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Database }
  ];

  const handleSaveSettings = () => {
    // In a real app, save to database or config file
    alert('Settings saved successfully!');
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', role: 'cashier', password: '' });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: ''
    });
    setShowUserModal(true);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? { ...user, ...userForm, lastLogin: user.lastLogin }
          : user
      ));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm,
        status: 'active',
        lastLogin: 'Never'
      };
      setUsers([...users, newUser]);
    }

    setShowUserModal(false);
    setUserForm({ name: '', email: '', role: 'cashier', password: '' });
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const addTaxRate = () => {
    const newTax: TaxRate = {
      id: Math.max(...taxRates.map(t => t.id)) + 1,
      name: 'New Tax Rate',
      rate: 0,
      isDefault: false
    };
    setTaxRates([...taxRates, newTax]);
  };

  const updateTaxRate = (id: number, updates: Partial<TaxRate>) => {
    setTaxRates(taxRates.map(tax =>
      tax.id === id ? { ...tax, ...updates } : tax
    ));
  };

  const deleteTaxRate = (id: number) => {
    if (taxRates.length > 1) {
      setTaxRates(taxRates.filter(tax => tax.id !== id));
    }
  };

  const setDefaultTax = (id: number) => {
    setTaxRates(taxRates.map(tax => ({
      ...tax,
      isDefault: tax.id === id
    })));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="tab-content">
            <h3>Store Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Store Name:</label>
                <input
                  type="text"
                  value={generalSettings.storeName}
                  onChange={(e) => setGeneralSettings({
                    ...generalSettings,
                    storeName: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Store Phone:</label>
                <input
                  type="tel"
                  value={generalSettings.storePhone}
                  onChange={(e) => setGeneralSettings({
                    ...generalSettings,
                    storePhone: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Store Email:</label>
                <input
                  type="email"
                  value={generalSettings.storeEmail}
                  onChange={(e) => setGeneralSettings({
                    ...generalSettings,
                    storeEmail: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Currency:</label>
                <select
                  value={generalSettings.currency}
                  onChange={(e) => setGeneralSettings({
                    ...generalSettings,
                    currency: e.target.value
                  })}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label>Store Address:</label>
              <textarea
                value={generalSettings.storeAddress}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  storeAddress: e.target.value
                })}
                rows={3}
              />
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>User Management</h3>
              <button className="btn-primary" onClick={handleAddUser}>
                <User size={20} />
                Add User
              </button>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="action-btn edit"
                            onClick={() => handleEditUser(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="tab-content">
            <h3>Payment Methods</h3>
            <div className="payment-options">
              <div className="option-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={paymentSettings.acceptCash}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      acceptCash: e.target.checked
                    })}
                  />
                  <span>Accept Cash</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={paymentSettings.acceptCard}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      acceptCard: e.target.checked
                    })}
                  />
                  <span>Accept Credit/Debit Cards</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={paymentSettings.acceptMobile}
                    onChange={(e) => setPaymentSettings({
                      ...paymentSettings,
                      acceptMobile: e.target.checked
                    })}
                  />
                  <span>Accept Mobile Payments</span>
                </label>
              </div>
            </div>

            <h3>Tip Settings</h3>
            <div className="tip-settings">
              <label>Tip Percentages (%):</label>
              <div className="tip-inputs">
                {paymentSettings.tipOptions.map((tip, index) => (
                  <input
                    key={index}
                    type="number"
                    value={tip}
                    onChange={(e) => {
                      const newTips = [...paymentSettings.tipOptions];
                      newTips[index] = parseInt(e.target.value) || 0;
                      setPaymentSettings({
                        ...paymentSettings,
                        tipOptions: newTips
                      });
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Minimum Card Amount:</label>
              <input
                type="number"
                step="0.01"
                value={paymentSettings.minimumCardAmount}
                onChange={(e) => setPaymentSettings({
                  ...paymentSettings,
                  minimumCardAmount: parseFloat(e.target.value) || 0
                })}
              />
            </div>
          </div>
        );

      case 'receipt':
        return (
          <div className="tab-content">
            <h3>Receipt Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Header Text:</label>
                <input
                  type="text"
                  value={receiptSettings.headerText}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    headerText: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Footer Text:</label>
                <input
                  type="text"
                  value={receiptSettings.footerText}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    footerText: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Tax ID:</label>
                <input
                  type="text"
                  value={receiptSettings.taxId}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    taxId: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Receipt Width:</label>
                <select
                  value={receiptSettings.receiptWidth}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    receiptWidth: e.target.value
                  })}
                >
                  <option value="58mm">58mm</option>
                  <option value="80mm">80mm</option>
                  <option value="A4">A4</option>
                </select>
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={receiptSettings.showLogo}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    showLogo: e.target.checked
                  })}
                />
                <span>Show Logo on Receipt</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={receiptSettings.showTaxId}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    showTaxId: e.target.checked
                  })}
                />
                <span>Show Tax ID on Receipt</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={receiptSettings.printAutomatically}
                  onChange={(e) => setReceiptSettings({
                    ...receiptSettings,
                    printAutomatically: e.target.checked
                  })}
                />
                <span>Print Receipt Automatically</span>
              </label>
            </div>
          </div>
        );

      case 'tax':
        return (
          <div className="tab-content">
            <div className="section-header">
              <h3>Tax Rates</h3>
              <button className="btn-primary" onClick={addTaxRate}>
                <DollarSign size={20} />
                Add Tax Rate
              </button>
            </div>
            <div className="tax-rates">
              {taxRates.map(tax => (
                <div key={tax.id} className="tax-rate-item">
                  <div className="tax-inputs">
                    <input
                      type="text"
                      value={tax.name}
                      onChange={(e) => updateTaxRate(tax.id, { name: e.target.value })}
                      placeholder="Tax Name"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={tax.rate}
                      onChange={(e) => updateTaxRate(tax.id, { rate: parseFloat(e.target.value) || 0 })}
                      placeholder="Rate (%)"
                    />
                    <label className="checkbox-label">
                      <input
                        type="radio"
                        name="defaultTax"
                        checked={tax.isDefault}
                        onChange={() => setDefaultTax(tax.id)}
                      />
                      <span>Default</span>
                    </label>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTaxRate(tax.id)}
                      disabled={taxRates.length <= 1}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="tab-content">
            <h3>Security Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Session Timeout (minutes):</label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    sessionTimeout: parseInt(e.target.value) || 30
                  })}
                />
              </div>
              <div className="form-group">
                <label>Password Expiry (days):</label>
                <input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    passwordExpiry: parseInt(e.target.value) || 90
                  })}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={securitySettings.requirePinForVoid}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    requirePinForVoid: e.target.checked
                  })}
                />
                <span>Require PIN for void transactions</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={securitySettings.requirePinForRefund}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    requirePinForRefund: e.target.checked
                  })}
                />
                <span>Require PIN for refunds</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={securitySettings.autoLockScreen}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    autoLockScreen: e.target.checked
                  })}
                />
                <span>Auto-lock screen after timeout</span>
              </label>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="tab-content">
            <h3>Notification Settings</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.lowStockAlerts}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    lowStockAlerts: e.target.checked
                  })}
                />
                <span>Low stock alerts</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.dailySalesReport}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    dailySalesReport: e.target.checked
                  })}
                />
                <span>Daily sales report</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.systemUpdates}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    systemUpdates: e.target.checked
                  })}
                />
                <span>System update notifications</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.soundEnabled}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    soundEnabled: e.target.checked
                  })}
                />
                <span>Sound notifications</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: e.target.checked
                  })}
                />
                <span>Email notifications</span>
              </label>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="tab-content">
            <h3>Appearance Settings</h3>
            <div className="appearance-options">
              <div className="theme-selector">
                <h4>Theme</h4>
                <div className="theme-options">
                  <button
                    className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                    onClick={() => setIsDarkMode(false)}
                  >
                    <Sun size={20} />
                    <span>Light</span>
                  </button>
                  <button
                    className={`theme-option ${isDarkMode ? 'active' : ''}`}
                    onClick={() => setIsDarkMode(true)}
                  >
                    <Moon size={20} />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              <div className="display-settings">
                <h4>Display</h4>
                <div className="form-group">
                  <label>Display Scale:</label>
                  <select>
                    <option value="100">100% (Default)</option>
                    <option value="110">110%</option>
                    <option value="125">125%</option>
                    <option value="150">150%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="tab-content">
            <h3>System Information</h3>
            <div className="system-info">
              <div className="info-item">
                <strong>Application Version:</strong>
                <span>1.0.0</span>
              </div>
              <div className="info-item">
                <strong>Database Version:</strong>
                <span>SQLite 3.36.0</span>
              </div>
              <div className="info-item">
                <strong>Last Backup:</strong>
                <span>2024-06-13 02:00:00</span>
              </div>
              <div className="info-item">
                <strong>Storage Used:</strong>
                <span>125 MB / 1 GB</span>
              </div>
            </div>

            <h3>System Actions</h3>
            <div className="system-actions">
              <button className="btn-secondary">
                <Database size={20} />
                Backup Database
              </button>
              <button className="btn-secondary">
                <Upload size={20} />
                Restore Database
              </button>
              <button className="btn-secondary">
                <RotateCcw size={20} />
                Reset to Defaults
              </button>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="settings">
      {/* Header */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your POS system settings</p>
      </div>

      <div className="settings-content">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="settings-main">
          {renderTabContent()}

          {/* Save Actions */}
          <div className="settings-actions">
            <button className="btn-secondary">
              <RotateCcw size={20} />
              Reset
            </button>
            <button className="btn-primary" onClick={handleSaveSettings}>
              <Save size={20} />
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleUserSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value as any})}
                >
                  <option value="cashier">Cashier</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                  placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                  required={!editingUser}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Update' : 'Add'} User
                </button>
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
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

export default Settings;
