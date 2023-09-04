import {
  Box,
  Chip,
  CircularProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import imgHamburguesa from "../../assets/hamburguesa.png?url";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../slices/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductsInv from "../../utils/hooks/useProductsInv";

const productosMock = [
  {
    id: 1,
    name: "Sencilla",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 2,
    quantity: 10,
  },
  {
    id: 2,
    name: "Doble con Queso",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 5,
    quantity: 10,
  },
  {
    id: 3,
    name: "Pollo con Tocino",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 5,
    quantity: 10,
  },
  {
    id: 4,
    name: "La monstrosa",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 10,
    quantity: 10,
  },
  {
    id: 5,
    name: "Mega Burguer",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 10,
    quantity: 10,
  },
  {
    id: 6,
    name: "La belicosa",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 8.5,
    quantity: 10,
  },
  {
    id: 7,
    name: "La belicosa",
    description:
      "Prepárate para un festín de sabores con nuestra Hamburguesa Royale de la Casa. Esta obra maestra culinaria combina a la perfección los ingredientes más frescos y de la más alta calidad para crear una experiencia gastronómica inigualable.",
    image: imgHamburguesa,
    price: 8.5,
    quantity: 10,
  },
];

const HamburguesaCard = (props) => {
  const id = props.id;
  const name = props.name;
  const description = props.description;
  const image = props.image;
  const price = props.price;
  const quantity = props.quantity;

  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemInCart = useSelector(({ cart }) => cart.items).find(
    (item) => item.id === id
  );

  useEffect(() => {
    if (itemInCart) {
      setIsOutOfStock(itemInCart.quantity === quantity);
    } else {
      setIsOutOfStock(false);
    }
  }, [itemInCart]);

  const handleProductClick = () => {
    navigate(`/producto?id=${id}`);
  };

  return (
    <Paper
      elevation={8}
      className="flex flex-col py-7 px-3 gap-y-3 items-center w-40"
      sx={{ bgcolor: "#D9D9D9" }}
    >
      <img
        src={image}
        alt={name}
        width={100}
        height={100}
        style={{
          borderRadius: "5%",
          border: "2px solid rgba(0, 0, 0, 0.4)",
        }}
      />
      <Link
        onClick={() => handleProductClick()}
        component={Box}
        underline="none"
        className="cursor-pointer text-center"
        sx={{
          color: "black",
          "&:hover": {
            color: "primary.main",
            transform: "scale(1.05)",
          },
          transition: "color 0.3s, transform 0.3s",
        }}
        fontFamily={"Kaushan Script, cursive"}
      >
        {name}
      </Link>
      <Typography color={"primary"} fontWeight={700}>{`$${price}`}</Typography>
      <Chip
        disabled={!quantity || isOutOfStock}
        color="primary"
        label={!quantity || isOutOfStock ? "Agotado" : "Agregar al carrito"}
        sx={{ fontWeight: 500 }}
        onClick={() =>
          dispatch(
            addItemToCart({ id, name, description, image, price, quantity: 1 })
          )
        }
        clickable
      />
    </Paper>
  );
};

const Catalogo = () => {
  const [animateRef] = useAutoAnimate();
  const { productsInv: productos, loading } = useProductsInv();

  if (loading) {
    return (
      <div className="w-full flex justify-center py-56">
        <CircularProgress size="4rem" />
      </div>
    );
  }

  return (
    <div ref={animateRef} className="flex p-2 gap-14 flex-wrap">
      {productos.length ? (
        productos.map((prd) => (
          <HamburguesaCard
            key={prd.id}
            id={prd.id}
            name={prd.name}
            description={prd.description}
            image={prd.image}
            price={prd.price}
            quantity={prd.quantity}
          />
        ))
      ) : (
        <div className="w-full flex justify-center py-56">
          <Typography
            variant="h4"
            fontWeight={700}
            fontFamily={"Kaushan Script, cursive"}
          >
            No hay productos disponibles
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
