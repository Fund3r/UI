import { Container } from "@chakra-ui/react";
import type { NextPage } from 'next';
import Form from '../components/form/Form';

const CreateProject: NextPage = () => {
  return (
    <Container maxW={"1200px"} m={"auto"} py={"10px"} px={"40px"}>
        {/* <Heading>Create Project</Heading> */}
        {/* <Text>Just simply create a project</Text> */}
        <Form />
    </Container>
  )
};

export default CreateProject;