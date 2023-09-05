import * as React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import { getOrders, cancelOrder } from '../services/orderService'; 


const OrdersTabPanel = ({ value, index }) => {
  const [orders, setOrders] = React.useState([]); 


  const loadOrders = async () => {
    try {
      const response = await getOrders();
      const pendingOrders = response.filter((order) => order.status === 'pendiente');
      setOrders(pendingOrders); // Almacena las órdenes pendientes en el estado
    } catch (error) {
      console.error('Error al cargar las órdenes', error);
    }
  };

   const cancelOrderById = async (orderId) => {
    try {
      await cancelOrder(orderId); // Llama a la función cancelOrder para actualizar el estado
      // Vuelve a cargar las órdenes después de la cancelación
      loadOrders();
    } catch (error) {
      console.error('Error al cancelar la orden', error);
    }
  };

   React.useEffect(() => {
    loadOrders();
  }, []);

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
                  <TableCell>ID de Orden</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_code}>
                    <TableCell>{order.order_code}</TableCell>
                    <TableCell>{order.client_name}</TableCell>
                    <TableCell>
                      {order.product_data.map((product, index) => (
                        <div key={index}>
                          {product.product_name} (Cantidad: {product.quantity})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton color="success">
                        <Check />
                      </IconButton>
                      <IconButton color="error" onClick={() => cancelOrderById(order._id.$oid)}>
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