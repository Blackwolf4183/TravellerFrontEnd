import {
  Button,
  WrapItem,
  Box,
  Image,
  Badge,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { Link } from 'react-router-dom';

import DeleteModal from './DeleteModal';

const PlaceCard = ({
  picture,
  adress,
  likes,
  title,
  city,
  country,
  mapsUrl,
  placeId,
}) => {
  const isLowRes = useMediaQuery('(max-width:680px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DeleteModal isOpen={isOpen} onClose={onClose} />
      <WrapItem>
        <Box
          maxW={isLowRes ? '250px' : 'sm'}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={picture} />

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
              {adress}
            </Box>

            {/* TODO: display edit and delete only for owner user */}
            <HStack mt="2" as="h4" lineHeight="tight" isTruncated>
              <Button
                colorScheme={'orange'}
                height="30px"
                onClick={() => window.open(mapsUrl, '_blank')}
              >
                {' '}
                {isLowRes ? 'Map' : 'View on map'}
              </Button>

              <Link to={`places/${placeId}`}>
                <Button colorScheme={'orange'} variant="outline" height="30px">
                  Edit
                </Button>
              </Link>
              <Button
                colorScheme={'red'}
                height="30px"
                variant="outline"
                onClick={onOpen}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        </Box>
      </WrapItem>
    </>
  );
};

export default PlaceCard;
