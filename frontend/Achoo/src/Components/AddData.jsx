// VideoForm.js

import React, { useState } from 'react';
import { VStack, Input, Textarea, Button, useToast, Box, Center, Heading } from '@chakra-ui/react';
import { ToastContainer, toast as notifyToast } from 'react-toastify'; // Rename 'toast' to 'notifyToast'
import 'react-toastify/dist/ReactToastify.css';

const AddData = () => {
  const [videoLink, setVideoLink] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      // Check if all fields are filled
      if (!videoLink || !imageLink || !description) {
        notifyToast.error('Please fill all the fields');
        return;
      }

      // Send data to backend for adding to the database
      const response = await fetch('/api/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoLink, imageLink, description }),
      });

      if (response.ok) {
        // Successfully added to the database
        notifyToast.success('Video added successfully!');
        setVideoLink('');
        setImageLink('');
        setDescription('');
      } else {
        const result = await response.json();
        notifyToast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Center>
        <Box maxW="lg" w="full">
          <VStack spacing={4}>
            <Heading mb={4}>Add Your Own Sneeze Video</Heading>
            <Input
              placeholder="Video Link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <Input
              placeholder="Image Link"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <Textarea
              placeholder="Description (Max 10 words)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={60}
            />
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Center>
      <ToastContainer />
    </>
  );
};

export default AddData;
