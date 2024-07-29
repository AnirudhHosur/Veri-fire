import { Alert, Card, CardContent, CircularProgress, Container, Divider, Grid, Link, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NearbyPlaces = () => {
    const [placesData, setPlacesData] = useState(null);
    const [error, setError] = useState(null);

    // Hardcoded latitude and longitude
    const latitude = 51.454;
    const longitude = -121.334;

    useEffect(() => {
        axios.post('http://localhost:5000/api/calculate', {
            latitude,
            longitude
        })
            .then(response => {
                const data = JSON.parse(response.data.body);
                setPlacesData(data);
            })
            .catch(err => {
                setError('Error fetching nearby places');
                console.error(err);
            });
    }, []);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!placesData) {
        return <CircularProgress />;
    }

    return (
        <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h4" gutterBottom>
                Nearby Places
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Hotels
                    </Typography>
                    {placesData['Nearby Hotels'].map((hotel, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    <Link href={hotel.maps_link} target="_blank" rel="noopener noreferrer">{hotel.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {hotel.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Petrol Pumps
                    </Typography>
                    {placesData['Nearby Petrol Pumps'].map((pump, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    <Link href={pump.maps_link} target="_blank" rel="noopener noreferrer">{pump.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pump.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Restaurants
                    </Typography>
                    {placesData['Nearby Restaurants'] && placesData['Nearby Restaurants'].map((restaurant, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    <Link href={restaurant.maps_link} target="_blank" rel="noopener noreferrer">{restaurant.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {restaurant.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Hospitals
                    </Typography>
                    {placesData['Nearby Hospitals'] && placesData['Nearby Hospitals'].map((hospital, index) => (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">
                                    <Link href={hospital.maps_link} target="_blank" rel="noopener noreferrer">{hospital.name}</Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {hospital.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default NearbyPlaces;