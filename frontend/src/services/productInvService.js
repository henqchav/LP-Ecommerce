import { createRequest } from "../utils/requestUtils";

export const getProductsInv = () =>
  createRequest()
    .get("/product_inventory")
    .then((response) => response.data);

export const getProductInv = (productInvId) =>
  createRequest()
    .get(`/product_inventory/${productInvId}`)
    .then((response) => response.data);

export const createProductsInv = (productInvData) =>
  createRequest()
    .post("/product_inventory", productInvData)
    .then((response) => response.data);

export const deleteProductsInv = (productInvId) =>
  createRequest()
    .delete(`/product_inventory/${productInvId}`)
    .then((response) => response.status === 204);