import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Chip,
  InputAdornment,
  Divider,
  Badge,
  Paper
} from '@mui/material';
import {
  Add as PlusIcon,
  Remove as MinusIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const Sales: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const products: Product[] = [
    { id: 1, name: 'Coffee', price: 4.99, category: 'Beverages', stock: 50 },
    { id: 2, name: 'Sandwich', price: 8.99, category: 'Food', stock: 25 },
    { id: 3, name: 'Pastry', price: 3.50, category: 'Food', stock: 30 },
    { id: 4, name: 'Tea', price: 3.99, category: 'Beverages', stock: 40 },
    { id: 5, name: 'Muffin', price: 2.99, category: 'Food', stock: 20 },
    { id: 6, name: 'Juice', price: 5.99, category: 'Beverages', stock: 35 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const processPayment = () => {
    if (cart.length === 0) return;

    // Process payment logic here
    alert(`Payment processed! Total: $${total.toFixed(2)}`);
    setCart([]);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'info' } = {
      'Beverages': 'primary',
      'Food': 'success'
    };
    return colors[category] || 'info';
  };

  return (
    <Box sx={{ p: 3, height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <PaymentIcon sx={{ fontSize: 40 }} />
          Point of Sale
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        height: 'calc(100vh - 140px)'
      }}>
        {/* Products Section */}
        <Box sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Search Bar */}
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </CardContent>
          </Card>

          {/* Products Grid */}
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            overflow: 'auto',
            pb: 2
          }}>
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                sx={{
                  flex: { xs: '1 1 calc(50% - 8px)', sm: '1 1 calc(33.333% - 11px)', md: '1 1 calc(25% - 12px)' },
                  minWidth: 200,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  }
                }}
                onClick={() => addToCart(product)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      fontSize: '1.1rem'
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Chip
                    label={product.category}
                    color={getCategoryColor(product.category)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      mb: 1
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: product.stock < 10 ? 'error.main' : 'text.secondary',
                      fontWeight: product.stock < 10 ? 'bold' : 'normal'
                    }}
                  >
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Cart Section */}
        <Box sx={{
          flex: 1,
          minWidth: 350,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Cart Header */}
            <CardContent sx={{ pb: 1 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2
              }}>
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon sx={{ fontSize: 28 }} />
                </Badge>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Cart ({cart.length} items)
                </Typography>
              </Box>
              <Divider />
            </CardContent>

            {/* Cart Items */}
            <Box sx={{
              flex: 1,
              overflow: 'auto',
              px: 2
            }}>
              {cart.length === 0 ? (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  flexDirection: 'column',
                  color: 'text.secondary'
                }}>
                  <ShoppingCartIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                  <Typography variant="h6">Your cart is empty</Typography>
                  <Typography variant="body2">Add some products to get started</Typography>
                </Box>
              ) : (
                cart.map(item => (
                  <Paper
                    key={item.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 1
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          size="small"
                          color="primary"
                        >
                          <MinusIcon />
                        </IconButton>
                        <Typography
                          variant="h6"
                          sx={{
                            minWidth: 40,
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          size="small"
                          color="primary"
                        >
                          <PlusIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              )}
            </Box>

            {/* Cart Footer */}
            <CardContent sx={{ pt: 1 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'primary.main'
                  }}
                >
                  Total: ${total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                onClick={processPayment}
                disabled={cart.length === 0}
                variant="contained"
                fullWidth
                size="large"
                startIcon={<PaymentIcon />}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  background: cart.length === 0 ? undefined : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: cart.length === 0 ? undefined : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  }
                }}
              >
                Process Payment
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Sales;
