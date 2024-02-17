import React, { useState, useEffect } from 'react';
import { Grid, Image, AspectRatio, Box, Skeleton } from '@chakra-ui/react';
import axios from 'axios';

const FetchData = () => {
  const [achooData, setAchooData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      {/* Use the Grid and Skeleton to create a layout with placeholders */}
      <Grid padding='3vw 10vw' gap='70px 60px' templateColumns='repeat(3, 1fr)'>
        {isLoading
          ? // Display Skeletons when data is being fetched
            Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} height='300px' borderRadius='15px 50px' />
            ))
          : // Display data when it's available
            achooData && achooData.map((data) => (
              <a href={data.video_link} key={data.id}>
                <Box
                  position='relative'
                  _hover={{
                    '& .description': { opacity: 1 },
                    '& .image': { opacity: 0.5 },
                  }}
                  transition='opacity 0.3s'
                >
                    <Skeleton isLoaded={true} height='100%'>
                      <Image  src={data.image_link} alt='img' height='300px' borderRadius='15px 50px' className='image' />
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
                    opacity={0} // Initially invisible
                  >
                    {data.description}
                  </Box>
                </Box>
              </a>
            ))}
      </Grid>
    </>
  );
};

export default FetchData;