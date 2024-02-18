import React, { useState } from 'react';
import {
  VStack,
  Input,
  Textarea,
  Button,
  useToast,
  Box,
  Center,
  Heading,
} from '@chakra-ui/react';
import { ToastContainer, toast as notifyToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';

const EditData = () => {
  const [formData, setFormData] = useState({
    video_link: '',
    image_link: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { video_link, image_link, description } = formData;
  const { id } = useParams();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!video_link || !image_link || !description) {
        notifyToast.error('Please fill all the fields');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        notifyToast.success('Video edited successfully!');

        setFormData({
          video_link: '',
          image_link: '',
          description: '',
        });

        // Redirect to the home page ("/") after successful edit with a delay of 3 seconds
        setTimeout(() => {
          // Use Link to navigate to the desired path
          window.location.href = "/";
        }, 3000);
      } else {
        const result = await response.json();
        notifyToast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      notifyToast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Center>
        <Box maxW="lg" w="full">
          <VStack spacing={4}>
            <Heading mb={4}>Edit Sneeze Video</Heading>
            <Input
              placeholder="New Video Link"
              value={video_link}
              onChange={(e) =>
                setFormData({ ...formData, video_link: e.target.value })
              }
            />
            <Input
              placeholder="New Image Link"
              value={image_link}
              onChange={(e) =>
                setFormData({ ...formData, image_link: e.target.value })
              }
            />
            <Textarea
              placeholder="Description (Max 10 words)"
              value={description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              maxLength={60}
            />
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </Center>
      <ToastContainer />
    </>
  );
};

export default EditData;
