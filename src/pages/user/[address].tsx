import { Box, Button, Icon, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FaGithub, FaTelegramPlane, FaTwitter } from 'react-icons/fa';

type UserDetailProps = {
  user: {
    name: string;
    email: string;
    address: string;
    profile_img: string;
    elapsed_time: string;
    project_of_user: {
      logo_img: string;
      project_name: string;
      tag_line: string;
      owner_name: string;
      owner_address: string;
      elapsed_time: string;
    }[];
    contribution_list: {
      project_name: string;
      project_logo: string;
      amount: number;
      elapsed_time: string;
    }[];
    link: {
      x: string;
      github: string;
      telegram: string;
    };
  };
};

const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <Box p={5}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={6}>
        <Image src={user.profile_img} alt={user.name} borderRadius="full" boxSize="150px" />
        <Box ml={6}>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>{user.name}</Text>
          <Text fontSize="lg" color="gray.500" mt={2}>{user.email}</Text>
          <Text mt={2}>{user.address}</Text>
          <Text mt={2}>Joined at: {user.elapsed_time}</Text>

          <Box mt={4}>
            <Button bg="black" color="white" _hover={{ bg: 'green' }} mr={2}>Sponsor Me</Button>
              <Link href={user.link.x} isExternal mx={2}>
                <Icon as={FaTwitter} boxSize={6} />
              </Link>
              <Link href={user.link.github} isExternal mx={2}>
                <Icon as={FaGithub} boxSize={6} />
              </Link>
              <Link href={user.link.telegram} isExternal mx={2}>
                <Icon as={FaTelegramPlane} boxSize={6} />
              </Link>
          </Box>
        </Box>
      </Box>

      <Box mt={4}>
        <Text fontWeight="bold">My Project</Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
          {user.project_of_user.map((project, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
              <Image src={project.logo_img} alt={project.project_name} />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Text fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {project.project_name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    {project.tag_line}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Created at: {project.elapsed_time}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { address } = context.params!;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${address}`);
  return {
    props: {
      user: response.data.data,
    },
  };
};

export default UserDetail;
