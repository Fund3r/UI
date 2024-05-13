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
  Select,
  Stack,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

function CreateProjectForm() {
  const { handleSubmit, register, control, setValue, getValues, watch, formState: { errors } } = useForm();
  const toast = useToast();
  const [logo, setLogo] = useState('');
  const [projectImages, setProjectImages] = useState<string[]>([]);

  
  const onSubmit = (data) => {
    toast({
      title: "Project Created",
      description: "Your project has been successfully created!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(data);
  };

  const handleImageUpload = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) { // 确保 reader.result 不为 null
          const result = reader.result.toString();
          if (field === 'logo') {
            setLogo(result);
            setValue('logo', result);
          } else {
            const newImages = [...projectImages, result];
            if (newImages.length <= 3) {
              setProjectImages(newImages);
              setValue('projectImages', newImages);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
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
          <FormControl isInvalid={errors.projectName ? true : false}>
            <FormLabel>Project Name</FormLabel>
            <Input type="text" {...register("projectName", { required: "Project Name is required" })} />
            <FormErrorMessage>{errors.projectName && typeof errors.projectName.message === 'string' ? errors.projectName.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.tagLine ? true : false}>
            <FormLabel>Tag Line</FormLabel>
            <Controller
              name="tagLine"
              control={control}
              rules={{ required: "Tag Line is required" }}
              render={({ field }) => (
                <Select placeholder="Select option" {...field}>
                  <option value="defi">DeFi</option>
                  <option value="nft">NFT</option>
                  <option value="socialfi">SocialFi</option>
                  <option value="gamefi">GameFi</option>
                </Select>
              )}
            />
            <FormErrorMessage>{errors.tagLine && typeof errors.tagLine.message === 'string' ? errors.tagLine.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description ? true : false}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description", { required: "Description is required" })} />
            <FormErrorMessage>{errors.description && typeof errors.description.message === 'string' ? errors.description.message : null}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload('logo')} />
            {logo && <Image src={logo} alt="Project Logo" boxSize="100px" mt={2} />}
          </FormControl>
          <FormControl>
            <FormLabel>Project Images</FormLabel>
            <Input type="file" accept="image/*" multiple onChange={handleImageUpload('projectImages')} />
            <Flex wrap="wrap">
              {projectImages.map((img, index) => (
                <Box key={index} position="relative" m={2}>
                  <Image src={img} alt={`Project Image ${index + 1}`} boxSize="100px" />
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
            <FormLabel>Owner</FormLabel>
            <Input type="text" {...register("owner")} />
          </FormControl>
          <FormControl>
            <FormLabel>Social Links</FormLabel>
            <Stack spacing={3}>
              <Input type="text" placeholder="X link" {...register("socialLinks.x")} />
              <Input type="text" placeholder="GitHub link" {...register("socialLinks.github")} />
              <Input type="text" placeholder="Website" {...register("socialLinks.website")} />
            </Stack>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg">Create Project</Button>
        </VStack>
      </form>
    </Container>
  );
}

export default CreateProjectForm;
