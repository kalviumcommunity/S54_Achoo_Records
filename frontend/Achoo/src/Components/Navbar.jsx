import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import Contact from './Contact'
import About from './About'
import {Container,Text,Image, Box, Flex, PopoverArrow,Switch,useColorMode, Button ,useDisclosure,Slide,CloseButton,IconButton} from '@chakra-ui/react'
import { withTheme } from '@emotion/react'
import logo from '../assets/logo.png'
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isDark = colorMode === 'dark'

  const { isOpen ,onClose, onToggle } = useDisclosure()

  const handleClose = () => {
    onClose();
  };

  return (
	
	<Container as='div' maxWidth='f' p='20px 70px'>
  <Flex justifyContent='space-between' alignItems='center'>
    <Link to='/'>
      <Image src={logo} />
    </Link>

    <div style={{maxWidth:"35vw"}}>
      <Link style={{ textDecoration: 'none' , padding:"5px 10px"}}> 
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
      </Link>
      :
      <Link style={{  textDecoration: 'none',padding:"5px 10px" }} to='/contact'>
        <Button variant='ghost'> Contact </Button>
      </Link>
      :
      <Link style={{  textDecoration: 'none',padding:"5px 10px" }} to='/contact'>
        <Button variant='ghost'> Add </Button>
      </Link>
      :
      <a style={{  textDecoration: 'none',padding:"5px 10px" }} href='https://www.buymeacoffee.com/arun_kumar'>
       <Button variant='ghost'> Buy Me a Coffee </Button>
      </a>
    </div>

    <div>
      <Flex>
        <Link to='/signin'>
        <Button bgColor='blue' mr='30px' color='white' _hover={{ bgColor: 'blue.500' }}>LogIn</Button>
        </Link>
        <Link to='/signup'>
          <Button bgColor='black' mr='30px' color='white' _hover={{ bgColor: 'gray.500' }} >SignUp</Button>
        </Link>
        <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
        />
      </Flex>
    </div>


  </Flex>
</Container>


  )
}

export default Navbar