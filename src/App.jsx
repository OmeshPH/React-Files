import React, { useState } from 'react';
import SignUpForm from './Components/SignUpForm';
import Authenticate from './Components/Authenticate';

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </>
  );
}

export default App;