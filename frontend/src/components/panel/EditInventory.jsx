import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { closeSidepanel } from '../../slices/sidepanelSlice';
import { updateProductsInv } from '../../services/productInvService';
import {incrementDataRevision} from '../../slices/revisionSlice'


const EditInventory = () => {
  const selectedProduct = useSelector((state) => state.sidepanel.selectedProduct);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const isPositiveNumber = (value) => {
    return parseFloat(value) >= 0 || 'No se permiten números negativos';
  };

  const onSubmit = (data) => {
    console.log(data)
    updateProductsInv(selectedProduct.id, data);
    dispatch(incrementDataRevision({ event: "productsInvRevision" }))
  };

  React.useEffect(() => {
    if (selectedProduct) {
      setValue('name', selectedProduct.name);
      setValue('quantity', selectedProduct.quantity);
    }
  }, [selectedProduct, setValue]);

  const handleClosePanel = () => {
    dispatch(closeSidepanel({ clear: true })); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div 
    >
      Nombre del Producto: {selectedProduct ? selectedProduct.name : ''}
    </div>
    <Controller
      name="quantity"
      control={control}
      defaultValue=""
      rules={{
        required: 'Este campo es requerido',
        validate: isPositiveNumber,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          id="outlined-number"
          type="number"
          label="Cantidad"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 5 }}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
      )}
    />
    <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Grid>
  </form>
);
};

export default EditInventory;
