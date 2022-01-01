import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Center,
  Heading,
  HStack,
  Button,
  Box,
} from '@chakra-ui/react';

const Auth = () => {

  const [isLoging, setIsLoging] = useState(true) 

  return (
    <Center mt="50px">
      <Box
        maxWidth="400px"
        h="auto"
        w="60%"
        bgColor={'primary'}
        borderRadius={'md'}
      >
        <Formik
          initialValues={{ mail: '', password: ''}}
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
                  <Heading mt="10px">{isLoging ? "Log in" : "Sign up"}</Heading>

                  <Field name="mail" validate={console.log('')}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.mail && form.touched.mail}
                      >
                        <FormLabel htmlFor="title">Email</FormLabel>
                        <Input
                          {...field}
                          id="mail"
                          placeholder="youremail@gmail.com"
                          fontSize="md"
                          variant='flushed'
                        />
                        <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={console.log('')}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">
                          Password
                        </FormLabel>
                        <Input
                          {...field}
                          id="password"
                          placeholder="Top Secret"
                          fontSize="md"
                          variant='flushed'
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>


                  <HStack w="100%">
                    <Button
                      mt={2}
                      mb={10}
                      colorScheme="orange"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Create Account
                    </Button>
                  </HStack>
                </VStack>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default Auth;
