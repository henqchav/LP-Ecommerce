import { useEffect, useState } from "react";

import {
  Box,
  Chip,
  Divider,
  Icon,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItemFromCart } from "../../slices/cartSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { createOrder } from "../../services/orderService";

const CartItem = (props) => {
  const id = props.id;
  const name = props.name;
  const quantity = props.quantity;
  const price = props.price;
  const image = props.image;

  const dispatch = useDispatch()
  return (
    <>
      <div className="flex gap-x-1 px-2 py-4">
        <div className="relative inline-block">
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
          <IconButton onClick={() => dispatch(deleteItemFromCart(id))} size="small" color="error" className="absolute -top-5 -right-5">
            <Icon>remove_circle</Icon>
          </IconButton>
        </div>
        <div className="ml-2 flex flex-col">
          <Typography fontWeight={700}>{`${quantity} x ${name}`}</Typography>
          <Typography color={"primary"} fontWeight={700}>{`$${
            (+price * +quantity).toFixed(2)
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
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [customerName, setCustomerName] = useState("");
  const [tip, setTip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [formErrors, setFormErrors] = useState({}); // Para gestionar los errores

  const dispatch = useDispatch();
  const [animateRef] = useAutoAnimate();

  useEffect(() => {
    const newSubtotal = orderItems.reduce((acc, curr) => {
      acc = acc + +curr.quantity * +curr.price;
      return acc;
    }, 0);
    setSubtotal(newSubtotal);
  }, [orderItems]);

  const calculateTotal = () => {
    const shippingCost = 1;
    const tipValue = parseFloat(tip); // Convertir la propina a número
    const totalWithTip =
      subtotal + shippingCost + (isNaN(tipValue) ? 0 : tipValue); // Verificar si es un número válido
    return totalWithTip;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setExpirationDate("");
    setCVV("");
    setCardNumber("");
    setCustomerName("");
    setTip("");
    setOpenDialog(false);
    setFormErrors({}); // Limpiar los errores cuando se cierra el diálogo
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleTipChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9.]/g, "");
    if (newValue !== "" && parseFloat(newValue) > 100) {
      setTip("100");
    } else {
      setTip(newValue);
    }
  };

  const handleCardNumberChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 16);
    setCardNumber(newValue);
  };

  const formatExpirationDate = (input) => {
    const formattedInput = input.replace(/\D/g, "").substring(0, 4);
    if (formattedInput.length >= 2) {
      return formattedInput.substring(0, 2) + "/" + formattedInput.substring(2);
    }
    return formattedInput;
  };

  const handleExpirationDateChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatExpirationDate(inputValue);
    setExpirationDate(formattedValue);
  };

  const handleCVVChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 3);
    setCVV(newValue);
  };

  const handleConfirmPayment = async () => {
    const errors = {};

    // Validar campos requeridos en función del método de pago
    if (!customerName.trim() && paymentMethod === "tarjeta") {
      errors.customerName = "Nombre del cliente es obligatorio";
    }

    if (paymentMethod === "tarjeta") {
      if (!cardNumber) {
        errors.cardNumber = "Número de tarjeta es obligatorio";
      } else if (cardNumber.length !== 16) {
        errors.cardNumber = "Número de tarjeta debe tener 16 dígitos";
      }

      if (!expirationDate) {
        errors.expirationDate = "Fecha de expiración es obligatoria";
      }

      if (!cvv) {
        errors.cvv = "CVV es obligatorio";
      }
    }

    if (Object.keys(errors).length === 0) {
      // No hay errores, proceder con la confirmación de pago
      const orderCode = Math.floor(1000 + Math.random() * 9000).toString();
      const productData = orderItems.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
      }));
      const orderData = {
        product_data: productData,
        order_code: orderCode,
        status: "pendiente", // Estado por defecto
      };
      console.log(orderData)
      try {
        const response = await createOrder(orderData);
        console.log(orderData)

        if (response != null) {
          setConfirmationMessage("Compra realizada");
          setTimeout(() => {
            handleCloseDialog();
            setConfirmationMessage("");
          }, 1000);
        } else {
          // Manejar posibles errores del servidor
          console.error("Error en la respuesta del servidor");
          
        }
      } catch (err) {
        console.error("Error al enviar la solicitud al servidor:", err);
        
      }
    } else {
      // Hay errores, mostrar los errores en el formulario
      setFormErrors(errors);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col" ref={animateRef}>
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
        <Typography fontWeight={700}>{`$${subtotal.toFixed(2)}`}</Typography>
      </div>
      <Divider />
      <div className="flex flex-col items-center pt-8 pb-4 gap-y-2">
        <Chip
          disabled={!orderItems.length}
          color="primary"
          label={"CHECKOUT"}
          clickable
          onClick={handleOpenDialog}
        />
        <Chip
          disabled={!orderItems.length}
          onClick={() => dispatch(clearCart())}
          color="secondary"
          label={"LIMPIAR CARRITO"}
          clickable
        />
      </div>

      {/* Ventana emergente de confirmación de compra */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Confirmar Compra
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
              }}
            >
              <Icon>close</Icon>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent sx={{ padding: "16px" }}>
          {confirmationMessage ? (
            <div style={{ textAlign: "center" }}>
              <Typography variant="h6">{confirmationMessage}</Typography>
            </div>
          ) : (
            <>
              <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                <InputLabel id="payment-method-label" sx={{ width: "100%" }}>
                  Método de Pago
                </InputLabel>
                <Select
                  labelId="payment-method-label"
                  id="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  size="small"
                >
                  <MenuItem value="efectivo">Efectivo</MenuItem>
                  <MenuItem value="tarjeta">Tarjeta</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Nombre del Cliente"
                value={customerName}
                onChange={handleCustomerNameChange}
                error={!!formErrors.customerName}
                helperText={formErrors.customerName}
                sx={{ marginBottom: 2 , backgroundColor: formErrors.customerName ? "rgba(255, 0, 0, 0)" : "transparent",}}
                size="small"
              />
              {paymentMethod === "tarjeta" && (
                <>
                  <TextField
                    fullWidth
                    label="Número de Tarjeta"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    error={!!formErrors.cardNumber}
                    helperText={formErrors.cardNumber}
                    sx={{ marginBottom: 2, width: "100%" ,backgroundColor: formErrors.cardNumber ? "rgba(255, 0, 0, 0)" : "transparent",}}
                    size="small"
                  />
                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <TextField
                      label="Fecha de Expedición"
                      value={expirationDate}
                      onChange={handleExpirationDateChange}
                      error={!!formErrors.expirationDate}
                      helperText={formErrors.expirationDate}
                      sx={{ width: "30%", marginBottom: 2, backgroundColor: formErrors.expirationDate ? "rgba(255, 0, 0, 0)" : "transparent", }}
                      size="small"
                    />
                    <TextField
                      label="CVV"
                      value={cvv}
                      onChange={handleCVVChange}
                      error={!!formErrors.cvv}
                      helperText={formErrors.cvv}
                      sx={{ width: "30%", marginBottom: 2, marginLeft: "20px" , backgroundColor: formErrors.cvv ? "rgba(255, 0, 0, 0)" : "transparent",}}
                      size="small"
                    />
                  </div>
                </>
              )}
              <TextField
                fullWidth
                label="Propina"
                value={tip}
                onChange={handleTipChange}
                error={!!formErrors.tip}
                sx={{
                  marginBottom: 1,
                  width: "20%",
                  justifyContent: "right",
                }}
                size="small"
              />
              <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold", textAlign: "right" }}>
                Total: ${calculateTotal().toFixed(2)} (Envío: $1)
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {confirmationMessage ? null : (
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
          )}
          <Button
            onClick={handleConfirmPayment}
            color="primary"
            disabled={!!confirmationMessage}
          >
            {confirmationMessage ? "Cargando..." : "Confirmar Pago"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShoppingCart;