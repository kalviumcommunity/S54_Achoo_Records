// Login.js
import React, { useState } from 'react';
import { Box, Heading, Input, Button, Text } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully logged in
        setErrorMessage('');
        alert('Login successful!');
      } else {
        // Incorrect password or username doesn't exist
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <Input
        placeholder="Username"
        mb={4}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        mb={4}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
    </Box>
  );
};

export default Login;
