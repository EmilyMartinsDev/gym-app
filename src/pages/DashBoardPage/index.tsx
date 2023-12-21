import { Link, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import {
  Flex, Box,
  Button,
  Heading,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar"
export default function DashBordage() {
  const [user, setUser] = useState<any>()
  const { user: u } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {

    setUser(u as any)
  }, [u, user])
  return (
    <Sidebar>
      <Flex direction="column" align="flex-center" justify="flex-center">

        <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Text mt={2} textAlign="center" fontSize="lg" color="gray.600">
            Bem-vindo, {user?.name}!
          </Text>
          <Box mb={8}>
            <Heading mt={4} textAlign="center" fontSize="4xl">
              Bem-vindo ao Seu App de Treinos!
            </Heading>
            <Text mt={2} textAlign="center" fontSize="lg" color="gray.600">
              Transforme seu corpo. Transforme sua vida.
            </Text>
          </Box>

          {/* Recursos em Destaque */}
          <Stack direction="row" spacing={4} mb={8}>
            <FeatureCard
              title="Planos de Treino"
              icon="💪"
              to="/training-plans"
            />
            <FeatureCard
              title="Biblioteca de Exercícios"
              icon="🏋️‍♂️"
              to="/exercise-library"
            />
            <FeatureCard
              title="Rastreamento de Progresso"
              icon="📈"
              to="/progress-tracking"
            />
          </Stack>
          {/* Botão de Ação Principal */}
          <Box textAlign="center">
            <Button colorScheme="blue" size="lg">
              Comece Agora
            </Button>
          </Box>

        </Box>
      </Flex>
    </Sidebar>
  )
}
const FeatureCard = ({ title, icon, to }: any) => {
  return (
    <Link to={to}>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: 'scale(1.05)' , backgroundColor:'primary.500'}}
        cursor="pointer"
      >
        <Text fontSize="2xl" mb={2}>
          {icon}
        </Text>
        <Text fontWeight="bold">{title}</Text>
      </Box>
    </Link>
  );
};