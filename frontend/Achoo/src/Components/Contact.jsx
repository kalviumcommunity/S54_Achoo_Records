// ContactPage.js

import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <Box p={8}>
      <VStack spacing={6} align="center">
        <Heading>Contact Us</Heading>
        <Text fontSize="lg">
          Have questions or feedback? We'd love to hear from you!
        </Text>

        {/* Contact Information */}
        <HStack spacing={4} align="start">
          <Text fontWeight="bold">Email:</Text>
          <Link href="mailto:s.arunkumar567567567@gmail.com">s.arunkumar567567567@gmail.com</Link>
        </HStack>

        <HStack spacing={4} align="start">
          <Text fontWeight="bold">Phone:</Text>
          <Text>(123) 456-7890</Text>
        </HStack>

        {/* Social Media Links */}
        <Heading size="md">Follow us on Social Media</Heading>
        <Flex>
          <HStack spacing={4}>
            <IconButton
              as={Link}
              href="https://twitter.com/example"
              icon={<Icon as={FaTwitter} />}
              isRound
            />
            <IconButton
              as={Link}
              href="https://facebook.com/example"
              icon={<Icon as={FaFacebook} />}
              isRound
            />
            <IconButton
              as={Link}
              href="https://instagram.com/example"
              icon={<Icon as={FaInstagram} />}
              isRound
            />
            <IconButton
              as={Link}
              href="https://linkedin.com/company/example"
              icon={<Icon as={FaLinkedin} />}
              isRound
            />
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ContactPage;
