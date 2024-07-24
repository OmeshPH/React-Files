import React, { useState } from 'react';

const MIN_USERNAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 8;

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    // Check for both username and password errors
    if (usernameError || passwordError) {
      setError(usernameError || passwordError);
      return; // Prevent form submission if there's an error
    }

    
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      console.log(data); // Log the response data for debugging
      setToken(data.token); // Set the token in app state
    } catch (error) {
      setError(error.message);
    }
  }

  function validateUsername(username) {
    if (username.length < MIN_USERNAME_LENGTH) {
      return "Username must be at least 8 characters long.";
    }
    return null; // No error
  }

  function validatePassword(password) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return "Password must be at least 8 characters long.";
    }

    // Password complexity test
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    // add symbols here for stronger encryption (e.g., /[@$!%*?&]/)

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return "Password must contain uppercase, lowercase, and numbers.";
    }

    return null; // No error
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}