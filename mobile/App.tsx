import React from 'react';
import { StatusBar } from "react-native"
import { AuthProvider } from './src/hooks/auth';

import { Home } from './src/screens/Home';

function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#121214" />
      <Home />
    </AuthProvider>
  );
};

export default App;
