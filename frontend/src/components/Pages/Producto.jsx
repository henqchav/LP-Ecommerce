import {
    Button,
    Chip,
    Divider, Icon, MenuItem,
    Paper,
    Select,
    TextField,
    Typography
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  import imgHamburguesa from "../../assets/hamburguesa.png?url";
  import { useDispatch, useSelector } from "react-redux";
  import { addItemToCart } from "../../slices/cartSlice";
  
  const productos = [
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
  
  const NumberRangeSelect = ({ min, max, value, onChange }) => {
    const numbers = Array.from(
      { length: max - min + 1 },
      (_, index) => min + index
    );
  
    return (
      <Select
        value={value}
        onChange={onChange}
        label="Number Range"
        defaultValue={min}
        className="w-16"
      >
        {numbers.map((number) => (
          <MenuItem key={number} value={number}>
            {number}
          </MenuItem>
        ))}
      </Select>
    );
  };
  
  const Producto = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const dispatch = useDispatch();
  
    const queryParams = new URLSearchParams(location.search);
  
    const productId = queryParams?.get?.("id");
  
    const itemInCart = useSelector(({ cart }) => cart.items)?.find(
      (item) => +item.id === +productId
    );
  
    const [productInfo, setProductInfo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
  
    const handleProductInfoRequest = (productId) => {
      try {
        // request logic
        if (!productId)
          throw new Error("No se ha proporcionado el id del producto");
  
        const product = productos.find((item) => +item.id === +productId);
  
        if (!product) throw new Error("No se podido encontrar el producto");
  
        setProductInfo(product);
      } catch (err) {
        const errorStr = `Ha ocurrido un error recuperando el producto Err:${err.message}`;
        console.log(errorStr);
        setError(errorStr);
      }
    };
  
    useEffect(() => {
      if (!productInfo) {
        handleProductInfoRequest(productId);
      }
    }, []);
  
    useEffect(() => {
      if (itemInCart && productInfo) {
        setIsOutOfStock(itemInCart.quantity === productInfo?.quantity);
      } else {
        setIsOutOfStock(false);
      }
    }, [itemInCart, productInfo]);
  
    return (
      <Paper className="m-3 p-2 flex flex-col items-center h-screen">
        <Button
          className="self-start"
          startIcon={<Icon>chevron_left</Icon>}
          onClick={() => navigate("/catalogo")}
        >
          Volver
        </Button>
        <div className="flex h-screen w-full justify-center items-center gap-x-2 px-10">
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <img
                src={productInfo?.image}
                alt={productInfo?.name}
                style={{
                  borderRadius: "5%",
                  border: "2px solid rgba(0, 0, 0, 0.4)",
                }}
                className="w-1/2 h-1/2 object-contain rounded-5 border-2 border-opacity-40"
              />
              <div
                className={`flex flex-col gap-y-2 w-1/2 justify-center${
                  isOutOfStock || !productInfo?.quantity
                    ? "pointer-events-none opacity-70"
                    : ""
                }`}
              >
                <Typography variant="h4" fontFamily={"Kaushan Script, cursive"}>
                  {productInfo?.name}
                </Typography>
                <Typography
                  fontWeight={700}
                  color="primary"
                  variant="h6"
                >{`$${productInfo?.price}`}</Typography>
                <Divider />
                <Typography variant="body2" fontWeight={100}>
                  {productInfo?.description}
                </Typography>
                <Divider />
                <Typography fontWeight={700}>Instrucciones especiales</Typography>
                <TextField
                  className="mb-3"
                  label="Agregar una nota"
                  multiline
                  maxRows={4}
                  rows={4}
                />
                <Divider />
                <NumberRangeSelect
                  min={1}
                  max={productInfo?.quantity - (itemInCart?.quantity ?? 0)}
                  value={selectedQuantity}
                  onChange={(event) => setSelectedQuantity(event.target.value)}
                />
                <Chip
                  disabled={!productInfo?.quantity || isOutOfStock}
                  color="primary"
                  label={
                    !productInfo?.quantity || isOutOfStock
                      ? "Agotado"
                      : "Agregar al carrito"
                  }
                  sx={{ fontWeight: 500 }}
                  onClick={() => {
                    dispatch(
                      addItemToCart({
                        id: productInfo?.id,
                        name: productInfo?.name,
                        description: productInfo?.description,
                        image: productInfo?.image,
                        price: productInfo?.price,
                        quantity: selectedQuantity,
                      })
                    );
                    setSelectedQuantity(1);
                  }}
                  clickable
                />
              </div>
            </>
          )}
        </div>
      </Paper>
    );
  };
  
  export default Producto;
  