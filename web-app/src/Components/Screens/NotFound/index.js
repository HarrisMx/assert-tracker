import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h2" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go back to home
      </Button>
    </Box>
  );
}

export default NotFound;
