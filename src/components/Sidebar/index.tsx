import { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Link
} from '@chakra-ui/react'

import {
  FiScissors,
  FiUsers,
  FiSettings,
  FiMenu,
  FiUser,
  FiCalendar,
  FiCoffee,
  FiDollarSign } from 'react-icons/fi'
import { IconType } from 'react-icons' 



interface LinkItemProps{
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Agenda', icon: FiCalendar, route: '/agenda' },
    { name: 'Profissionais', icon: FiUsers, route: '/profissionais' },
    { name: 'Cortes', icon: FiScissors, route: '/settings' },
    { name: 'Minha Conta', icon: FiUser, route: '/me' },
    { name: 'Configurações', icon: FiSettings, route: '/config' },
   
  ];
export function Sidebar({ children }: { children: ReactNode }){

  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <Box minH="100vh" bg="white">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        onClose={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={() => onClose()} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps{
  onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  return (
    <Box
      bg="primary.400"
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >

      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDirection="row">
            <Text fontSize="xxx-large" fontFamily="fantasy"  color="white" letterSpacing={2} mr={1} fontWeight="bold">EASY</Text>
            <Text fontSize="xxx-large" fontFamily="fantasy" fontWeight="bold" letterSpacing={2}  color="orange">CUT</Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none'}} onClick={onClose} />
      </Flex>

      {LinkItems.map(link => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
           {link.name} 
        </NavItem>
      ))}

    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

const NavItem = ({icon, children, route, ...rest}: NavItemProps) => {
  return(
    <Link fontSize={'lg'} color={'white'} fontWeight={'bold'}  href={route} style={{ textDecoration: 'none'}} >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'primary.500',
        color: 'white'
      }}
      {...rest}
    >
     
     {icon && (
      <Icon
        mr={4}
        fontSize="16"
        as={icon}
        _groupHover={{
          color: 'white'
        }}
      />
     )}
     {children}
    </Flex>
  </Link>
  )
}

interface MobileProps extends FlexProps{
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps ) => {
  return(
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={'primary.500'}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.700', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={ <FiMenu/> }
      />
  
      <Flex flexDirection="row">
        <Text ml={8} fontSize="xx-large" fontFamily="fantasy" letterSpacing={2} color={'white'} mr={1} fontWeight="bold">
          Sit
        </Text>
        <Text  fontSize="xx-large" fontFamily="fantasy" fontWeight="bold" color="orange">
          Fit
        </Text>
      </Flex>
    </Flex>
  )
}