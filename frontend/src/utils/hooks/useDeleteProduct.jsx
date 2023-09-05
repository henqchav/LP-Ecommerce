import { useState } from 'react';
import { deleteProductsInv } from "../../services/productInvService";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await deleteProductsInv(productId);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};

export default useDeleteProduct;
