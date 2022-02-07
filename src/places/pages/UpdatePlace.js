import { useState, useEffect, useContext } from 'react';
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
import { useParams,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import notFound from '../../assets/not_found.svg';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { Authcontext } from '../../shared/context/auth-context';



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

  //place fetching
  const auth = useContext(Authcontext);
  const history = useHistory();
  const placeId = useParams().placeId;
  const [identifiedPlace, setIdentifiedPlace] = useState(null);
  const [placeError, setPlaceError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateError,setUpdateError] = useState(null);


  useEffect(() => {

    //user places fetching
    axios
      .get(process.env.REACT_APP_BACKEND_URL + '/places/' + placeId)
      .then(response => {
        setIdentifiedPlace(response.data.place);
        setIsLoading(false);
        if(identifiedPlace && response.data.place.creatorId !== auth.userId){ //to prevent another user to update place 
          history.push("/");
        }
      })
      .catch(error => {
        setPlaceError(error.message);
      });

      

  }, [placeId]);

  if (!identifiedPlace || placeError) {
    return (
      <Center mt="100px" textAlign={'center'} textAlign="center">
        <Box w="50%" borderRadius={'md'} borderWidth={'2px'} p="20px">
          <Center>
            <Image
              userSelect={'none'}
              src={notFound}
              maxWidth={'700px'}
              w="90%"
            />
          </Center>
          <Heading mt="50px">
            {placeError ? placeError : 'Could not find the place. Try again!'}
          </Heading>
        </Box>
      </Center>
    );
  }else if(isLoading){
    return <LoadingSpinner msg="Loading place update..."/>
  }

  return (
    <Formik
      initialValues={{
        title: identifiedPlace.title,
        description: identifiedPlace.description,
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {

          const config = {
            headers: {
              Authorization: 'Bearer ' + auth.token,
            },
          };

          axios
            .patch(process.env.REACT_APP_BACKEND_URL + '/places/' + placeId, {
              title: values.title,
              description: values.description,
            },config)
            .then(response => {
              actions.setSubmitting(false);
              history.push('/user/' + auth.userId);
            })
            .catch(error => {
              actions.setSubmitting(false);
              setUpdateError(error.response.data.message);
            });
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Center mt="50px">
            <VStack spacing="30px" w="80%" mb="150px" maxWidth="1000px">
              <Heading mt="10px">Update your place</Heading>
              <Text size="sm">
                Everybody makes mistakes from time to time...
              </Text>
              <Field name="title" validate={validateTitle}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel htmlFor="title">New title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="A long time ago in a galaxy far, far away.."
                      fontSize="md"
                    />
                    <FormHelperText>
                      Everybody makes mistakes, here is your place to mend some of them.
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
                    <FormLabel htmlFor="title">New description</FormLabel>
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
              {updateError && (
                <HStack w="100%">
                  <Text color="red.300">{updateError}</Text>
                </HStack>
              )}
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
