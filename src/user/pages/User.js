import React from 'react';

import {
  Avatar,
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Divider,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMediaQuery } from '@react-hook/media-query';
import { motion } from 'framer-motion';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlacesList from '../../shared/components/PlacesList';
import { Link } from 'react-router-dom';

//here we should load the specific places of an user
//TODO: load everything and filter or just load specific?
const dummyUserPlaces = [
  {
    id: 'p1',
    picture:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    adress: 'Piazza del Colosseo, 1, 00184 Roma RM, Italia',
    likes: 12,
    title: 'Roman coliseum',
    city: 'Rome',
    country: 'Italy',
    creatorId: 'u1',
    mapsUrl: "https://goo.gl/maps/BXABiiaUEDd2cZmg6",
  },
];

const User = () => {
  const mainColor = useColorModeValue('primaryLight', 'primary');
  const isLowRes = useMediaQuery('(max-width:680px)');

  const getYearPercentage = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return (day / 365) * 100;
  };

  return (
    <VStack justify={'center'} mt="50px" spacing="50px" mb="100px">
      <HStack spacing="50px" w={isLowRes ? '80%' : '60%'}>
        <Avatar size="xl" src={''} />
        <Box>
          <Heading size={isLowRes ? 'md' : 'xl'}>Jose Luis Gómez</Heading>
          <Text>Spain, Cadiz</Text>
        </Box>
      </HStack>

      <HStack w={isLowRes ? '80%' : '60%'} h="0px">
        <Link to="/places/new"><Button colorScheme={"orange"} ml="150px">Add new place</Button></Link>
      </HStack>

      <Box w="60%">
        <Box ml="80%" display="inline-block">
          <FontAwesomeIcon icon={faMapMarker} />
        </Box>

        <Box h="2px">
          <Box
            borderRadius="md"
            bgColor={mainColor}
            w={`${getYearPercentage()}%`}
            h="100%"
          ></Box>{' '}
        </Box>
      </Box>
      
      <Divider w="60%" />
      <Box textAlign={'center'}>
        <Heading m="0 50px 0 50px">Places you have visited so far</Heading>
      </Box>
      <PlacesList data={dummyUserPlaces} />
      <Link to="/places/new"><Button w="50px" h="50px" colorScheme={"orange"} borderRadius="100%">+</Button></Link>
    </VStack>
  );
};

export default User;
