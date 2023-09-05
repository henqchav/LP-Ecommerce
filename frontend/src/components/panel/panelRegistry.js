import ShoppingCart from "./ShoppingCart";
import EditInventory from "./EditInventory";
import EditProduct from "./EditProduct";
import CheckOrder from "./CheckOrder";
import AddProduct from "./AddProduct";
import AddInventory from "./AddInventory";

export const registry = {
  SHOPPING_CART: ShoppingCart,
  ORDER_STATUS: CheckOrder,
  EDIT_INVENTORY: EditInventory,
  EDIT_PRODUCT: EditProduct,
  ADD_PRODUCT: AddProduct,
  ADD_INVENTORY: AddInventory,
};

export const panelTitles = {
  SHOPPING_CART: "Carrito",
  ORDER_STATUS: "Revisar Estado de una Orden",
  EDIT_INVENTORY: "Editar Inventario",
  ADD_INVENTORY: "Añadir Inventario de Producto",
  EDIT_PRODUCT: "Editar Producto",
  ADD_PRODUCT: "Añadir Producto"
};

export const panelIcons = {
  SHOPPING_CART: "shopping_cart",
  ORDER_STATUS: "track_changes",
};
