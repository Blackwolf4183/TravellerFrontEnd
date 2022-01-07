import { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
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

const Signup = () => {

  const auth = useContext(Authcontext);
  const history = useHistory();

  function usernameValidator(value) {
    let error;
    if (!value) {
      error = 'Please enter a valid username';
    }else if(value.trim().length>15){
      error = 'Username too long please enter a shorter one';
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

  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <Formik
      initialValues={{ mail: '', password: '', username: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          const {mail, password, username} = values;

          axios.post("http://localhost:5000/api/users/signup/",{
            name:username,
            email:mail,
            password:password,
          })
          .then((response) => {
              const responseData = response.data
              actions.setSubmitting(false); 
              auth.login(responseData.user.id);
          })
          .catch(error => {
            actions.setSubmitting(false);
            if (error.response.data) {
              setErrorMsg(error.response.data.message);
            }
          })
          
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
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Xx_Destroyer_of_Worlds_xX"
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
                    <FormLabel htmlFor="mail">Email</FormLabel>
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
              <>
              { errorMsg &&
              <HStack w="100%" color={"red.300"}>
                  <Text h="0">{errorMsg}</Text>
                </HStack>}
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
                    history.push("/auth/login")
                  }}
                >
                  Already have an account?
                </Text>
              </HStack>
              </>
            </VStack>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;