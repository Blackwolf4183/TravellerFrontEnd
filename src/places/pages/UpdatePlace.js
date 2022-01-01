import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  Center,
  Heading,
  Textarea,
  HStack,
  Button,
  Image,
  Box,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import notFound from '../../assets/not_found.svg'

//TODO: REMOVE
const dummyPlaces = [
  {
    id: 'p1',
    picture:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    adress: 'Piazza del Colosseo, 1, 00184 Roma RM, Italia',
    likes: 12,
    title: 'Roman coliseum',
    city: 'Rome',
    country: 'Italy',
    description:"Just a plain old regular colisseum",
    creatorId: 'u1',
    mapsUrl: 'https://goo.gl/maps/BXABiiaUEDd2cZmg6',
  },
];

const UpdatePlace = () => {
  function validateTitle(value) {
    let error;
    if (!value) {
      error = 'You can do better than that';
    }
    return error;
  }

  function validateDescription(value) {
    let error;
    if (!value) {
      error = 'Just give some details';
    } else if (value.trim().length < 5) {
      error = "Not quite the length you'd be expecting for a description";
    }
    return error;
  }

  const placeId = useParams().placeId;
  const identifiedPlace = dummyPlaces.find(p => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <Center mt="100px" textAlign={"center"}>
          <Box w="50%" borderRadius={"md"} borderWidth={"2px"} p="20px">
        <Image userSelect={'none'} src={notFound} />
        <Heading mt="50px">Doesn't seem like a valid place. Try again!</Heading>
        </Box>
      </Center>
    );
  }

  return (
    <Formik
      initialValues={{ title: identifiedPlace.title, description: identifiedPlace.description}}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false); //TODO: send data to server
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Center mt="50px">
            <VStack spacing="30px" w="80%" maxWidth="1000px">
              <Heading mt="10px">Update your place</Heading>
              <Text size="sm">Everybody makes mistakes from time to time...</Text>
              <Field name="title" validate={validateTitle}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel htmlFor="title">Give it a title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="A long time ago in a galaxy far, far away.."
                      fontSize="md"
                    />
                    <FormHelperText>
                      Some meaningful title for your experience.
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description" validate={validateDescription}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel htmlFor="title">A brief description</FormLabel>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Don't be shy you've got over 150 words to express yourself."
                      fontSize="md"
                      resize={'none'}
                    />
                    <FormHelperText>
                      Maybe tell the people what you liked the most, or even
                      things you found interesting...
                    </FormHelperText>
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <HStack w="100%">
                <Button
                  mt={4}
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePlace;
