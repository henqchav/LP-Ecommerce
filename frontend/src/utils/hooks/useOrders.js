import { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService'; // Importa la función de obtención de órdenes

const useOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      })();
    } catch (error) {
      console.error('[Órdenes] Error al obtener órdenes:', error);
    }
  }, []);

  return orders;
};

export default useOrders;