import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './manager.tsx';
import SplashScreen from './components/SplashScreen.tsx';

const Root = () => {
  const [userName, setUserName] = useState(null);

  if (!userName) {
    return <SplashScreen onNameSubmit={setUserName} />;
  }

  return <App userName={userName} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>
);