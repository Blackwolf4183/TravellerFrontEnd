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
} from '@chakra-ui/react';

const NewPlace = () => {
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

  //to validate:
  // should start with either https://goo.gl/maps/
  // or https://www.google.es/maps/place/

  function validateMapsUrl(url) {
    let error;

    if (!url) {
      error = 'We won\'t figure out this place with magic';
    } else if (!url.startsWith("https://www.google.es/maps/place/") && !url.startsWith("https://goo.gl/maps/")) {
      error = "That doesn't seem like a valid google maps url, try using the share button on the location";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ title: '', description: '',mapsUrl:'' }}
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
                      resize={"none"}
                    />
                    <FormHelperText>
                      Maybe tell the people what you liked the most, or even things you found interesting...
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

                {/* maps url */}
              <Field name="mapsUrl" validate={validateMapsUrl}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.mapsUrl && form.touched.mapsUrl
                    }
                  >
                    <FormLabel htmlFor="mapsUrl">Location from Google Maps</FormLabel>
                    <Input
                      {...field}
                      id="mapsUrl"
                      placeholder="Probably should look into adding an embedded map."
                      fontSize="md"
                      resize={"none"}
                    />
                    <FormHelperText>
                      Find the location through <b><a href="https://www.google.es/maps/" target="_blank" rel="noopener noreferrer">here</a></b>.
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.mapsUrl}</FormErrorMessage>
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

