import { Box, Button, Flex, Icon, Image, Input, Link, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaGithub, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { fetchProfileList, fetchProjectList } from './api';

type Project = {
  id: number;
  project_name: string;
  tag_line: string;
  logo_img: string;
  owner: {
    name: string;
    email: string;
    address: string;
    profile_img: string;
  };
  elapsed_time: string;
};

type User = {
  name: string;
  profile_img: string;
  link: {
    x: string;
    github: string;
    telegram: string;
  };
  elapsed_time: string;
  address: string;
};

const ExplorerPage: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await fetchProjectList();
        setProjects(data);
      } else if (activeTab === 'users') {
        const { data } = await fetchProfileList();
        setUsers(data);
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box p={5}>
      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index === 0 ? 'projects' : 'users')}>
        <Flex alignItems="center" mb={4}>
          <Text fontSize="3xl" fontWeight="bold">Explore</Text>
          <div className='ml-5'>
            <TabList>
              <Tab>Projects</Tab>
              <Tab>Creators</Tab>
            </TabList>
          </div>
        </Flex>
        <Text fontSize="md" color="gray.600" mb={4}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        
        <Flex my={4} alignItems="center">
          <Input placeholder="Explore your favorite ..." mr={2} />
          <Button colorScheme="blackAlpha">Search</Button>
        </Flex>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
                {projects.map((project, index) => (
                  <Link href={`/project/${project.id}`} key={index}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
                      <img src={project.logo_img} alt={project.project_name} />
                      <Box p="4">
                        <Text fontSize="lg" fontWeight="bold" mb={2}>{project.project_name}</Text>
                        <Text fontSize="md" mb={2}>{project.tag_line}</Text>
                        <Text fontSize="sm" color="gray.500">{project.elapsed_time}</Text>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            )}
          </TabPanel>

          <TabPanel>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing="20px">
                {users.map((user, index) => (
                  <Link href={`/user/${user.address}`} key={index}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white" textAlign="center" p={6}>
                      <Image src={user.profile_img} alt={user.name} borderRadius="full" boxSize="100px" mx="auto" />
                      <Box mt={4}>
                        <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
                        {/* <Text fontSize="sm" color="gray.500" mb={4}>Web Developer</Text> */}
                        <Flex justifyContent="center" mt={4}>
                          <Link href={user.link.x} isExternal mx={2}>
                            <Icon as={FaTwitter} boxSize={6} />
                          </Link>
                          <Link href={user.link.github} isExternal mx={2}>
                            <Icon as={FaGithub} boxSize={6} />
                          </Link>
                          <Link href={user.link.telegram} isExternal mx={2}>
                            <Icon as={FaTelegramPlane} boxSize={6} />
                          </Link>
                        </Flex>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ExplorerPage;
