import React from "react";
import {
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
  Icon,
  IconButton,
  Typography,
} from "@mui/material";

const CartDialog = (props) => {
  const {
    open,
    handleCloseDialog,
    confirmationMessage,
    handlePaymentMethodChange,
    paymentMethod,
    handleCustomerNameChange,
    customerName,
    handleTipChange,
    tip,
    handleCardNumberChange,
    cardNumber,
    handleExpirationDateChange,
    expirationDate,
    handleCVVChange,
    cvv,
    handleConfirmPayment,
    formErrors,
  } = props;

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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
            <img
              src="../../assets/hamburguesa.png?url"
              alt="Checkmark"
              style={{ width: "64px", height: "64px" }}
            />
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
              sx={{
                marginBottom: 2,
                backgroundColor: formErrors.customerName
                  ? "rgba(255, 0, 0, 0)"
                  : "transparent",
              }}
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
                  sx={{
                    marginBottom: 2,
                    width: "100%",
                    backgroundColor: formErrors.cardNumber
                      ? "rgba(255, 0, 0, 0)"
                      : "transparent",
                  }}
                  size="small"
                />
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <TextField
                    label="Fecha de Expedición"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                    error={!!formErrors.expirationDate}
                    helperText={formErrors.expirationDate}
                    sx={{
                      width: "30%",
                      marginBottom: 2,
                      backgroundColor: formErrors.expirationDate
                        ? "rgba(255, 0, 0, 0)"
                        : "transparent",
                    }}
                    size="small"
                  />
                  <TextField
                    label="CVV"
                    value={cvv}
                    onChange={handleCVVChange}
                    error={!!formErrors.cvv}
                    helperText={formErrors.cvv}
                    sx={{
                      width: "30%",
                      marginBottom: 2,
                      marginLeft: "20px",
                      backgroundColor: formErrors.cvv
                        ? "rgba(255, 0, 0, 0)"
                        : "transparent",
                    }}
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
            <Typography
              variant="body1"
              sx={{ mt: 2, fontWeight: "bold", textAlign: "right" }}
            >
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
          disabled={confirmationMessage}
        >
          {confirmationMessage ? "Cargando..." : "Confirmar Pago"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;