import * as React from 'react';
import { Box, Typography } from '@mui/material';

const InventoryTabPanel = ({ value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>Contenido de Inventario</Typography>
        </Box>
      )}
    </div>
  );
};

export default InventoryTabPanel;