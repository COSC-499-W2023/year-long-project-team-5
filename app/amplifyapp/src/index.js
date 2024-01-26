import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import ourTheme from './ourTheme';
import config from './aws-exports';

Amplify.configure(config);

const Index = () => {
  const [colorMode, setColorMode] = useState('light');

  return (
    <ThemeProvider theme={ourTheme} colorMode={colorMode}>
      <React.StrictMode>
        <App colorMode={colorMode} setColorMode={setColorMode} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
