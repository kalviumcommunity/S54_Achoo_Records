import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import Contact from './Contact'
import About from './About'
import {Container,Text,Image, Box, Flex, PopoverArrow,Switch,useColorMode} from '@chakra-ui/react'

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const isDark = colorMode === 'dark'
  return (
	
	<Container as='div' maxWidth='f' p='20px 70px'>
  <Flex justifyContent='space-between' alignItems='center'>
    <Link to='/'>
      <Image src='' alt='logo' />
    </Link>

    <div style={{maxWidth:"25vw"}}>
      <Link style={{ textDecoration: 'none' , padding:"5px 10px"}} to='/about'>
        <span className="hover-effect">About</span>
      </Link>
      <Link style={{  textDecoration: 'none',padding:"5px 10px" }} to='/contact'>
        <span className="hover-effect">Contact</span>
      </Link>
      <a style={{  textDecoration: 'none',padding:"5px 10px" }} href='https://www.buymeacoffee.com/arun_kumar'>
        <span className="hover-effect">Buy Me a Coffee</span>
      </a>
    </div>

    <div>
      <Flex>
        <Link>
          <Box borderRadius='7px' p='7px 18px' mr='30px' bgColor='blue' color='white'>
            SignIn
          </Box>
        </Link>
        <Link>
          <Box borderRadius='7px' bgColor='black' mr='30px' p='7px 18px' color='white'>
            SignUp
          </Box>
        </Link>
        <Switch alignSelf='center' color='red' isChecked={isDark} onChange={toggleColorMode} />
      </Flex>
    </div>
  </Flex>
</Container>


  )
}

export default Navbar