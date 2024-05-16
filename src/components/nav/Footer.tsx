import { Box, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from '../../images/logos/logo.svg';

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.200" py={10}>
      <Flex direction="column" align="center" justify="center" maxW="1200px" mx="auto" px={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="yellow.400">
          <Image src={logo} width={144} alt="" />
        </Text>
        <HStack spacing={10} mb={6}>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            About Us
          </Link>
          <span className="text-white mx-[24px]">|</span>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            Explore Projects
          </Link>
          <span className="text-white mx-[24px]">|</span>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            Explore Developers
          </Link>
          <span className="text-white mx-[24px]">|</span>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            My Profile
          </Link>
        </HStack>
        <HStack spacing={4} mb={6}>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            My Account
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            Return & Refund
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            Security & Privacy
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "yellow.400" }}>
            Terms & Conditionals
          </Link>
        </HStack>
        <HStack spacing={6} mb={4}>
          <Link href="#" _hover={{ color: "yellow.400" }}>
            <Icon as={FaFacebook} boxSize={5} />
          </Link>
          <Link href="#" _hover={{ color: "yellow.400" }}>
            <Icon as={FaInstagram} boxSize={5} />
          </Link>
          <Link href="#" _hover={{ color: "yellow.400" }}>
            <Icon as={FaTwitter} boxSize={5} />
          </Link>
          <Link href="#" _hover={{ color: "yellow.400" }}>
            <Icon as={FaLinkedin} boxSize={5} />
          </Link>
          <Link href="#" _hover={{ color: "yellow.400" }}>
            <Icon as={FaYoutube} boxSize={5} />
          </Link>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          © 2024 AR3NA. All Rights Reserved
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
