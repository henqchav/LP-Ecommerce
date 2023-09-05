import * as React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import useOrders from '../utils/hooks/useOrders'; // Importa el hook personalizado

const OrdersTabPanel = ({ value, index }) => {
  const orders = useOrders(); // Utiliza el hook personalizado para obtener las órdenes

  // Datos quemados para mostrar una fila
  const dummyOrder = {
    _id: '1',
    product_id: '123',
    quantity: 2,
    total_pedido: '$20',
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ borderBottom: '3px solid #706E6E' }}>
                  <TableCell>Orden ID</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Total Pedido</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Fila con datos quemados */}
                <TableRow key={dummyOrder._id} >
                  <TableCell>{dummyOrder.product_id}</TableCell>
                  <TableCell>{dummyOrder.quantity}</TableCell>
                  <TableCell>{dummyOrder.total_pedido}</TableCell>
                  <TableCell>
                    <IconButton style={{ color: 'green' }}>
                      <Check />
                    </IconButton>
                    <IconButton style={{ color: 'red' }}>
                      <Clear />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {/* Renderiza las órdenes reales */}
                
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default OrdersTabPanel;