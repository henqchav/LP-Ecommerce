import ShoppingCart from "./ShoppingCart";
import EditInventory from "./EditInventory";
import EditProduct from "./EditProduct";
import CheckOrder from "./CheckOrder";

export const registry = {
  SHOPPING_CART: ShoppingCart,
  ORDER_STATUS: CheckOrder,
  EDIT_INVENTORY: EditInventory,
  EDIT_PRODUCT: EditProduct,
  ADD_PRODUCT: EditProduct,
};

export const panelTitles = {
  SHOPPING_CART: "Carrito",
  ORDER_STATUS: "Revisar Estado de una Orden",
  EDIT_INVENTORY: "Editar Inventario",
  EDIT_PRODUCT: "Editar Producto",
  ADD_PRODUCT: "Añadir Producto"
};

export const panelIcons = {
  SHOPPING_CART: "shopping_cart",
  ORDER_STATUS: "track_changes",
};
