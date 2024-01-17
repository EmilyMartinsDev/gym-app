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
  SimpleGrid,
} from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar"
export default function DashBordage() {
  const [user, setUser] = useState<any>()
  const { user: u } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {

    setUser(u as any)
  }, [u, user])



  // Exemplo de lista de agendas (substitua com seus dados reais)
  const agendas = [
    { id: 1, cliente: "Cliente 1", data: "2024-01-20", hora: "10:00" },
    { id: 2, cliente: "Cliente 2", data: "2024-01-21", hora: "14:30" },
    // ... adicione mais agendas conforme necessário
  ];
  return (
    <Sidebar>
      <Flex direction="column" align="flex-center" justify="flex-center">

      <Heading mb="4" fontSize="2xl">
          Lista de Agendas
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {agendas.map((agenda) => (
            <Box
              key={agenda.id}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
            >
              <Text fontWeight="bold" fontSize="lg">
                Cliente: {agenda.cliente}
              </Text>
              <Text>Data: {agenda.data}</Text>
              <Text>Hora: {agenda.hora}</Text>
              {/* Adicione mais informações da agenda conforme necessário */}
              <Button
                mt="3"
                size="sm"
                colorScheme="teal"
                onClick={() => navigate(`/agenda/${agenda.id}`)}
              >
                Detalhes
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Sidebar>
  )
}
