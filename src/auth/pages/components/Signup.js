import { useState,useContext } from 'react';
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
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Authcontext } from '../../../shared/context/auth-context';

const Signup = ({ setIsLoging }) => {

  const auth = useContext(Authcontext);

  function usernameValidator(value) {
    let error;
    if (!value) {
      error = 'Please enter a valid username';
    }
    return error;
  }

  function emailValidator(value) {
    let error;
    if (
      !value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      error = 'Invalid email address';
    }
    return error;
  }

  function passwordValidator(value) {
    let error;
    if (value.length < 5) {
      error = 'Your password should have at least 5 characters';
    }
    return error;
  }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Formik
      initialValues={{ mail: '', password: '', username: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false); //TODO: validate user
          auth.login();
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Center mt="50px">
            <VStack spacing="30px" w="90%" maxWidth="1000px">
              <Heading mt="10px">Sign up</Heading>

              <Field name="username" validate={usernameValidator}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor="title">Username</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="youremail@gmail.com"
                      fontSize="md"
                      variant="flushed"
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="mail" validate={emailValidator}>
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
                      variant="flushed"
                    />
                    <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password" validate={passwordValidator}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        variant="flushed"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                  Sign up
                </Button>
                <Text
                  pb="15px"
                  cursor={'pointer'}
                  onClick={() => {
                    setIsLoging(true);
                  }}
                >
                  Already have an account?
                </Text>
              </HStack>
            </VStack>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
