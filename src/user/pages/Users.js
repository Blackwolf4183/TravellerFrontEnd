import React from 'react';
import { Center, Heading, Wrap, Image,VStack } from '@chakra-ui/react';
import UserCard from './components/UserCard';

import usersPic from '../../assets/users.svg';
import noUsersPic from '../../assets/no_users.svg';

import { useMediaQuery } from '@react-hook/media-query';

const usersData = [
    {
      id:"u1",
      name:"Luis Pérez",
      pic:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      likes:400,
      numPlaces:2
    },
    {
      id:"u2",
      name:"Jose María",
      pic:"http://bavette.es/wp-content/uploads/donuts-perfectos-copia-1.jpg",
      likes:2,
      numPlaces:102
    }
];

const Users = () => {

  const isLowRes = useMediaQuery('(max-width:680px)');

  if (usersData.length === 0) {
    return (
      <VStack textAlign={"center"} spacing="50px">
        <Center mt="80px">
          <Heading size={isLowRes ? "md" : "xl"}>Check out some of our users!</Heading>
        </Center>
        <Center >
          <Image userSelect={"none"} src={noUsersPic} w={isLowRes ? "300px" : "500px"} />
        </Center>
        <Center>
          <Heading  size={isLowRes ? "md" : "xl"}>Well, this seems a bit empty...</Heading>
        </Center>
      </VStack>
    );
  }

  return (
    <>
      <Center mt="100px">
        <Heading size={isLowRes ? "md" : "xl"}>Check out some of our users!</Heading>
      </Center>
      <Center>
        {/* <Image mt="900px" src={usersPic} position={"absolute"} w="700px" zIndex={"-1"}/> */}
      </Center>
      <Center mt="100px" mb="100px">
        <Wrap w="80%" spacing={'40px'} justify="center" maxWidth={'1200px'}>
          {usersData.map(user => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                description={user.description}
                pic={user.pic}
                likes={user.likes}
                numPlaces={user.numPlaces}
              />
            );
          })}
        </Wrap>
      </Center>
    </>
  );
};

export default Users;
