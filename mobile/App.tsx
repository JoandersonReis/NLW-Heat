import React from 'react';
import { StatusBar } from "react-native"

import { Home } from './src/screens/Home';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121214" />
      <Home />
    </>
  );
};

export default App;
