import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography, InputAdornment, Input } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { closeSidepanel } from '../../slices/sidepanelSlice';
import useUpdateProduct from '../../utils/hooks/useUpdateProduct';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCreateProduct from '../../utils/hooks/useCreateProduct';
import { createProducts } from '../../services/productInvService';
import {incrementDataRevision} from '../../slices/revisionSlice'

const AddProduct = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const { updateProduct } = useUpdateProduct();
  const { createProduct } = useCreateProduct();
  const [animateRef] = useAutoAnimate();

  const isPositiveNumber = (value) => {
    return parseFloat(value) >= 0 || 'No se permiten números negativos';
  };

  const onSubmit = (data) => {
    console.log(data)
    createProducts(data);
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
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: 'Este campo es requerido',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre del Producto"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 5, marginBottom: 5 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <div>Descripción</div>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
            
          <TextField
            {...field}
            multiline
            rows={4}
            sx={{ marginTop: 5 }}
            placeholder="Descripción"
            aria-label="Descripción"
            style={{ width: '100%', marginTop: 5 }}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        defaultValue=""
        rules={{
          required: 'Este campo es requerido',
          validate: isPositiveNumber,
        }}
        render={({ field }) => (
            <TextField
            {...field}
            label="Precio"
            variant="outlined"
            fullWidth
            type='number'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),
              value: getValues('price'),
              onChange: (e) => handlePriceChange(e.target.value),
            }}
            sx={{ marginTop: 5, marginBottom: 5 }}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        )}
      />
      <div>Imagen</div>
      <Controller
        name="image"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            type="file"
            label="Imagen"
            variant="outlined"
            fullWidth
            error={!!errors.image}
            helperText={errors.image?.message}
          />
        )}
      />
      <Grid container justifyContent="center" sx={{ marginTop: 15 }}>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Grid>
    </form>
  );
};

export default AddProduct;
