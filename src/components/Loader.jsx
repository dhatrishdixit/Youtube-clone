import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

const Loader = () =>  (
  <Box minHeight="95vh"justifyContent='center' alignItems='center'>
    <Stack direction='row'  height='80vh' justifyContent='center' alignItems='center' >
      <CircularProgress />
    </Stack>
  </Box>
);

export default Loader;