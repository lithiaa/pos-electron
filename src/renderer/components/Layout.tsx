import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  AppBar,
  Container
} from '@mui/material';
import {
  Dashboard as HomeIcon,
  ShoppingCart,
  Inventory as PackageIcon,
  Warehouse,
  People as UsersIcon,
  Receipt as FileTextIcon,
  Analytics as BarChart3Icon,
  Settings,
  CreditCard
} from '@mui/icons-material';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales' },
    { path: '/products', icon: PackageIcon, label: 'Products' },
    { path: '/inventory', icon: Warehouse, label: 'Inventory' },
    { path: '/customers', icon: UsersIcon, label: 'Customers' },
    { path: '/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/reports', icon: BarChart3Icon, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
            color: 'white',
            borderRight: 'none',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)'
          },
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.1)'
        }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              letterSpacing: '0.5px'
            }}
          >
            💼 POS System
          </Typography>
        </Box>

        {/* Navigation */}
        <List sx={{ px: 2, py: 2 }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    mb: 0.5,
                    color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: isActive
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid transparent',
                    backdropFilter: isActive ? 'blur(10px)' : 'none',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      transform: 'translateX(4px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    },
                    '&.active': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: 40,
                      '& svg': {
                        fontSize: 22,
                        filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                      }
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: '0.3px'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Sidebar Footer */}
        <Box sx={{
          mt: 'auto',
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.1)'
        }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              display: 'block',
              fontSize: '0.75rem'
            }}
          >
            © 2025 POS System v1.0
          </Typography>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          marginLeft: 0
        }}
      >
        {/* Top AppBar (Optional - untuk konsistensi dengan App.tsx) */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: 'white',
            color: 'text.primary',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Toolbar sx={{ minHeight: '64px !important' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{
          flexGrow: 1,
          p: 3,
          overflow: 'auto'
        }}>
          <Container
            maxWidth="xl"
            sx={{
              height: '100%',
              px: '0 !important'
            }}
          >
            <Box sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              minHeight: 'calc(100vh - 160px)',
              overflow: 'hidden'
            }}>
              {children}
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
