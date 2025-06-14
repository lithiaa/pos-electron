import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  AlertTriangle
} from 'lucide-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Today\'s Sales',
      value: '$2,459.00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Transactions',
      value: '142',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Total Products',
      value: '1,247',
      change: '+2.1%',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '+15.3%',
      icon: Users,
      color: 'orange'
    }
  ];

  const quickActions = [
    { title: 'New Sale', path: '/sales', icon: ShoppingBag, color: 'primary' },
    { title: 'Add Product', path: '/products', icon: Package, color: 'secondary' },
    { title: 'View Reports', path: '/reports', icon: TrendingUp, color: 'success' },
    { title: 'Manage Customers', path: '/customers', icon: Users, color: 'info' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              POS System
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ minWidth: 275, mb: 2 }}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to your Point of Sale system
              </Typography>
            </CardContent>
          </Card>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.color}`}>
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span className="stat-change">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-content">
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.path}
                    className={`action-card ${action.color}`}
                  >
                    <action.icon size={32} />
                    <span>{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">
                    <ShoppingBag size={16} />
                  </div>
                  <div className="activity-content">
                    <p>New sale completed - $125.99</p>
                    <small>2 minutes ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <Package size={16} />
                  </div>
                  <div className="activity-content">
                    <p>Product "Coffee Beans" stock low</p>
                    <small>15 minutes ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">
                    <Users size={16} />
                  </div>
                  <div className="activity-content">
                    <p>New customer registered</p>
                    <small>1 hour ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Box sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mt: 4
          }}>
            <Button
              variant="contained"
              sx={{ minWidth: 120, height: 60 }}
            >
              Sales
            </Button>
            <Button
              variant="contained"
              sx={{ minWidth: 120, height: 60 }}
            >
              Inventory
            </Button>
            <Button
              variant="contained"
              sx={{ minWidth: 120, height: 60 }}
            >
              Reports
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
