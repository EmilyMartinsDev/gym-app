import { Box, Button, Input, FormControl, FormLabel, Heading, Text } from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";




const  RegistrationForm = ()=>{
    const {signUp} = useContext(AuthContext)
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        nome: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().email("Email inválido").required("Email é obrigatório"),
        senha: Yup.string().required("Senha é obrigatória"),
})
    
const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
    },
    validationSchema,
    onSubmit: (values) => {
        let data = {
            email: values.email,
            nome: values.nome,
            senha: values.senha
        }

        try{
            signUp(data);
            toast.success('cadastrado com sucesso')
            navigate('/signIn')
        }catch(err){
            console.log(err)
        }// Faça algo com os valores do formulário aqui, como enviar para o backend
    },
  });
  const [loading, setLoading] = useState(false)


  return (
    <Box maxWidth="400px" margin="0 auto" paddingTop="40px">
    <Heading as="h1" textAlign="center" marginBottom="20px" fontSize="4xl" color="primary.500">
      EASYCUT Barber
    </Heading>
    <Box
      borderRadius="md"
      boxShadow="lg"
      p="6"
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <form onSubmit={formik.handleSubmit}>
        <FormControl mb="4">
          <FormLabel fontWeight="bold" color="primary.500">
            Nome:
          </FormLabel>
          <Input
            type="text"
            placeholder="Digite seu nome"
            _focus={{ outline: "none", boxShadow: "outline" }}
            borderRadius="md"
            borderColor="gray.400"
            {...formik.getFieldProps("nome")}
          />
          {formik.touched.nome && formik.errors.nome ? (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              {formik.errors.nome}
            </Text>
          ) : null}
        </FormControl>
  
        <FormControl mb="4">
          <FormLabel fontWeight="bold" color="primary.500">
            Email:
          </FormLabel>
          <Input
            type="email"
            placeholder="Digite seu email"
            _focus={{ outline: "none", boxShadow: "outline" }}
            borderRadius="md"
            borderColor="gray.400"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              {formik.errors.email}
            </Text>
          ) : null}
        </FormControl>
  
        <FormControl mb="4">
          <FormLabel fontWeight="bold" color="primary.500">
            Senha:
          </FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha"
            _focus={{ outline: "none", boxShadow: "outline" }}
            borderRadius="md"
            borderColor="gray.400"
            {...formik.getFieldProps("senha")}
          />
          {formik.touched.senha && formik.errors.senha ? (
            <Text color="red.500" fontSize="sm" fontWeight="bold">
              {formik.errors.senha}
            </Text>
          ) : null}
        </FormControl>
  
        <Button
          backgroundColor="primary.500"
          size="lg"
          color="white"
          width="full"
          borderRadius="md"
          _hover={{ opacity: "0.8" }}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </Box>
  
    <Text textAlign="center" mt="4" fontSize="sm" color="gray.500">
      Já tem uma conta?{" "}
      <Text as="b" color="primary.500">
        <Link to="/signIn">Faça login</Link>
      </Text>
    </Text>
  </Box>
  
  );
    }
export default RegistrationForm