import React from 'react';
import {
  Avatar,
  Box,
  useColorModeValue,
  WrapItem,
  Text,
  Heading,
  VStack,
  Center,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { faHeart, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const UserCard = ({id, name, pic, likes, numPlaces }) => {
  const cardColor = useColorModeValue('primaryLight', 'primary');

  return (
    <WrapItem>
      <MotionBox
        h="175px"
        w="200px"
        borderRadius={'10px'}
        bgColor={cardColor}
        textAlign={'center'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        p="10px"
      >
        <Link to={`user/${id}`}>
        <Avatar
          src={pic}
          size="xl"
          borderColor={cardColor}
          borderWidth={'5px'}
          userSelect={'none'}
          mt="-50px"
        />

        <Heading size="md" userSelect={'none'} m="5px 10px 0 10px">
          {name ? name : 'Not found'}
        </Heading>

        <Center>
          <VStack w="250px" mt="10px">
            <Box w="100px">
              <FontAwesomeIcon
                style={{ fontSize: '25px', color: '#ff4d4d' }}
                icon={faHeart}
              ></FontAwesomeIcon>
              <Text fontSize={'xl'} userSelect={"none"} display="inline-block" ml="5px">
                {likes ? likes : 0}
              </Text>
            </Box>

            <Box w="100px">
              <FontAwesomeIcon
                style={{ fontSize: '25px', color: '#82d1c6' }}
                icon={faThumbtack}
              ></FontAwesomeIcon>
              <Text fontSize={'xl'} userSelect={"none"} display="inline-block" ml="5px">
                {numPlaces ? numPlaces : 0}
              </Text>
            </Box>
          </VStack>
        </Center>
        </Link>
      </MotionBox>
    </WrapItem>
  );
};

export default UserCard;
