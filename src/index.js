/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Box } from '@material-ui/core';

import { LoginModule } from './LoginModule';

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <Box m={4}>
        <LoginModule />
      </Box>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
