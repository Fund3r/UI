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
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchProfileDetails, updateProfile } from '../api';

export default function ProfilePage() {
  const { address } = useAccount();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    x: '',
    github: '',
    telegram: ''
  });
  const [avatar, setAvatar] = useState('');
  const toast = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      if (address) { // 確保 address 不為 undefined
        try {
          const data = await fetchProfileDetails(address);
          setName(data.name);
          setEmail(data.email);
          setSocialLinks(data.link);
          setAvatar(data.profile_img);
        } catch (error) {
          toast({
            title: "Failed to load profile",
            description: (error as Error).message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    };

    loadProfile();
  }, [address, toast]);

  const handleSocialLinkChange = (name: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setAvatar(reader.result.toString());
        } else {
          toast({
            title: "Error loading image",
            description: "Failed to load the image file.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async () => {
    const profileData = {
      name,
      email,
      address: address || '', // 確保 address 不為 undefined
      profile_img: avatar,
      project_img: [], // 默認空數組
      visible: true,
      link: socialLinks
    };

    try {
      await updateProfile(profileData);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: (error as Error).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const backgroundColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="1200px" m="auto" py="10px" px="40px">
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg={backgroundColor}
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg={backgroundColor}
          rounded="xl"
          boxShadow="lg"
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
                <Avatar size="xl" src={avatar || undefined}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={() => setAvatar('')} // Allow user to remove avatar
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" as={'label'} htmlFor="file-input">Change Icon</Button>
                <Input id="file-input" type={'file'} hidden accept="image/*" onChange={handleAvatarChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              placeholder={address || 'No Address Available'}
              _placeholder={{ color: 'gray.500' }}
              disabled
            />
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>User Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="link">
            <FormLabel>Social Media Links</FormLabel>
            <Input
              value={socialLinks.x}
              onChange={(e) => handleSocialLinkChange('x', e.target.value)}
              placeholder="X link"
              _placeholder={{ color: 'gray.500' }}
            />
            <Input
              value={socialLinks.github}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              placeholder="GitHub link"
              _placeholder={{ color: 'gray.500' }}
            />
            <Input
              value={socialLinks.telegram}
              onChange={(e) => handleSocialLinkChange('telegram', e.target.value)}
              placeholder="Telegram link"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg="blue.400"
              color="white"
              w="full"
              _hover={{ bg: 'blue.500' }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Container>
  );
}
