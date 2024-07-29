import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Box, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const SupportUs = () => {
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleDisasterReportSubmit = () => {
        // Handle the submission of the disaster report (upload photo and description)
        // Implement your logic here
        console.log('Disaster Report Submitted', { photo, description });
    };

    const handleUrlSubmit = () => {
        // Handle the submission of the tech community URL
        // Implement your logic here
        console.log('URL Submitted', url);
    };

    return (
        <Container component={Paper} sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h4" gutterBottom>
                Support Us
            </Typography>

            <Typography variant="h6" gutterBottom>
                Report a Disaster
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
                <input
                    accept="image/*"
                    id="photo-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                />
                <label htmlFor="photo-upload">
                    <Box
                        sx={{
                            border: '2px dashed grey',
                            borderRadius: 1,
                            padding: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}
                    >
                        <IconButton component="span">
                            <UploadIcon fontSize="large" />
                        </IconButton>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Click or Drag to Upload Photo
                        </Typography>
                    </Box>
                </label>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleDisasterReportSubmit}>
                    Submit Report
                </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
                Tech Community: Submit URLs for Verification APIs
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="API URL"
                    variant="outlined"
                    value={url}
                    onChange={handleUrlChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleUrlSubmit}>
                    Submit URL
                </Button>
            </Box>
        </Container>
    );
};

export default SupportUs;