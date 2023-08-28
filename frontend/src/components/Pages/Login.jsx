import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, TextField, Button } from '@mui/material';


const Login = ({ onLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ajusta la altura según tus necesidades
        position: 'relative', // Agrega posición relativa para alinear el cuadro de fondo
      }}
    >
      {/* Cuadro de fondo blanco */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content', // Ajusta el ancho según el contenido
          padding: '20px', // Añade espacio interno
          backgroundColor: '#ffffff', // Color de fondo blanco
          borderRadius: '8px', // Bordes suaves
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Sombra suave
        }}
      >

        {/* Contenido de inicio de sesión */}
        <Typography variant="h5" align="center">Iniciar Sesión</Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Login;