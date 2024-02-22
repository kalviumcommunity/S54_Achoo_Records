// Login.js
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Validate input
      if (!username || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      const response = await fetch('https://achoo-records.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successfully logged in
        const result = await response.json();
        setErrorMessage('');
        toast.success(result.message || 'Login successful!');
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        // Incorrect password or username doesn't exist
        const result = await response.json();
        setErrorMessage(result.message);
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md">
        <Heading mb={4}>Login</Heading>
        <Input
          placeholder="Username"
          mb={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            mb={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
          <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              backgroundColor="white" // Add this line to set the background color to white
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
        {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      </Box>
      <ToastContainer />
    </>
  );
};

export default Login;
