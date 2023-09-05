import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getOrderByCode } from "../../services/orderService";

const statusDict = {
  completada: { severity: "success", message: "Tu orden ha sido completada" },
  aceptada: { severity: "info", message: "Tu orden ha sido aceptada" },
  pendiente: {
    severity: "info",
    message: "Tu orden esta pendiente de aceptacion",
  },
  cancelada: { severity: "error", message: "Tu orden ha sido cancelada" },
  error: {
    severity: "error",
    message:
      "Ha ocurrido un error recuperando el estado de la orden, intenta nuevamente",
  },
};

const OrderStatus = ({ status, loading }) => {
  const severity = statusDict?.[status]?.severity;
  const message = statusDict?.[status]?.message;

  if (loading) {
    return <CircularProgress size="2rem" />;
  }

  if (!status) {
    return null;
  }

  return (
    <Alert className="" severity={severity}>
      {message}
    </Alert>
  );
};

const CheckOrder = () => {
  const [animateRef] = useAutoAnimate();
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleCheckOrder = async () => {
    setLoading(true);
    try {
      const { order_status } = await getOrderByCode(codigo);
      setStatus(order_status);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setLoading(false);
    }
  };

  return (
    <div ref={animateRef} className="flex flex-col items-center py-5">
      <Typography className="text-center">
        Ingresa el codigo de una orden anterior que hayas realizado para revisar
        su estado
      </Typography>
      <TextField
        className="mt-5"
        label="Codigo"
        onChange={(event) => setCodigo(event.target.value)}
      />
      <Button
        className="my-5"
        variant="contained"
        onClick={() => handleCheckOrder()}
      >
        Revisar
      </Button>
      <OrderStatus status={status} loading={loading} />
    </div>
  );
};

export default CheckOrder;
