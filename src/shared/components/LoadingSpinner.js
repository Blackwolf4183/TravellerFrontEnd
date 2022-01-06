import React from 'react'
import { VStack,CircularProgress,Text } from '@chakra-ui/react'

const LoadingSpinner = ({msg}) => {
    return (
        <VStack spacing={"20px"} h="100%" mt="30vh">
          <CircularProgress isIndeterminate color="green.300" size="100px" thickness={"5px"}/>
          <Text fontSize={"xl"}>{msg}</Text>
        </VStack>
    )
}

export default LoadingSpinner
