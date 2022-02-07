import { useContext, useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { Authcontext } from '../shared/context/auth-context';
import axios from 'axios';
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
  Text,
  InputGroup,
  IconButton,
  Image,
  Box,
} from '@chakra-ui/react';

import { faFileImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewPlace = () => {
  const auth = useContext(Authcontext);
  const history = useHistory();

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

  function validateCountry(value) {
    let error;
    if (!value) {
      error = ' " " is not a contry >:( ';
    }
    return error;
  }

  function validateCity(value) {
    let error;
    if (!value) {
      error = 'Maybe in a future, but for now try an actual city';
    }
    return error;
  }

  //to validate:
  // should start with either https://goo.gl/maps/
  // or https://www.google.es/maps/place/

  function validateMapsUrl(url) {
    let error;

    if (!url) {
      error = "We won't figure out this place with magic";
    } else if (
      !url.startsWith('https://www.google.es/maps/place/') &&
      !url.startsWith('https://goo.gl/maps/')
    ) {
      error =
        "That doesn't seem like a valid google maps url, try using the share button on the location";
    }
    return error;
  }

  //file picking logic

  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isImageValid, setisImageValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader(); //let us generate urls for files
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    if (event.target.files || event.target.files.length === 1) {
      const pickedFile = event.target.files[0]; //this is what we need to send to the server;
      setFile(pickedFile);
      setisImageValid(true);
    } else {
      setisImageValid(false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click(); //will open files
  };

  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        country: '',
        city: '',
        mapsUrl: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          //post request

          if (!file) {
            setError('You must upload at least one picture');
            actions.setSubmitting(false);
            return;
          }

          let formData = new FormData();
          formData.append('image', file);
          formData.append('title', values.title);
          formData.append('description', values.description);
          formData.append('country', values.country);
          formData.append('city', values.city);
          formData.append('mapsUrl', values.mapsUrl);

          const config = {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: 'Bearer ' + auth.token,
            },
          };

          axios
            .post(process.env.REACT_APP_BACKEND_URL + '/places/', formData, config)
            .then(response => {
              actions.setSubmitting(false);
              /* console.log(response.data); */
              history.push('/user/' + auth.userId);
            })
            .catch(error => {
              actions.setSubmitting(false);
              setError(error.response.data.message);
            });
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Center mt="50px">
            <VStack spacing="30px" w="80%" mb="150px" maxWidth="1000px">
              <Heading mt="10px">Create your place</Heading>

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
                      maxLength={50}
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
                      placeholder="Don't be shy you've got over 300 characters to express yourself."
                      maxLength={350}
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

              {/* country and city */}
              <HStack w="100%">
                <Field name="country" validate={validateCountry}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.country && form.touched.country}
                    >
                      <FormLabel htmlFor="country">Country name </FormLabel>
                      <Input
                        {...field}
                        id="country"
                        placeholder="Maybe USA, Russia, Nigeria..."
                        fontSize="md"
                        maxLength={20}
                      />
                      <FormHelperText>
                        Over 190 countries to choose from!
                      </FormHelperText>
                      <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="city" validate={validateCity}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.city && form.touched.city}
                    >
                      <FormLabel htmlFor="city">
                        City / State / Town...{' '}
                      </FormLabel>
                      <Input
                        {...field}
                        id="city"
                        placeholder="Just to be a little more specific"
                        fontSize="md"
                        maxLength={30}
                      />
                      <FormHelperText>
                        A few more cities even than countries
                      </FormHelperText>
                      <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>
              {/* maps url */}
              <Field name="mapsUrl" validate={validateMapsUrl}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.mapsUrl && form.touched.mapsUrl}
                  >
                    <FormLabel htmlFor="mapsUrl">
                      Location from Google Maps
                    </FormLabel>
                    <Input
                      {...field}
                      id="mapsUrl"
                      placeholder="Probably should look into adding an embedded map."
                      fontSize="md"
                      resize={'none'}
                      maxLength={500}
                    />
                    <FormHelperText>
                      Find the location through{' '}
                      <b>
                        <a
                          href="https://www.google.es/maps/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          here
                        </a>
                      </b>
                      .
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.mapsUrl}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* FILE PICKER */}
              <Field name="image">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.image && form.touched.image}
                  >
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        w="0px"
                        display={'none'}
                        variant="flushed"
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        ref={filePickerRef}
                        onChange={pickedHandler}
                      />

                      <IconButton onClick={pickImageHandler}>
                        <FontAwesomeIcon
                          style={{ fontSize: '25px' }}
                          icon={faFileImage}
                        ></FontAwesomeIcon>
                      </IconButton>
                    </InputGroup>
                    <Center
                      borderRadius={'sm'}
                      borderWidth={'1px'}
                      p="10px"
                      mt="10px"
                    >
                      <Box>
                        <Text>{!previewUrl && 'No Image provided'}</Text>
                        <Image size="xl" src={previewUrl && previewUrl} />
                      </Box>
                    </Center>
                    <FormErrorMessage>
                      {!isImageValid && 'Image is not valid'}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {error && (
                <HStack w="100%">
                  <Text color="red.300">{error}</Text>
                </HStack>
              )}

              <HStack w="100%">
                <Button
                  mt={4}
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Add place
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default NewPlace;
