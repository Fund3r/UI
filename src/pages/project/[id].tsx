import { Box, Button, Icon, Image, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { FaDiscord, FaGithub, FaGlobe, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { TransferTokenCard } from '../../features/transfer/TransferTokenCard';

type ProjectDetailProps = {
  project: {
    project_name: string;
    tag_line: string;
    description: string;
    logo_img: string;
    project_img: string[];
    link: {
      x: string;
      github: string;
      telegram: string;
      website: string;
      discord: string;
    };
    contribution_list: {
      project_name: string;
      project_logo: string;
      amount: number;
      elapsed_time: string;
    }[];
    owner: {
      name: string;
      email: string;
      address: string;
      profile_img: string;
    };
    elapsed_time: string;
  };
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const [showTransferTokenCard, setShowTransferTokenCard] = useState(false);

  const toggleTransferTokenCard = () => {
    setShowTransferTokenCard(!showTransferTokenCard);
  };

  console.log(project)

  return (
    <Box p={5}>
      <Box display="flex" alignItems="center" mb={6}>
        <Image src={project.logo_img} alt={project.project_name} borderRadius="full" boxSize="150px" />
        <Box ml={6}>
          <Text fontSize="3xl" fontWeight="bold">{project.project_name}</Text>
          <Text fontSize="lg" color="gray.500" mt={2}>{project.tag_line}</Text>
          <Text mt={4}>{project.description}</Text>
          <Box mt={4}>
            <Button onClick={toggleTransferTokenCard} bg="black" color="white" _hover={{ bg: 'green' }} mr={2}>
              Sponsor Me
            </Button>
            <Link href={project.link.x} isExternal mx={2}>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link href={project.link.github} isExternal mx={2}>
              <Icon as={FaGithub} boxSize={6} />
            </Link>
            <Link href={project.link.telegram} isExternal mx={2}>
              <Icon as={FaTelegramPlane} boxSize={6} />
            </Link>
            <Link href={project.link.website} isExternal mx={2}>
              <Icon as={FaGlobe} boxSize={6} />
            </Link>
            <Link href={project.link.discord} isExternal mx={2}>
              <Icon as={FaDiscord} boxSize={6} />
            </Link>
          </Box>
        </Box>
      </Box>

      {showTransferTokenCard && <TransferTokenCard ownerAddress={project.owner.address} />}
      
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Sponsor List</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>{project.description}</Text>
          </TabPanel>
          <TabPanel>
            <Text>Sponsor List content goes here...</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${id}`);
  return {
    props: {
      project: response.data.data,
    },
  };
};

export default ProjectDetail;
