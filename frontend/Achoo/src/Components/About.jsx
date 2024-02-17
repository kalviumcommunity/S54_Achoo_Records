import React from 'react'
import '../index.css'
import {Text, Box, Flex , Button ,useDisclosure,Slide,CloseButton} from '@chakra-ui/react'

const About = () => {

  const { isOpen ,onClose, onToggle } = useDisclosure()

  const handleClose = () => {
    onClose();
  };

  return (

        <>
          <Button variant='ghost' onClick={onToggle}>About</Button>
          <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
            <Box
              p='20px 50px'
              color='white'
              mt='4'
              bg='yellow.500'
              rounded='md'
              shadow='md'
            >

            <Flex justify="flex-end" pr={4}>
                <Box>
                    <CloseButton color='black' onClick={handleClose} />
                </Box>
            </Flex>

            <Text lineHeight='28px' fontSize='17px' fontWeight='600' color='black' p='10px 20px'>
                Achoo Records is an innovative website dedicated to curating a unique collection of sneezing cards. This platform embraces the whimsical world of sneezes, turning them into a creative and humorous art form. Achoo Records features a diverse array of sneezing-themed cards, each showcasing original designs and witty messages. From charming illustrations to clever wordplay, the collection captures the essence of sneezing in a lighthearted manner. Visitors can explore and purchase these one-of-a-kind cards, perfect for various occasions. Whether you seek a playful birthday greeting or a get-well-soon message, Achoo Records offers a delightful range that adds a touch of humor to the tradition of card-giving.
            </Text>

            </Box>  
          </Slide>
        </>


  )
}

export default About