import {
  Button,
  WrapItem,
  Box,
  Image,
  Badge,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useHistory } from 'react-router-dom';
import { Authcontext } from '../context/auth-context';

import DeleteModal from './DeleteModal';

import imgPlaceHolder from '../../assets/imagePlaceholder.jpg'

const PlaceCard = ({
  picture,
  likes,
  title,
  city,
  country,
  mapsUrl,
  placeId,
  creatorId,
}) => {
  const isLowRes = useMediaQuery('(max-width:680px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useContext(Authcontext);
  const history = useHistory();

  return (
    <>
      <DeleteModal isOpen={isOpen} onClose={onClose}  placeId={placeId}/>
      <WrapItem>
        <Box
          maxW={isLowRes ? '250px' : 'sm'}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={picture ? picture : imgPlaceHolder} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="orange">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {city} &bull; {country}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>
            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              Likes:
            </Box>

            <HStack mt="2" as="h4" lineHeight="tight" isTruncated>
              <Button
                colorScheme={'orange'}
                height="30px"
                onClick={() => window.open(mapsUrl, '_blank')}
              >
                {' '}
                {isLowRes ? 'Map' : 'View on map'}
              </Button>

              {(auth.isLoggedIn && creatorId === auth.userId) && 
              <>
                <Button colorScheme={'orange'} variant="outline" height="30px" onClick={() => {history.push("/places/" + placeId)}}>
                  Edit
                </Button>
                <Button
                  colorScheme={'red'}
                  height="30px"
                  variant="outline"
                  onClick={onOpen}
                >
                  Delete
                </Button>
              </>
              }
              
            </HStack>
          </Box>
        </Box>
      </WrapItem>
    </>
  );
};

export default PlaceCard;
