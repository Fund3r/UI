import { Box, Image, Link, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

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
    contribution_list: string[];
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
  return (
    <Box p={5}>
      <Image src={project.logo_img} alt={project.project_name} />
      <Text fontSize="2xl" fontWeight="bold" mt={2}>{project.project_name}</Text>
      <Text fontSize="lg" color="gray.500" mt={2}>{project.tag_line}</Text>
      <Text mt={2}>{project.description}</Text>

      <Box mt={4}>
        <Text fontWeight="bold">Links:</Text>
        <Link href={project.link.x} color="blue.500" isExternal>X</Link>
        <Link href={project.link.github} color="blue.500" isExternal ml={2}>GitHub</Link>
        <Link href={project.link.telegram} color="blue.500" isExternal ml={2}>Telegram</Link>
        <Link href={project.link.website} color="blue.500" isExternal ml={2}>Website</Link>
        <Link href={project.link.discord} color="blue.500" isExternal ml={2}>Discord</Link>
      </Box>

      <Box mt={4}>
        <Text fontWeight="bold">Owner:</Text>
        <Text>{project.owner.name}</Text>
        <Text>{project.owner.email}</Text>
        <Image src={project.owner.profile_img} alt={project.owner.name} boxSize="50px" />
      </Box>

      <Box mt={4}>
        <Text fontWeight="bold">Elapsed Time:</Text>
        <Text>{project.elapsed_time}</Text>
      </Box>
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
