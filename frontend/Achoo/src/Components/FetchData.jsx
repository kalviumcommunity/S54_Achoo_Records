import React, { useState, useEffect } from 'react';
import { Grid, Image, Box, Skeleton, IconButton, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const FetchData = () => {
  const [achooData, setAchooData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://achoo-records.onrender.com/api/data');
        setAchooData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // Ask for confirmation before proceeding with deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this video?');
  
    if (!isConfirmed) {
      return; // Do nothing if the user cancels the confirmation
    }
  
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/api/delete/${id}`);
  
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Video deleted successfully!',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
          colorScheme: 'red', // Set the color scheme to red
        });
  
        // Update the state to reflect the deleted data
        setAchooData((prevData) => prevData.filter((data) => data._id !== id));
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete video. Please try again.',
          status: 'error',
          position: 'top-right', // Set the position to top-right
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  return (
    <>
      <Grid padding='3vw 10vw' gap='70px 60px' templateColumns='repeat(3, 1fr)'>
        {isLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} height='300px' borderRadius='15px 50px' />
            ))
          : achooData &&
            achooData.map((data) => (
              <div key={data._id}>
                <Box
                  position='relative'
                  _hover={{
                    '& .description': { opacity: 1 },
                    '& .image': { opacity: 0.5 },
                    '& .edit-button, & .delete-button': { opacity: 1 },
                  }}
                  transition='opacity 0.3s'
                >
                  <Skeleton isLoaded={true} height='100%'>
                    <Image src={data.image_link} alt='img' height='300px' borderRadius='15px 50px' className='image' />
                  </Skeleton>
                  <Box
                    className='description'
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    textAlign='center'
                    color='black'
                    fontWeight='bold'
                    fontSize='1vw'
                    opacity={0}
                    maxW='80%' // Set the max width to 80% of the parent container
                  >
                    {data.description}
                  </Box>
                  <Link to={`/edit/${data._id}`}>
                    <Box
                      className='edit-button'
                      position='absolute'
                      top='10px'
                      left='10px'
                      opacity={0}
                      zIndex={1}
                      backgroundColor='teal'
                      borderRadius='50%'
                    >
                      <IconButton
                        aria-label='Edit'
                        icon={<EditIcon />}
                        variant='ghost'
                        size='sm'
                      />
                    </Box>
                  </Link>
                  <Box
                    className='delete-button'
                    position='absolute'
                    top='10px'
                    right='20px'
                    opacity={0}
                    zIndex={1}
                    backgroundColor='red'
                    borderRadius='50%'
                  >
                    <IconButton
                      aria-label='Delete'
                      icon={<DeleteIcon />}
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(data._id)}
                    />
                  </Box>
                </Box>
              </div>
            ))}
      </Grid>
    </>
  );
};

export default FetchData;
