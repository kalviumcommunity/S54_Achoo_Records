import React, { useState } from 'react';
import { Box, Heading, Input, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!username || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Ensure passwords match.');
        return;
      }

      const response = await axios.post('https://achoo-records.onrender.com/api/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        // Successfully signed up
        toast.success('Sign up successful! You can now log in.');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
        
      } else {
        const result = response.data;
        toast.error(result.message || 'Username already exists');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility} bgColor="white">
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          mb={4}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleToggleConfirmPasswordVisibility} bgColor="white">
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </Button>
        </InputRightElement>
      </InputGroup>
        <Button colorScheme="teal" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUp;
