// SignUp.js
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
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      // Validate input
      if (!username || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Ensure passwords match.');
        return;
      }

      // Send data to backend for signup
      const response = await fetch('https://achoo-records.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        // Successfully signed up
        toast.success('Sign up successful! You can now log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          // Use Link to navigate to the desired path
          window.location.href = "/login";
        }, 1000);
      } else {
        const result = await response.json();
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md">
        <Heading mb={4}>Sign Up</Heading>
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
              backgroundColor="white"
              opacity={1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          mb={4}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUp;