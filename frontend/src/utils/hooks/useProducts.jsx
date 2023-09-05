import { useEffect, useState } from "react";
import { getProducts } from "../../services/productInvService";
import { useSelector } from "react-redux";

const useProducts = () => {
  const [productsInv, setProductsInv] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsInvRevision = useSelector(
    ({ revision }) => revision?.productsInvRevision
  );

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const fetchedProductsInv = await getProducts();
        setProductsInv(fetchedProductsInv);
        setLoading(false);
      })();
    } catch (error) {
      console.error("[Órdenes] Error al obtener órdenes:", error);
      setLoading(false);
    }
  }, [productsInvRevision]);

  return { productsInv, loading };
};

export default useProducts;
