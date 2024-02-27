import React, { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import {Container,Text,Image, Box, Flex,useColorMode, Button ,useDisclosure,Slide,CloseButton,IconButton} from '@chakra-ui/react'
import logo from '../assets/logo.png'
import { FiSun, FiMoon } from 'react-icons/fi';
import {getCookie , deleteCookie } from './Cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()

  const userCookie = getCookie("username")

  const { isOpen ,onClose, onToggle } = useDisclosure()

  const handleClose = () => {
    onClose();
  };

  const handleAddClick = () => {

    toast.error('Unauthorized ! Create an account ', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogout = async () => {
    try {

      const confirmLogout = window.confirm('Are you sure you want to log out?');
  
      if (!confirmLogout) {
        return;
      }
  
      deleteCookie("username");
      deleteCookie("authToken");
  
      toast.success('Logout successful', {
        position: 'top-right',
        autoClose: 1000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }; 

  return (
	
	<>
    <Container as='div' maxWidth='f' p='20px 70px'>
  <Flex justifyContent='space-between' alignItems='center'>
    <Link to='/'>
      <Image src={logo} />
    </Link>

    {
      userCookie ? 
      <Text size='large'>Hey {userCookie}👋</Text>
      :
      <></>

    }

    <div style={{maxWidth:"45vw"}}>
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
      <>
        {userCookie 
        
        ? 
        
        <Link style={{  textDecoration: 'none',padding:"5px 10px" }} to='/create'>

          <Button variant='ghost'> Add </Button>
          
        </Link>

        :

        <Button variant='ghost' onClick={handleAddClick}>
            Add
        </Button>

        }

      </>
      :
      <a style={{  textDecoration: 'none',padding:"5px 10px" }} href='https://www.buymeacoffee.com/arun_kumar'>
       <Button variant='ghost'> Buy Me a Coffee </Button>
      </a>
      :
      <Link style={{  textDecoration: 'none',padding:"5px 10px" }} to='/data'>
        <Button variant='ghost'>
              Posts
        </Button>
      </Link>
    </div>

    <div>
      <Flex>
        {
        userCookie ?

          <Button onClick={handleLogout} bgColor='blue' mr='30px' color='white' _hover={{ bgColor: 'blue.500' }}>Logout</Button> 
        :

        <div>

          <Link to='/login'>
              <Button bgColor='blue' mr='30px' color='white' _hover={{ bgColor: 'blue.500' }}>Login</Button>
          </Link>
          <Link to='/signup'>
            <Button bgColor='black' mr='30px' color='white' _hover={{ bgColor: 'gray.500' }} >SignUp</Button>
          </Link>
        </div>
        }
        <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
        />
      </Flex>
    </div>


    </Flex>
      </Container>
      <ToastContainer />
  </>


  )
}

export default Navbar