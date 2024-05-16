import { Box, Image, Link, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
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
        <TabList>
          <Tab>Projects</Tab>
          <Tab>Users</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing="20px">
                {projects.map((project, index) => (
                  <Link href={`/project/${project.id}`} key={index}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
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
                    <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
                      <Image src={user.profile_img} alt={user.name} />
                      <Box p="6">
                        <Box display="flex" alignItems="baseline">
                          <Text fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                            {user.name}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Joined at: {user.elapsed_time}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            GitHub: <Link href={user.link.github} color="blue.500" isExternal>{user.link.github}</Link>
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            Telegram: <Link href={user.link.telegram} color="blue.500" isExternal>{user.link.telegram}</Link>
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">
                            X: <Link href={user.link.x} color="blue.500" isExternal>{user.link.x}</Link>
                          </Text>
                        </Box>
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
