import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Product A', price: 25000, stock: 50, category: 'Electronics', barcode: '1234567890' },
  { id: 2, name: 'Product B', price: 15000, stock: 30, category: 'Clothing', barcode: '0987654321' },
  { id: 3, name: 'Product C', price: 35000, stock: 20, category: 'Food', barcode: '1122334455' },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock < 10) return { color: 'error', text: 'Low Stock' };
    if (stock < 30) return { color: 'warning', text: 'Medium Stock' };
    return { color: 'success', text: 'In Stock' };
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        mb: 4
      }}>
        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
          minWidth: 200
        }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {products.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
          minWidth: 200
        }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {products.filter(p => p.stock < 10).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
          minWidth: 200
        }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Stock
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{
          flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
          minWidth: 200
        }}>
          <Card sx={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {new Set(products.map(p => p.category)).size}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Search Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products by name or category..."
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

      {/* Products Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Barcode</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <TableRow
                      key={product.id}
                      sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                    >
                      <TableCell sx={{ fontWeight: 'medium' }}>
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip
                          label={stockStatus.text}
                          color={stockStatus.color as 'error' | 'warning' | 'success'}
                          size="small"
                          sx={{ fontWeight: 'medium' }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {product.barcode}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditProduct(product)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteProduct(product.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {currentProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              defaultValue={currentProduct?.name || ''}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              defaultValue={currentProduct?.category || ''}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              defaultValue={currentProduct?.price || ''}
            />
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              fullWidth
              defaultValue={currentProduct?.stock || ''}
            />
            <TextField
              label="Barcode"
              variant="outlined"
              fullWidth
              defaultValue={currentProduct?.barcode || ''}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
          >
            {currentProduct ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
