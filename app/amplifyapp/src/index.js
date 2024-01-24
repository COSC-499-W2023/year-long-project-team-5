import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, defaultDarkModeOverride } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const Index = () => {
  const [colorMode, setColorMode] = useState('light');
  const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <React.StrictMode>
        <App colorMode={colorMode} setColorMode={setColorMode} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
