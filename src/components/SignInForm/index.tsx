import { Box, Button, Input, FormControl, FormLabel, Heading, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";



const  SignInForm = ()=>{
    const {signin} = useContext(AuthContext)
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const validationSchema = Yup.object({
        email: Yup.string().email("Email inválido").required("Email é obrigatório"),
        senha: Yup.string().required("Senha é obrigatória"),
})
    
const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema,
    onSubmit: async (values) => {
        let data = {
            email: values.email,
            password: values.senha
        }

        try{
            await signin(data);
            toast.success('logado com sucesso')
            
            navigate('/dashboard')

        }catch(err){
            console.log(err)
        }// Faça algo com os valores do formulário aqui, como enviar para o backend
    },
  });
  const [loading, setLoading] = useState(false)


  return (
    <Box maxWidth="400px" margin="0 auto" paddingTop="40px">
      <Heading as="h1" textAlign="center" marginBottom="20px" fontSize="3xl" color="primary.500">
        SitFit
      </Heading>
      <Box
        borderRadius="md"
        boxShadow="md"
        p="8"
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <form onSubmit={formik.handleSubmit}>

          <FormControl mb="4">
            <FormLabel fontWeight="bold">Email:</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              _focus={{ outline: "none", boxShadow: "outline" }}
              borderRadius="md"
              borderColor="gray.400"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text color="red.500" fontSize="sm" fontWeight={'bold'}>{formik.errors.email}</Text>
            ) : null}
          </FormControl>

          <FormControl mb="4">
            <FormLabel fontWeight="bold">Senha:</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              _focus={{ outline: "none", boxShadow: "outline" }}
              borderRadius="md"
              borderColor="gray.400"
              {...formik.getFieldProps("senha")}
            />
            {formik.touched.senha && formik.errors.senha ? (
              <Text color="red.500" fontSize="sm" fontWeight={'bold'}>{formik.errors.senha}</Text>
            ) : null}
          </FormControl>

          <Button
            backgroundColor="primary.500"
            size="lg"
            color={'white'}
            width="full"
            borderRadius="md"
            _hover={{ opacity: "0.8" }}
            type="submit"

          >
            Entrar
          </Button>
        </form>
      </Box>

      <Text textAlign="center" mt="4" fontSize="sm">
        Não tem uma conta? <Text as="b" color="primary.500"><Link to={'/'}>Registre-se</Link></Text>
      </Text>
    </Box>
  );
    }
export default SignInForm