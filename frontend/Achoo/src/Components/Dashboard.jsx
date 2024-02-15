import React from 'react'

import { Box, Grid,Image,Text,useStyleConfig } from '@chakra-ui/react'

import { useSpring, animated } from 'react-spring';

const Dashboard = () => {

  const globeProps = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    loop: true ,
  });


  return (
    
    <>

    <Text textAlign='center' color='#FFB02E' fontSize='7xl'>
      aCHOO
      <animated.span
      style={{
        display: 'inline-block',
        transform: globeProps.transform,
      }}
      role="img"
      aria-label="globe"
    >
      🤧
    </animated.span>
      rECORDS
    </Text>

    <Grid
      padding='3vw 10vw'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(3, 1fr)'
      gap='50px'
    >
    
    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>
    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>

    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>

    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>

    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>

    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>
    <Box  boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
          <Image borderRadius='28px 7px' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
    </Box>



    </Grid>
    </>
  )
}

export default Dashboard