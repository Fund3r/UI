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
  const [visible, setVisible] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    x: '',
    github: '',
    telegram: ''
  });
  const [avatar, setAvatar] = useState({ file: null, preview: '' });
  const toast = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      if (address) {
        try {
          const response = await fetchProfileDetails(address);
          setName(response.data.name);
          setEmail(response.data.email);
          setSocialLinks(response.data.link);
          setAvatar(prev => ({ ...prev, preview: response.data.profile_img || '' }));
          setVisible(response.data.visible)
        } catch (error) {
          setName('');
          setEmail('');
          setSocialLinks({ x: '', github: '', telegram: '' });
          setAvatar({ file: null, preview: '' });
          setVisible(false);
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
          setAvatar({
            file: file,
            preview: reader.result.toString()
          });
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
    const formData = {
      name,
      email,
      address,
      visible,
      profile_img: avatar.file,
      x_url: socialLinks.x,
      github_url: socialLinks.github,
      telegram_url: socialLinks.telegram,
    };

    try {
      await updateProfile(formData);
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
                <Avatar size="xl" src={avatar.preview || undefined}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={() => setAvatar({ file: null, preview: '' })} // Allow user to remove avatar
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" as={'label'} htmlFor="file-input">Change Profile Picture</Button>
                <Input id="file-input" type={'file'} hidden accept="image/*" onChange={handleAvatarChange} />
              </Center>
            </Stack>
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
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              placeholder={address || 'No Address Available'}
              _placeholder={{ color: 'gray.500' }}
              disabled
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              disabled={email !== ''}
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
