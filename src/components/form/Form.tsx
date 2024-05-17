import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  Stack,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProject } from '../../pages/api';

function Form() {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm();
  const toast = useToast();
  const [logo, setLogo] = useState<File | null>(null);
  const [projectImages, setProjectImages] = useState<File[]>([]);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('project_name', data.project_name);
      formData.append('tag_line', data.tag_line);
      formData.append('description', data.description);
      if (logo) {
        formData.append('logo_img', logo);
      }
      projectImages.forEach((image, index) => {
        formData.append(`project_images`, image);
      });
      formData.append('email', data.email);
      formData.append('address', data.address);
      formData.append('x_url', data.x_url);
      formData.append('github_url', data.github_url);
      formData.append('website_url', data.website_url);
      formData.append('discord_url', data.discord_url);
      formData.append('telegram_url', data.telegram_url);

      await createProject(formData);
      toast({
        title: "Project Created",
        description: "Your project has been successfully created!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleImageUpload = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (field === 'logo') {
        setLogo(file);
        setValue('logo', file);
      } else {
        const newImages = [...projectImages, file];
        if (newImages.length <= 3) {
          setProjectImages(newImages);
          setValue('projectImages', newImages);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = projectImages.filter((_, i) => i !== index);
    setProjectImages(newImages);
    setValue('projectImages', newImages);
  }

  useEffect(() => {
    register('logo');
    register('projectImages');
  }, [register]);

  return (
    <Container maxW="container.md" mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5}>
          <FormControl isInvalid={errors.project_name ? true : false}>
            <FormLabel>Project Name</FormLabel>
            <Input type="text" {...register("project_name", { required: "Project Name is required" })} />
            <FormErrorMessage>{errors.project_name && typeof errors.project_name.message === 'string' ? errors.project_name.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.tag_line ? true : false}>
            <FormLabel>Tag Line</FormLabel>
            <Input type="text" {...register("tag_line", { required: "Tag Line is required" })} />
            <FormErrorMessage>{errors.tag_line && typeof errors.tag_line.message === 'string' ? errors.tag_line.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description ? true : false}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description", { required: "Description is required" })} />
            <FormErrorMessage>{errors.description && typeof errors.description.message === 'string' ? errors.description.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload('logo')} />
            {logo && <Image src={URL.createObjectURL(logo)} alt="Project Logo" boxSize="100px" mt={2} />}
          </FormControl>
          <FormControl>
            <FormLabel>Project Images</FormLabel>
            <Input type="file" accept="image/*" multiple onChange={handleImageUpload('projectImages')} />
            <Flex wrap="wrap">
              {projectImages.map((img, index) => (
                <Box key={index} position="relative" m={2}>
                  <Image src={URL.createObjectURL(img)} alt={`Project Image ${index + 1}`} boxSize="100px" />
                  <IconButton
                    aria-label="Remove image"
                    icon={<SmallCloseIcon />}
                    position="absolute"
                    right="0"
                    top="0"
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeImage(index)}
                  />
                </Box>
              ))}
            </Flex>
          </FormControl>
          <FormControl isInvalid={errors.email ? true : false}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email", { required: "Email is required" })} />
            <FormErrorMessage>{errors.email && typeof errors.email.message === 'string' ? errors.email.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Owner Address</FormLabel>
            <Input type="text" {...register("address")} />
          </FormControl>
          <FormControl>
            <FormLabel>Social Links</FormLabel>
            <Stack spacing={3}>
              <Input type="text" placeholder="X link" {...register("x_url")} />
              <Input type="text" placeholder="GitHub link" {...register("github_url")} />
              <Input type="text" placeholder="Website" {...register("website_url")} />
              <Input type="text" placeholder="Discord link" {...register("discord_url")} />
              <Input type="text" placeholder="Telegram link" {...register("telegram_url")} />
            </Stack>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg">Create Project</Button>
        </VStack>
      </form>
    </Container>
  );
}

export default Form;
