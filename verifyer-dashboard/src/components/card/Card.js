import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

function Card({ title, content }) {
    return (
        <MuiCard variant="outlined" style={{ marginBottom: '16px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <div>{content}</div>
            </CardContent>
        </MuiCard>
    );
}

export default Card;