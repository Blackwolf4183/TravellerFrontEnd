import { Center, Image, Wrap, Heading } from '@chakra-ui/react';
import React from 'react';
import PlaceCard from './PlaceCard';

import emptyPlaces from '../../assets/emptyPlaces.svg';

const PlacesList = ({ data }) => {
  if (data.length === 0) {
    return (
      <>
        <Center mt="100px">
          <Image userSelect={'none'} src={emptyPlaces} w="500px" />
        </Center>
        <Center>
          <Heading size="md">Not much to see here yet folks...</Heading>
        </Center>
      </>
    );
  }
  return (
    <Wrap w="80%" justify="center" spacing="10px">
      {data.map(place => {
        return (
          <PlaceCard
            key={place.id}
            placeId={place.id}
            title={place.title}
            likes={place.likes}
            picture={place.image}
            description={place.description}
            city={place.city}
            country={place.country}
            creatorId={place.creatorId}
            mapsUrl={place.mapsUrl}
          />
        );
      })}
    </Wrap>
  );
};

export default PlacesList;
