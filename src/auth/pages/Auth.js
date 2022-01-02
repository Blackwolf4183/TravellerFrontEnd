import { useState } from 'react';
import { Center, Box } from '@chakra-ui/react';

import Login from './components/Login';
import Signup from './components/Signup';

const Auth = () => {
  const [isLoging, setIsLoging] = useState(true);

  return (
    <Center mt="50px">
      <Box
        maxWidth="400px"
        h="auto"
        w="80%"
        bgColor={'primary'}
        borderRadius={'md'}
      >
        {isLoging ? (
          <Login setIsLoging={setIsLoging} />
        ) : (
          <Signup setIsLoging={setIsLoging} />
        )}
      </Box>
    </Center>
  );
};

export default Auth;
