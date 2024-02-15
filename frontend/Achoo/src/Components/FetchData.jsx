import React, { useState, useEffect } from 'react';
import { Grid, Image, AspectRatio, Box } from '@chakra-ui/react';
import axios from 'axios';

const FetchData = () => {
  const [achooData, setAchooData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://achoo-records.onrender.com/api/data');
        setAchooData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid padding='3vw 10vw' gap='70px 60px' templateColumns='repeat(3, 1fr)'>
        {achooData &&
          achooData.map((data) => {
            return (
              <a href={data.video_link} key={data.id}>
                <Box
                  position='relative'
                  _hover={{
                    '& .description': { opacity: 1 },
                    '& .image': { opacity: 0.4 },
                  }}
                  transition='opacity 0.3s'
                >
                  <AspectRatio maxW='400px'>
                    <Image borderRadius='15px 50px' src={data.image_link} alt='img' objectFit='cover' className='image' />
                  </AspectRatio>
                  <Box
                  
                    className='description'
                    position='absolute'
                    top='50%'
                    left='50%'
                    transform='translate(-50%, -50%)'
                    textAlign='center'
                    color='black'
                    fontWeight='bold'
                    fontSize='1.5vw'
                    opacity={0} // Initially invisible
                  >
                    {data.description}
                  </Box>
                </Box>
              </a>
            );
          })}
      </Grid>
    </>
  );
};

export default FetchData;
