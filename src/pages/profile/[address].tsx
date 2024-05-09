import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';

// function connectionStatus() {
//   const chain = useChain();
//   const status = useConnectionStatus();

//   if (status === "unknown") return <p> Loading... </p>;
//   if (status === "disconnected") return <p> disconnected </p>;
//   if (status === "connecting") return <p> connecting... </p>;
 
//   if (chain) {
//     return <p> Connected to {chain.name} </p>;
//   }
 
//   return <p> Connected to an unsupported network </p>;
// }


export default function ProfilePage() {
  const { address } = useAccount();

  return (
      <Container maxW={"1200px"} m={"auto"} py={"10px"} px={"40px"}>
          <Flex
              minH={'100vh'}
              align={'center'}
              justify={'center'}
              bg={useColorModeValue('dark', 'dark')}>
              <Stack
                  spacing={4}
                  w={'full'}
                  maxW={'md'}
                  bg={useColorModeValue('dark', 'dark')}
                  rounded={'xl'}
                  boxShadow={'lg'}
                  p={6}
                  my={12}
              >
                  <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                      User Profile Edit
                  </Heading>
                  <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                        {/* <Avatar size="xl" src="https://bit.ly/sage-adebayo"> */}
                        <Avatar size="xl" src="">
                            <AvatarBadge
                            as={IconButton}
                            size="sm"
                            rounded="full"
                            top="-10px"
                            colorScheme="red"
                            aria-label="remove Image"
                            icon={<SmallCloseIcon />}
                            />
                        </Avatar>
                        </Center>
                        <Center w="full">
                        <Button w="full">Change Icon</Button>
                        </Center>
                    </Stack>
                  </FormControl>
                  <FormControl id="address">
                    <FormLabel>Address</FormLabel>
                    <Input
                        placeholder={address}
                        _placeholder={{ color: 'black' }}
                        type="email"
                        disabled
                    />
                  </FormControl>
                  <FormControl id="userName" isRequired>
                    <FormLabel>User name</FormLabel>
                    <Input
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                    />
                  </FormControl>
                  <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                      bg={'blue.400'}
                      color={'white'}
                      w="full"
                      _hover={{
                      bg: 'blue.500',
                  }}>
                      Update
                  </Button>
                  </Stack>
              </Stack>
          </Flex>
      </Container>
  )
}