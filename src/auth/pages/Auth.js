import { useState } from 'react';
import { Center, Box, useColorModeValue } from '@chakra-ui/react';

import Login from './components/Login';
import Signup from './components/Signup';

const Auth = ({}) => {
  const [isLoging, setIsLoging] = useState(false);
  const mainColor = useColorModeValue('primaryLight', 'primary');
  return (
    <Center mt="50px">
      <Box
        maxWidth="400px"
        h="auto"
        w="90%"
        mb="100px"
        bgColor={mainColor}
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
