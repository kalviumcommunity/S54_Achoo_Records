import React from 'react'
import datas from '../../../../Backend/SneezeRecords.json'
import { Box, Center, Grid, GridItem,Image,Text,useStyleConfig } from '@chakra-ui/react'

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
      {datas.map((data,i)=>{
        return (
            <Box key={i} boxSize='xs' bgColor='#F9EFDB' borderRadius='30px'>
              <Image borderRadius='28px 7px' src={data.image} />
            </Box>
        )
      })}
    </Grid>
    </>
  )
}

export default Dashboard