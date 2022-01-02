import React, { useContext } from 'react';
import { useColorMode } from '@chakra-ui/color-mode';
import {
  Heading,
  HStack,
  Spacer,
  IconButton,
  Center,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import {
  faUser,
  faBars,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useHistory } from 'react-router-dom';
import { Authcontext } from '../context/auth-context';
import { useMediaQuery } from '@react-hook/media-query';

const Navbar = () => {
  const auth = useContext(Authcontext);

  const history = useHistory();

  const { colorMode, toggleColorMode } = useColorMode();
  const isLowRes = useMediaQuery('(max-width:680px)');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const logout = () => {
    //function for loging someone out when is logged in
    if (auth.isLoggedIn) auth.logout();
  };

  const navLinks = () => {
    return (
      <HStack spacing="15px">
        <Heading fontSize="lg" lineHeight={'30px'}>
          <NavLink to="/">Home</NavLink>
        </Heading>
        <Heading fontSize="lg" lineHeight={'30px'}>
          <NavLink to="/users">Users</NavLink>
        </Heading>
        {auth.isLoggedIn && (
          <>
            <Heading fontSize="lg" lineHeight={'30px'}>
              <NavLink to="/user/u1">Profile</NavLink>
              {/* TODO: change to dynamicly asign id when logged */}
            </Heading>
            <Heading fontSize="lg" lineHeight={'30px'}>
              <NavLink to="/places/new">Add Place</NavLink>
            </Heading>
          </>
        )}
      </HStack>
    );
  };

  const homeIcon = () => {
    return (
      <NavLink to="/">
        <IconButton textAlign={'center'}>
          <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faCompass} />
        </IconButton>
      </NavLink>
    );
  };

  const mobileNav = () => {
    return (
      <VStack mt="50px">
        {homeIcon()}
        <IconButton textAlign={'center'} ref={btnRef} onClick={onOpen}>
          <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faBars} />
        </IconButton>
      </VStack>
    );
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegation</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'20px'} mt="50px">
              <Button
                w="90%"
                colorScheme={'orange'}
                onClick={() => {
                  onClose();
                  history.push('/');
                }}
              >
                Home
              </Button>
              <Button
                w="90%"
                colorScheme={'orange'}
                onClick={() => {
                  onClose();
                  history.push('/Users');
                }}
              >
                Users
              </Button>
              {auth.isLoggedIn && (
                <>
                <Button
                  w="90%"
                  colorScheme={'orange'}
                  onClick={() => {
                    onClose();
                    history.push('/Profile');
                  }}
                >
                  Profile
                </Button>

                <Button
                w="90%"
                colorScheme={'purple'}
                onClick={() => {
                  onClose();
                  history.push('/places/new');
                }}
              >
                Add Place
              </Button>
              </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Center>
        <HStack
          minWidth={'80%'}
          spacing="30px"
          height="100px"
          ml="20px"
          mr="20px"
        >
          <HStack spacing="15px">
            {isLowRes ? mobileNav() : homeIcon()}
            <NavLink to="/">
              {isLowRes ? null : (
                <Heading size="lg" mr="20px" ml="20px" userSelect={'none'}>
                  Traveller
                </Heading>
              )}
            </NavLink>
          </HStack>

          <Spacer />
          {isLowRes ? null : navLinks()}

          <HStack spacing="10px">
            <IconButton
              fontSize="xl"
              icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
              onClick={toggleColorMode}
            ></IconButton>

            <NavLink to="/auth">
              <IconButton onClick={logout}>
                <FontAwesomeIcon
                  style={{ fontSize: '20px' }}
                  icon={auth.isLoggedIn ? faSignOutAlt : faUser}
                />
              </IconButton>
            </NavLink>
          </HStack>
        </HStack>
      </Center>
    </>
  );
};

export default Navbar;
