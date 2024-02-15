import React from 'react'

import {Text } from '@chakra-ui/react'

import { useSpring, animated } from 'react-spring';

const Heading = () => {

  const globeProps = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    loop: true ,
  });


  return (

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
  )
}

export default Heading