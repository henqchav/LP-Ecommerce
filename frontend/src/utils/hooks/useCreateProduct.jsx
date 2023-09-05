import { useState } from 'react';
import { createProductsInv } from "../../services/productInvService";

const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData) => {
    setLoading(true);
    try {
      await createProductsInv(productData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};

export default useCreateProduct;
