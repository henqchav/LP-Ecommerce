import { useEffect, useState } from "react";
import { getProductsInv } from "../../services/productInvService";
import { useSelector } from "react-redux";

const useProductsInv = () => {
  const [productsInv, setProductsInv] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsInvRevision = useSelector(
    ({ revision }) => revision?.productsInvRevision
  );

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const fetchedProductsInv = await getProductsInv();
        console.log({ fetchedProductsInv });
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

export default useProductsInv;
