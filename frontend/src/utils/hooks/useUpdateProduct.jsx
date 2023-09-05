import { useState } from 'react';
import { updateProductsInv } from "../../services/productInvService";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProduct = async (productId, productData) => {
    setLoading(true);
    try {
      await updateProductsInv(productId, productData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};

export default useUpdateProduct;