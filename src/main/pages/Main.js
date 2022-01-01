import {
  VStack,
  Image,
  Heading,
  Box,
  Center,
  Divider,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';

import presentation2 from '../../assets/presentation2.svg';
import PlacesList from '../../shared/components/PlacesList';

const dummyPlaces = [
    {
        id:"p1",
        picture:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        adress:"Piazza del Colosseo, 1, 00184 Roma RM, Italia",
        likes:12,
        title:"Roman coliseum",
        city:"Rome",
        country:"Italy",
        description:"Just a plain old regular colisseum",
        creatorId:"u1",
        mapsUrl:"https://goo.gl/maps/BXABiiaUEDd2cZmg6"
    },

]

const Main = () => {
  const isLowRes = useMediaQuery('(max-width:680px)');

  return (
    <VStack spacing="50px" mb="100px">
      <Box textAlign={'center'}>
        <Center>
          <Image w="60%" maxWidth={'600px'} mt="50px" src={presentation2} />
        </Center>
        <Center mt="20px">
          <Heading w="60%" size={isLowRes ? 'md' : 'xl'} mt="20px">
            Share your experiences with other fellow <b>travellers</b> and
            discover places from all around the globe
          </Heading>
        </Center>
      </Box>

      <VStack spacing={'10px'}>
        <Link to="/auth"> 
        <Button colorScheme={'orange'} w="125px">
          Sign in!
        </Button>
        </Link>
        <NavLink to="/auth"><Text fontSize={['sm','lg']}>Already have an account?</Text></NavLink>
      </VStack>
      <Divider w="60%" />
      <Heading size="lg">Most Recent Shares</Heading>
      <PlacesList data={dummyPlaces}/>
    </VStack>
  );
};

export default Main;
