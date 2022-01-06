import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Center,
  Heading,
  Wrap,
  Image,
  VStack,
  CircularProgress,
  Text,
} from '@chakra-ui/react';
import UserCard from './components/UserCard';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
//import usersPic from '../../assets/users.svg';
import noUsersPic from '../../assets/no_users.svg';

import { useMediaQuery } from '@react-hook/media-query';



const Users = () => {
  const [users, setUsers] = useState(null);
  const [haveUsersLoaded, setHaveUsersLoaded] = useState(false);

  //Users fetching
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/')
      .then(response => {
        const users = response.data.users;
        setUsers(users);
        setHaveUsersLoaded(true);
        /* console.log(users); */
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  const isLowRes = useMediaQuery('(max-width:680px)');

  if (!users || users.length === 0) {
    return (
      <VStack textAlign={'center'} spacing="50px">
        <Center mt="80px">
        </Center>
        <Center>
          <Image
            userSelect={'none'}
            src={noUsersPic}
            w={isLowRes ? '250px' : '500px'}
          />
        </Center>
        <Center>
          <Heading size={isLowRes ? 'md' : 'xl'}>
            Well, this seems a bit empty...
          </Heading>
        </Center>
      </VStack>
    );
  }

  return (
    <>
      <Center mt="100px">
        <Heading size={isLowRes ? 'md' : 'xl'}>
          Check out some of our users!
        </Heading>
      </Center>
      <Center>
        {/* <Image mt="900px" src={usersPic} position={"absolute"} w="700px" zIndex={"-1"}/> */}
      </Center>
      <Center mt="100px" mb="100px">
        {haveUsersLoaded ? (
          <Wrap w="80%" spacing={'40px'} justify="center" maxWidth={'1200px'}>
            {users.map(user => {
              return (
                <UserCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  image={user.image}
                  likes={user.likes}
                  numPlaces={user.places.length}
                />
              );
            })}
          </Wrap>
        ) : (
          <LoadingSpinner msg="Loading users..."/>
        )}
      </Center>
    </>
  );
};

export default Users;
