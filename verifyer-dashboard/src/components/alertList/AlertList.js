import React from 'react';
import { Grid, Container } from '@mui/material';
import GovernmentSource from './GovermentSource';
import News from './News';

const AlertList = () => {
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <GovernmentSource />
                </Grid>
                <Grid item xs={12} md={6}>
                    <News />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AlertList;