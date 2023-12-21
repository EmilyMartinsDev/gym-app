
// Treinos.js
import React from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Link,
  Image,
  Flex,
  Badge,
  Button,
} from '@chakra-ui/react';
import { Sidebar } from '../../components/Sidebar';

const GenericCard = ({ title, description, image, category, onClick }:any) => {
    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={image} alt={title} />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {category}
            </Badge>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>
          <Text mt="2" color="gray.600">
            {description}
          </Text>
          <Button colorScheme="teal" mt="2" onClick={onClick}>
            Detalhes
          </Button>
        </Box>
      </Box>
    );
  };
const Treinos = () => {
  


  return (
   <Sidebar>
    <Flex>
    <GenericCard onClick={()=>{}} category={'titulo'} description={'nada'} image={''}title={'oi'} key={1}/>
    </Flex>
   </Sidebar>
  );
};

export default Treinos;
