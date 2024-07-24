import React, { useState } from 'react';

export default function Authenticate({ token }) {
  // State variables for UI elements
  const [username, setUsername] = useState(null); // Stores retrieved username
  const [successMessage, setSuccessMessage] = useState(null); // Stores success message
  const [error, setError] = useState(null); // Stores any error message

  // Handles the authentication button click
  async function handleClick() {
    // Check if a token exists before making an API call
    if (!token) {
      setError('You need to sign up first to authenticate!');
      return; // Prevent unnecessary API call
    }

    try {
      // Fetch data from the authentication endpoint
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in header
          },
        }
      );

      const result = await response.json(); // Parse response as JSON

      // Handle successful authentication
      setSuccessMessage(result.message); // Set success message
      console.log(result.data); // Inspect the data structure (for debugging)

      // Update username based on the data structure (assuming it exists)
      setUsername(result.data?.username); // Use optional chaining for safety
    } catch (error) {
      setError(error.message); // Set error message on error
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {/* Conditionally render success message */}
      {successMessage && <p> {successMessage} </p>}
      {/* Conditionally render username if retrieved */}
      {username && <p>Welcome, {username}!</p>}
      {/* Conditionally render error message */}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}