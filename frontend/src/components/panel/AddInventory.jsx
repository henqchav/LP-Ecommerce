import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Select, MenuItem, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { closeSidepanel } from '../../slices/sidepanelSlice';
import { createProductsInv } from '../../services/productInvService';
import {incrementDataRevision} from '../../slices/revisionSlice';
import useProducts from '../../utils/hooks/useProducts';
import  ObjectId  from 'bson-objectid';

const AddInventory = () => {

    
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const { productsInv: productos, loading } = useProducts();
  const isPositiveNumber = (value) => {
    return parseFloat(value) >= 0 || 'No se permiten números negativos';
  };

  const onSubmit = (data) => {
    const newData = {...data, product_id: ObjectId(data.productId)}
    console.log(newData)
    createProductsInv(newData);
    dispatch(incrementDataRevision({ event: "productsInvRevision" }))
  };

  const handlePriceChange = (newValue) => {
    setValue('price', newValue);
  };

  const handlePriceIncrement = () => {
    const currentPrice = parseFloat(getValues('price'));
    const newPrice = (currentPrice + 0.1).toFixed(1);
    handlePriceChange(newPrice);
  };

  const handlePriceDecrement = () => {
    const currentPrice = parseFloat(getValues('price'));
    const newPrice = (currentPrice - 0.1).toFixed(1);
    handlePriceChange(newPrice);
  };

  const handleClosePanel = () => {
    dispatch(closeSidepanel({ clear: true })); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>Productos</div>
        <Controller
        name="productId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            label="Nombre del Producto"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 5 }}
          >
            {productos.map((producto) => (
              <MenuItem key={producto._id.$oid} value={producto._id.$oid}>
                {producto.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />

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

export default AddInventory;
