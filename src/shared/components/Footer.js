import { HStack, Text, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import useScrollProgress from '../../hooks/useScrollProgress';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const MotionHStack = motion(HStack);

const variants = {
  shown: { y:"0px"},
  hidden: { y: "60px"},
}

const Footer = () => {
  

  const scrollY = useScrollProgress();
  const footerColor = useColorModeValue('footerLight', 'footer');

  return (
    <MotionHStack
      w="100%"
      h="60px"
      mt="100px"
      bgColor={footerColor}
      justify={'center'}
      spacing="20px"
      position={'fixed'}
      bottom={0}
      left={0}
      animate={scrollY >= 90 ? "shown" : "hidden"}
      variants={variants}
    >
      <Text> Made by Pablo Pérez Martín</Text>
      <Button
        onClick={() =>
          window.open('https://github.com/Blackwolf4183', '_blank')
        }
        borderRadius={'lg'}
        w="40px"
        h="40px"
        variant={'transparent'}
      >
        <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faGithub} />
      </Button>
    </MotionHStack>
  );
};

export default Footer;
