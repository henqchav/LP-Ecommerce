import * as React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import useOrders from '../utils/hooks/useOrders'; // Importa el hook personalizado

const OrdersTabPanel = ({ value, index }) => {
  const orders = useOrders(); // Utiliza el hook personalizado para obtener las órdenes

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>Contenido de Ordenes</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto ID</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Nota</TableCell>
                  <TableCell>Total Pedido</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order.product_id}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.nota}</TableCell>
                    <TableCell>{order.total_pedido}</TableCell>
                    <TableCell>
                      <IconButton>
                        <Check />
                      </IconButton>
                      <IconButton>
                        <Clear />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default OrdersTabPanel;