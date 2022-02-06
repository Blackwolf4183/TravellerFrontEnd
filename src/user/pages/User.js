import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Divider,
  Button,
  Center,
  Image,
} from '@chakra-ui/react';
import { useMediaQuery } from '@react-hook/media-query';
import { faThumbtack, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Authcontext } from '../../shared/context/auth-context';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import PlacesList from '../../shared/components/PlacesList';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

import noUsersPic from '../../assets/no_users.svg';

//here we should load the specific places of an user
//TODO: load everything and filter or just load specific?

const User = () => {
  const isLowRes = useMediaQuery('(max-width:680px)');

  const auth = useContext(Authcontext);
  const userId = useParams().uid;

  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userPlaces, setUserPlaces] = useState(null);
  const [userPlacesError, setUserPlacesError] = useState(null);

  useEffect(() => {
    //user data fetching
    axios
      .get('http://localhost:5000/api/users/' + userId)
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        setErrorMsg(error.message);
      });
  }, [userId]);

  useEffect(() => {
    //user places fetching
    axios
      .get('http://localhost:5000/api/places/user/' + userId)
      .then(response => {
        setUserPlaces(response.data.places);
      })
      .catch(error => {
        setUserPlacesError(error.message);
      });
  }, [userId]);

  if (errorMsg) {
    return (
      <VStack textAlign={'center'} spacing="50px" mt="100px">
        <Center>
          <Image
            userSelect={'none'}
            src={noUsersPic}
            w={isLowRes ? '250px' : '500px'}
          />
        </Center>
        <Center>
          <Heading size={isLowRes ? 'md' : 'xl'}>
            {errorMsg || 'Something went wrong, try again'}
          </Heading>
        </Center>
      </VStack>
    );
  } else if (!userData) {
    return <LoadingSpinner msg={'Loading User'} />;
  }

  return (
    <VStack justify={'center'} mt="50px" spacing="50px" mb="100px">
      <HStack spacing="50px" w={isLowRes ? '80%' : '60%'}>
        <Avatar size="xl" src={userData.image==="none" ? "" : "http://localhost:5000\\" + userData.image} />
        <Box pt="20px">
          <Heading size={isLowRes ? 'md' : 'xl'}>{userData.name}</Heading>
          <HStack mt={4} align={'left'}>
            <FontAwesomeIcon
              style={{ fontSize: '25px', color: '#ff4d4d' }}
              icon={faHeart}
            ></FontAwesomeIcon>
            <Text>0{/* TODO IMPLEMENT LIKES */}</Text>

            <FontAwesomeIcon
              style={{ fontSize: '25px', color: '#82d1c6' }}
              icon={faThumbtack}
            ></FontAwesomeIcon>
            <Text>{userData.places.length}</Text>
          </HStack>
        </Box>
      </HStack>

      <HStack w={isLowRes ? '80%' : '60%'} h="0px">
        {userId === auth.userId && (
          <Link to="/places/new">
            <Button colorScheme={'orange'} ml="150px">
              Add new place
            </Button>
          </Link>
        )}
      </HStack>

      <Divider w="60%" />
      <Box textAlign={'center'}>
        <Heading m="0 50px 0 50px">Visited places</Heading>
      </Box>

      {/* Pass an array of places */}
      {userPlacesError || !userPlaces || userPlaces.length === 0 ? (
        <Text fontSize="md">There are not posts yet</Text>
      ) : (
        <PlacesList data={userPlaces} />
      )}

      {userId === auth.userId && (
        <Link to="/places/new">
          <Button w="50px" h="50px" colorScheme={'orange'} borderRadius="100%">
            +
          </Button>
        </Link>
      )}
    </VStack>
  );
};

export default User;
