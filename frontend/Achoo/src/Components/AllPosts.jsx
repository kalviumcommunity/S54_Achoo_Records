import React, { useState, useEffect } from 'react';
import { Select, VStack, Text, Box, Divider, Flex } from '@chakra-ui/react';
import { Grid, Image, Skeleton, useToast } from '@chakra-ui/react';

import axios from 'axios';

const AllPosts = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://achoo-records.onrender.com/api/users`);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = async (event) => {
    const selectedUserId = event.target.value;
    setSelectedOption(selectedUserId);

    try {
      const response = await axios.get(`https://achoo-records.onrender.com/api/data/${selectedUserId}`);
      setSelectedUserData(response.data.record);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setSelectedUserData([]);
      toast({
        title: 'Error',
        description: 'Failed to fetch user data. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex mt={8} ml={4}>
      <Box width="25vw">
        <VStack spacing={4} align="center">
          <Text fontSize="xl" fontWeight="bold">Select a user:</Text>
          <Select
            size="md"
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder=""
            width="100%"
            variant="filled"
            colorScheme="teal"
          >
            {options.map((option, i) => (
              <option key={i} value={option.id}>{option.username}</option>
            ))}
          </Select>
        </VStack>
      </Box>

      <Divider orientation="vertical" mx={2} height="100%" />

      <Flex direction="column" justify="space-between" align="stretch" width="100%">
        <Box flex="1" width='75vw'>
          {selectedUserData.length > 0 ? (
            <Grid gap='50px' padding=' 0 5vw' templateColumns='repeat(2, 1fr)'>
              {selectedUserData.map((data) => (
                <div style={{ width: "30vw" }} key={data._id}>
                  <Box
                    position='relative'
                    _hover={{
                      '& .description': { opacity: 1 },
                      '& .image': { opacity: 0.5 },
                    }}
                    transition='opacity 0.3s'
                  >
                    <Skeleton isLoaded={true} height='100%'>
                      <a href={data.video_link}>
                        <Image src={data.image_link} alt='img' height='300px' borderRadius='15px 50px' className='image' />
                      </a>
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
                      maxW='80%'
                    >
                      {data.description}
                    </Box>
                  </Box>
                </div>
              ))}
            </Grid>
          ) : (
            <Flex align="center" justify="center" height="100%">
              <Text fontSize="2xl" fontWeight="bold">
                No Posts Available
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AllPosts;
