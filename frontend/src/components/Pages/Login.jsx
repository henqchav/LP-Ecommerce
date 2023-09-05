import * as React from 'react';
import { Button, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({
    username: false,
    password: false,
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Validación: Verifica que ambos campos estén llenos
    if (username.trim() === '' || password.trim() === '') {
      // Marcar los campos que faltan de llenar en rojo
      setErrors({
        username: username.trim() === '',
        password: password.trim() === '',
      });
    } else {
      // Lógica de inicio de sesión (redirección, etc.)
      // En este ejemplo, simplemente mostramos un mensaje de alerta
      alert('Inicio de sesión exitoso. Redirigiendo a /dashboard...');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
          error={errors.username}
          helperText={errors.username ? 'Este campo es obligatorio' : ''}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={errors.password}
          helperText={errors.password ? 'Este campo es obligatorio' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;