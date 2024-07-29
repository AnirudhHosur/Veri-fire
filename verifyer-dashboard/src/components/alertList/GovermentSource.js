import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import axios from 'axios';

const GovernmentSource = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alerts');

                // Check if the response body is present and not undefined
                console.log('Data', response.data);
                const responseBody = response.data;
                if (responseBody) {
                    // Sort data by timestamp in descending order
                    const sortedData = responseBody.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                    // Filter data to include only alerts
                    const alerts = sortedData.filter(item => item.type === 'Alert');

                    setData(alerts);
                } else {
                    console.error('Response body is undefined or empty.');
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // Ensure `data` has a default structure
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Paper style={{ padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
                Government Source Alerts
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                href={`https://511.alberta.ca/List/Alerts`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 8 }}
            >
                Read Full Alert
            </Button>
            <List>
                {data.map(alert => (
                    <React.Fragment key={alert.id}>
                        <ListItem style={{ paddingBottom: 16 }}>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="h6" gutterBottom>
                                            {alert.data.Message}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            {alert.data.Notes}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1" color="textSecondary" gutterBottom>
                                            {new Date(alert.timestamp).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default GovernmentSource;