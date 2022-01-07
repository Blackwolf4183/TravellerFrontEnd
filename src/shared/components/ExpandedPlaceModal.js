import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Avatar,
  HStack,
  Spacer,
  Box,
  SkeletonCircle,
  SkeletonText,
  Badge,
} from '@chakra-ui/react';

import { faHeart, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ExpandedPlaceModal = ({
  onClose,
  isOpen,
  picture,
  likes,
  title,
  description,
  city,
  country,
  creatorId,
}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    //user data fetching
    axios
      .get('http://localhost:5000/api/users/' + creatorId)
      .then(response => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [creatorId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={2}>{title.toUpperCase()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={picture} borderRadius={'md'} />

          <HStack mt={8} spacing="10px" mb={4}>
            {isLoading ? (
              <>
                <SkeletonCircle size={12} />
                <SkeletonText noOfLines={1} fontSize={'lg'}>
                  {'text to make space'}
                </SkeletonText>
              </>
            ) : (
              <HStack
                spacing="10px"
                onClick={() => history.push('user/' + creatorId)}
                cursor={'pointer'}
              >
                <Avatar src={userData.image} />
                <Text fontSize={'lg'}>{userData.name}</Text>
              </HStack>
            )}
            <Spacer />
            <FontAwesomeIcon
              style={{ fontSize: '25px', color: '#ff4d4d' }}
              icon={faHeart}
            ></FontAwesomeIcon>

            <Text>{likes ? likes : 'Not found'}</Text>
          </HStack>
          <Box borderWidth={'1px'} p="15px" borderRadius={'sm'}>
            <Text fontSize={'xl'}>
              <FontAwesomeIcon
                style={{ fontSize: '20px', color: '#ff4d4d',marginRight:"10px" }}
                icon={faMapMarker}
              ></FontAwesomeIcon>
              Location: <Badge colorScheme={'orange'}>{city}</Badge> &bull;{' '}
              <Badge colorScheme={'purple'}>{country}</Badge>
            </Text>
            <Text fontSize="lg" mt={2}>
              Description:
            </Text>
            <Text mt={1}>{description}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExpandedPlaceModal;
