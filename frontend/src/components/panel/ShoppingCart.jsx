import { useEffect, useState } from "react";

import { Box, Chip, Divider, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../slices/cartSlice";

const CartItem = (props) => {
  const id = props.id;
  const name = props.name;
  const quantity = props.quantity;
  const price = props.price;
  const image = props.image;
  return (
    <>
      <div className="flex gap-x-1 px-2 py-3">
        <img
          src={image}
          alt={name}
          width={70}
          height={70}
          style={{
            borderRadius: "5%",
            border: "2px solid rgba(0, 0, 0, 0.4)",
          }}
        />
        <div className="ml-2 flex flex-col">
          <Typography fontWeight={700}>{`${quantity} x ${name}`}</Typography>
          <Typography color={"primary"} fontWeight={700}>{`$${
            +price * +quantity
          }`}</Typography>
        </div>
        <Box flexGrow={1} />
      </div>
      <Divider />
    </>
  );
};

const ShoppingCart = () => {
  const orderItems = useSelector(({ cart }) => cart.items);
  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const newSubtotal = orderItems.reduce((acc, curr) => {
      acc = acc + +curr.quantity * +curr.price;
      return acc;
    }, 0);
    setSubtotal(newSubtotal);
  }, [orderItems]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {orderItems.length ? (
          orderItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="flex justify-center my-10">
            <Typography>No hay productos en el carrito!</Typography>
          </div>
        )}
      </div>
      <Divider />
      <div className="flex justify-between py-2 px-3">
        <Typography fontWeight={100}>SUB-TOTAL</Typography>
        <Box flexGrow={1} />
        <Typography fontWeight={700}>{`$${subtotal}`}</Typography>
      </div>
      <Divider />
      <div className="flex flex-col items-center pt-8 pb-4 gap-y-2">
        <Chip
          disabled={!orderItems.length}
          color="primary"
          label={"CHECKOUT"}
          clickable
        />
        <Chip
          disabled={!orderItems.length}
          onClick={() => dispatch(clearCart())}
          color="secondary"
          label={"LIMPIAR CARRITO"}
          clickable
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
