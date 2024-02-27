import React, { useState } from 'react';
import { Box, Heading, Input, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { createCookie } from '../Cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Validate input
      if (!username || !password) {
        toast.error('Please fill in all fields');
        return;
      }
  
      const response = await axios.post(
        'https://achoo-records.onrender.com/api/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Assuming a successful response returns status 200
      if (response.status === 200) {
        const result = response.data;
        setErrorMessage('');
        toast.success(result.message || 'Login successful!');

        createCookie("username",username)
        createCookie("authToken",result.token)

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

      } else {
        // If the response status is not OK, handle the error
        console.error('Server error:', response.status);
        setErrorMessage('Login failed');
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Login failed');
      toast.error('Login failed');
    }
  };
  
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            mb={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" bgColor='white' size="sm" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
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
