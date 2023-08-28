import * as React from 'react';
import imgHamburguesa from "../assets/hamburguesa.png?url"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton,Icon, TablePagination, Button  } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSelectedProduct, openSidepanel } from '../slices/sidepanelSlice';
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


const InventoryTabPanel = ({ value, index }) => {

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>
                  <img src={producto.image} alt={producto.name} width="100" />
                </TableCell>
                <TableCell>{producto.name}</TableCell>
                <TableCell>{producto.quantity}</TableCell>
                <TableCell>
                  <IconButton 
                  color="primary" 
                  className="mr-6"
                  
                  onClick={() => {
                    dispatch(setSelectedProduct(producto));
                    dispatch(openSidepanel({ id: "EDIT_INVENTORY" }))}}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton color="secondary">
                    <Icon>clear</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      )}
    </div>
  );
};

export default InventoryTabPanel;