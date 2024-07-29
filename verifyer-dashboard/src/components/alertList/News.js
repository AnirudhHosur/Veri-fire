import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const News = () => {
    const [newsData, setNewsData] = useState({ bbc: [], cbc: [], alJazeera: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from all relevant endpoints
                const [bbcResponse, cbcResponse, alJazeeraResponse] = await Promise.all([
                    axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getHeadlines'),
                    axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getCBCData'),
                    axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/getJazeeraData')
                ]);

                // Parse and set BBC data
                const bbcData = JSON.parse(bbcResponse.data.body);
                console.log('BBC', bbcData)
                // Parse and set CBC data
                const cbcData = JSON.parse(cbcResponse.data.body);
                console.log('BBC', cbcData)
                // Parse and set Al Jazeera data
                const alJazeeraData = JSON.parse(alJazeeraResponse.data.body);
                console.log('BBC', alJazeeraData)

                setNewsData({ bbc: bbcData, cbc: cbcData, alJazeera: alJazeeraData });
            } catch (error) {
                console.error('Error fetching news data:', error);
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

    // Helper function to truncate text
    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6">News Alerts</Typography>

            <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                BBC News
            </Typography>
            <List>
                {newsData.bbc.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={truncateText(item.summary, 200)}
                            secondary={
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
                                    </Button>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                CBC News
            </Typography>
            <List>
                {newsData.cbc.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={truncateText(item.summary, 200)}
                            secondary={
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
                                    </Button>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                Al Jazeera News
            </Typography>
            <List>
                {newsData.alJazeera.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={truncateText(item.Summary, 200)}
                            secondary={
                                <>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={item.Link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Full Story
                                    </Button>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default News;