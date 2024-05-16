import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css';
import { fetchProjectList } from './api';

const ExplorerPage: NextPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState('');

  // console.log(process.env.NEXT_PUBLIC_BASE_URL)

  useEffect(() => {
    const loadProjectList = async () => {
      try {
        const data = await fetchProjectList();
        setProjectList(data.data);
      } catch (error) {
        // setError(error.message);
        setError('Error');
      }
    };

    loadProjectList();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projectList.length) {
    return <div>Loading projects...</div>;
  }

  return (
    <Container maxW={"1200px"} m={"auto"} py={"10px"} px={"40px"}>
        <Heading>Explore Projects</Heading>
        {/* <Text>Browse and contribute projects</Text> */}
        {/* <ul>
          {projectList.map((project, index) => (
            <li key={index}>
              <img src={`data:image/png;base64,${project.logo_img}`} alt={project.project_name} style={{ width: 50, height: 50 }} />
              <h2>{project.project_name}</h2>
              <p>{project.tag_line}</p>
              <p>Owner: {project.owner_name}</p>
            </li>
          ))}
        </ul> */}
        <Flex display='flex' gap='25' marginTop='50'>
            <Button
                marginRight='5'
                borderRadius='30'
                border='solid white 1px'
                textColor='black'
                _hover={{background: "linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)", border: "none", textColor: "white"}}
            >
                Project
            </Button>
            <Button
                marginRight='5'
                borderRadius='30'
                textColor='black'
                border='solid white 1px'
                _hover={{background: "linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)", border: "none", textColor: "white"}}
            >
                User
            </Button>
            <div style={{ marginLeft: 'auto' }}>
                {/* <SearchBar /> */}
            </div>
        </Flex>

        <Grid
            templateColumns='repeat(3, 1fr)'
            gridColumnGap='25px'
            gridRowGap='50px'
            pt={'20px'}
        >
            <GridItem
                w='300px'
                h='425px'
                backdropFilter='blur(10px)'
                bg='rgba(255, 255, 255, 0.1)'
                position='relative'
                borderRadius='20px'
                display='flex'
                justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
                <Box  className={utilStyles.img}>
                    <Image
                        src='images/NFT5.png'
                        w='100%'
                        h='100%'
                        objectFit="cover"
                    />
                </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                    >
                        <Text fontSize='24' textColor='white' fontWeight='600'>
                            Reox Fancxy
                        </Text>
                        <Text opacity='0.5' textColor='white' fontSize='12px'>
                            @hibnastiar
                        </Text>
                    </Box>
                    <Box>
                        <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                            0.8 ETH
                        </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                    <Button
                        borderRadius='12px'
                        border='solid white 1px'
                        textColor='black'
                        w='275px'
                        h='55px'
                        display="none"
                        className={utilStyles.btn}
                        fontSize="18px"
                        _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                    >
                        Sponsor
                    </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
            <GridItem
            w='300px'
            h='425px'
            backdropFilter='blur(10px);'
            bg='rgba(255, 255, 255, 0.1)'
            position='relative'
            borderRadius='20px'
            display='flex'
            justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
            <Box  className={utilStyles.img}>
            <Image
                src='images/NFT11.png'
                w='100%'
                h='100%'
                objectFit="cover"
            
            />
            </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                display='flex'
                flexDirection='column'
                className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    >
                    <Text fontSize='24' textColor='white' fontWeight='600'>
                        Reox Fancxy
                    </Text>
                    <Text opacity='0.5' textColor='white' fontSize='12px'>
                        @hibnastiar
                    </Text>
                    </Box>
                    <Box>
                    <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                        0.8 ETH
                    </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                <Button
                borderRadius='12px'
                border='solid white 1px'
                textColor='black'
                w='275px'
                h='55px'
                display="none"
                className={utilStyles.btn}
                _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                >
                Sponsor
                </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
            <GridItem
            w='300px'
            h='425px'
            backdropFilter='blur(10px);'
            bg='rgba(255, 255, 255, 0.1)'
            position='relative'
            borderRadius='20px'
            display='flex'
            justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
            <Box  className={utilStyles.img}>
            <Image
                src='images/NFT7.png'
                w='100%'
                h='100%'
                objectFit="cover"
            
            />
            </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                display='flex'
                flexDirection='column'
                className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    >
                    <Text fontSize='24' textColor='white' fontWeight='600'>
                        Reox Fancxy
                    </Text>
                    <Text opacity='0.5' textColor='white' fontSize='12px'>
                        @hibnastiar
                    </Text>
                    </Box>
                    <Box>
                    <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                        0.8 ETH
                    </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                <Button
                borderRadius='12px'
                border='solid white 1px'
                textColor='black'
                w='275px'
                h='55px'
                display="none"
                className={utilStyles.btn}
                _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                >
                Sponsor
                </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
            <GridItem
            w='300px'
            h='425px'
            backdropFilter='blur(10px);'
            bg='rgba(255, 255, 255, 0.1)'
            position='relative'
            borderRadius='20px'
            display='flex'
            justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
            <Box  className={utilStyles.img}>
            <Image
                src='images/NFT8.png'
                w='100%'
                h='100%'
                objectFit="cover"
            
            />
            </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                display='flex'
                flexDirection='column'
                className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    >
                    <Text fontSize='24' textColor='white' fontWeight='600'>
                        Reox Fancxy
                    </Text>
                    <Text opacity='0.5' textColor='white' fontSize='12px'>
                        @hibnastiar
                    </Text>
                    </Box>
                    <Box>
                    <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                        0.8 ETH
                    </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                <Button
                borderRadius='12px'
                border='solid white 1px'
                textColor='black'
                w='275px'
                h='55px'
                display="none"
                className={utilStyles.btn}
                _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                >
                Sponsor
                </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
            <GridItem
            w='300px'
            h='425px'
            backdropFilter='blur(10px);'
            bg='rgba(255, 255, 255, 0.1)'
            position='relative'
            borderRadius='20px'
            display='flex'
            justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
            <Box  className={utilStyles.img}>
            <Image
                src='images/NFT9.png'
                w='100%'
                h='100%'
                objectFit="cover"
            
            />
            </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                display='flex'
                flexDirection='column'
                className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    >
                    <Text fontSize='24' textColor='white' fontWeight='600'>
                        Reox Fancxy
                    </Text>
                    <Text opacity='0.5' textColor='white' fontSize='12px'>
                        @hibnastiar
                    </Text>
                    </Box>
                    <Box>
                    <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                        0.8 ETH
                    </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                <Button
                borderRadius='12px'
                border='solid white 1px'
                textColor='black'
                w='275px'
                h='55px'
                display="none"
                className={utilStyles.btn}
                _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                >
                Sponsor
                </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
            <GridItem
            w='300px'
            h='425px'
            backdropFilter='blur(10px);'
            bg='rgba(255, 255, 255, 0.1)'
            position='relative'
            borderRadius='20px'
            display='flex'
            justifyContent='center'
            >
            <Flex display="flex" flexDirection="column" paddingTop="15px" paddingLeft="10px" paddingRight="10px" justifyContent="space-between" className={utilStyles.container}>
            <Box  className={utilStyles.img}>
            <Image
                src='images/NFT10.png'
                w='100%'
                h='100%'
                objectFit="cover"
            
            />
            </Box>
            <Flex
                justifyContent='space-around'
                alignItems='center'
                paddingBottom="20px"
            >
                <Box
                display='flex'
                flexDirection='column'
                className={utilStyles.cont}
                >
                <Box
                    display='flex'
                    w='275px'
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    >
                    <Text fontSize='24' textColor='white' fontWeight='600'>
                        Reox Fancxy
                    </Text>
                    <Text opacity='0.5' textColor='white' fontSize='12px'>
                        @hibnastiar
                    </Text>
                    </Box>
                    <Box>
                    <Text textColor='yellow' fontSize='24px' fontWeight='700'>
                        0.8 ETH
                    </Text>
                    </Box>
                </Box>

                <Box  alignItems="flex-start" >
                <Button
                borderRadius='12px'
                border='solid white 1px'
                textColor='black'
                w='275px'
                h='55px'
                display="none"
                className={utilStyles.btn}
                _hover={{background: 'linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)', textColor: "white", border:"none", fontSize: "20px"}}
                >
                Sponsor
                </Button>
                </Box>
                </Box>
            </Flex>
            </Flex>
            </GridItem>
        </Grid>

        <div style={ { textAlign: 'center' }}>
            <Button
                marginRight='5'
                borderRadius='30'
                border='solid white 1px'
                textColor='black'
                marginTop='10'
                _hover={{background: "linear-gradient(90deg, rgba(255,165,64,1) 12%, rgba(255,225,104,1) 100%)", border: "none", textColor: "white"}}
            >
                View More
            </Button>
        </div>
        
    </Container>
  );
};

export default ExplorerPage;