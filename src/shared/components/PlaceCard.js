import {
  Button,
  WrapItem,
  Box,
  Image,
  Badge,
  HStack,
  useDisclosure,
  Text,
  IconButton,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { useHistory } from 'react-router-dom';
import { Authcontext } from '../context/auth-context';
import { motion } from 'framer-motion';

import DeleteModal from './DeleteModal';
import ExpandedPlaceModal from './ExpandedPlaceModal';
import imgPlaceHolder from '../../assets/imagePlaceholder.jpg';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart}  from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MotionBox = motion(Box);

const PlaceCard = ({
  picture,
  likes,
  title,
  description,
  city,
  country,
  mapsUrl,
  placeId,
  creatorId,
}) => {
  const isLowRes = useMediaQuery('(max-width:680px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const expandedPlaceDisclosure = useDisclosure();
  const auth = useContext(Authcontext);
  const history = useHistory();

  return (
    <>
      <DeleteModal isOpen={isOpen} onClose={onClose} placeId={placeId} />
      <ExpandedPlaceModal
        isOpen={expandedPlaceDisclosure.isOpen}
        onClose={expandedPlaceDisclosure.onClose}
        picture={picture ? picture : imgPlaceHolder}
        likes={likes}
        title={title}
        description={description}
        city={city}
        country={country}
        creatorId={creatorId}
      />
      <WrapItem>
        <MotionBox
          maxW={isLowRes ? '250px' : 'sm'}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 1 }}
          onClick={expandedPlaceDisclosure.onOpen}
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
            
            <HStack mt="1" as="h4" lineHeight="tight" isTruncated>
              {auth.isLoggedIn ?
              <IconButton>
              <FontAwesomeIcon
                style={{ fontSize: '25px', color: '#ff4d4d' }}
                icon={emptyHeart}
              ></FontAwesomeIcon>
              </IconButton>
              :
              <FontAwesomeIcon
                style={{ fontSize: '25px', color: '#ff4d4d' }}
                icon={faHeart}
              ></FontAwesomeIcon>
              }
              <Text>{likes ? likes : 'Not found'}</Text>
            </HStack>

            <HStack mt="2" as="h4" lineHeight="tight" isTruncated>
              <Button
                colorScheme={'orange'}
                height="30px"
                onClick={() => window.open(mapsUrl, '_blank')}
              >
                {' '}
                {isLowRes ? 'Map' : 'View on map'}
              </Button>

              {auth.isLoggedIn && creatorId === auth.userId && (
                <>
                  <Button
                    colorScheme={'orange'}
                    variant="outline"
                    height="30px"
                    onClick={() => {
                      history.push('/places/' + placeId);
                    }}
                  >
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
              )}
            </HStack>
          </Box>
        </MotionBox>
      </WrapItem>
    </>
  );
};

export default PlaceCard;
