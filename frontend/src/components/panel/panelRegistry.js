import ShoppingCart from "./ShoppingCart";
import EditInventory from "./EditInventory";
import EditProduct from "./EditProduct";

export const registry = {
  SHOPPING_CART: ShoppingCart,
  EDIT_INVENTORY: EditInventory,
  EDIT_PRODUCT: EditProduct,
};

export const panelTitles = {
  SHOPPING_CART: "Carrito",
  EDIT_INVENTORY: "Editar Inventario",
  EDIT_PRODUCT: "Editar Producto",
};

export const panelIcons = {
  SHOPPING_CART: "shopping_cart",
};
