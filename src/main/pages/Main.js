import {
  VStack,
  Image,
  Heading,
  Box,
  Center,
  Divider,
  Button,
  Text,
  IconButton
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { Authcontext } from '../../shared/context/auth-context';
import axios from 'axios';

import presentation2 from '../../assets/presentation2.svg';
import PlacesList from '../../shared/components/PlacesList';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

import { faThumbtack,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = () => {

  const logout = () => {
    //function for loging someone out when is logged in
    if (auth.isLoggedIn) auth.logout();
  };

  //places fetching
  const [places, setPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useContext(Authcontext);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/main/')
      .then(response => {
        setPlaces(response.data.places);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

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
        <Link to="/auth/signup">
          {auth.isLoggedIn ? (
            <IconButton onClick={logout} colorScheme={"orange"} size="lg">
              <FontAwesomeIcon
                style={{ fontSize: '25px' }}
                icon={faSignOutAlt}
              />
            </IconButton>
          ) : (
            <Button colorScheme={'orange'} w="125px">
              Sign in!
            </Button>
          )}
        </Link>
        <NavLink to="/auth/login">
          <Text fontSize={['sm', 'lg']}>
            {auth.isLoggedIn ? 'Switch account' : 'Already have an account?'}
          </Text>
        </NavLink>
      </VStack>
      <Divider w="60%" />
      <Heading size="lg">
        Most Recent Shares
        <FontAwesomeIcon
          style={{ fontSize: '25px', color: '#82d1c6', marginLeft: '10px' }}
          icon={faThumbtack}
        ></FontAwesomeIcon>
      </Heading>
      {isLoading ? (
        <LoadingSpinner msg="Loading places..." />
      ) : error ? (
        <Text color="red.300">{error}</Text>
      ) : (
        <PlacesList data={places} />
      )}
    </VStack>
  );
};

export default Main;
