import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab , Typography, Box} from '@mui/material';
import InventoryTabPanel from '../InventoryTabPanel';
import OrdersTabPanel from '../OrdersTabPanel';
import ProductsTabPanel from '../ProductsTabPanel';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const Dashboard = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ width: '100%',backgroundColor:'#ffebee' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', color: '#ffebee' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Productos" {...a11yProps(0)} />
                    <Tab label="Pedidos" {...a11yProps(1)} />
                    <Tab label="Inventario" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <InventoryTabPanel value={value} index={0} />
            <OrdersTabPanel value={value} index={1} />
            <ProductsTabPanel value={value} index={2} />
        </Box>
    );
};

export default Dashboard;
