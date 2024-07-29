import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Verifire Dashboard
                </Typography>
                <Button color="inherit" onClick={() => navigate('/resources')}>Resources</Button>
                <Button color="inherit" onClick={() => navigate('/support')}>Support Us</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;