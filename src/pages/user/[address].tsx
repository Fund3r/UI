import { Box, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

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
      <Image src={user.profile_img} alt={user.name} />
      <Text fontSize="2xl" fontWeight="bold" mt={2}>{user.name}</Text>
      <Text fontSize="lg" color="gray.500" mt={2}>{user.email}</Text>
      <Text mt={2}>{user.address}</Text>
      <Text mt={2}>Joined at: {user.elapsed_time}</Text>

      <Box mt={4}>
        <Text fontWeight="bold">Links:</Text>
        <Link href={user.link.x} color="blue.500" isExternal>X</Link>
        <Link href={user.link.github} color="blue.500" isExternal ml={2}>GitHub</Link>
        <Link href={user.link.telegram} color="blue.500" isExternal ml={2}>Telegram</Link>
      </Box>

      <Box mt={4}>
        <Text fontWeight="bold">Projects:</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px">
          {user.project_of_user.map((project, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
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

      <Box mt={4}>
        <Text fontWeight="bold">Contributions:</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px">
          {user.contribution_list.map((contribution, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={contribution.project_logo} alt={contribution.project_name} />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Text fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {contribution.project_name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Amount: {contribution.amount}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Contributed at: {contribution.elapsed_time}
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
