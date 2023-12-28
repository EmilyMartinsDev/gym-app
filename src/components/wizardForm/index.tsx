import { useSelector, useDispatch } from "react-redux";
import { RootRedux } from "../../store";
import { Box, FormControl, FormLabel, Input, Select, Button, Center, Flex, Heading, Text, Radio, RadioGroup, Stack, Checkbox, useDisclosure, Collapse } from "@chakra-ui/react";
import { next, back } from "../../store/reducers/wizardReducer";
import { useFormik } from "formik";
import { FaWeight, FaArrowsAltV, FaVenusMars, FaBirthdayCake, FaChartPie, FaBullseye, FaHourglassEnd, FaDumbbell, FaRegChartBar, FaRunning, FaCheck, FaArrowRight, FaArrowLeft, FaChevronUp, FaChevronDown } from "react-icons/fa";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";



export default function WizardForm() {
    const dispatch = useDispatch();
    const { position, items } = useSelector((state: RootRedux) => state.wizard);
    const {user:userData} = useContext(AuthContext)
   
    const [user, setUser] = useState(userData)
    enum Goal {
        GAIN_MASS = 'GAIN_MASS',
        LOSE_FAT= 'LOSE_FAT',
        MAINTENANCE='MAINTENANCE'
      }
      enum Phase {
        BASE = 'BASE',
        CHOQUE = 'CHOQUE',
        DELOAD = 'DELOAD'
       }
       
       enum Level {
        BEGINNER= 'BEGINNER',
        INTERMEDIATED = 'INTERMEDIATED',
        ADVANCED= 'ADVANCED',
        ATHLETE = 'MASTER'
       }
       
       enum frequency {
         ONE= 'ONE',
         TWO = 'TWO',
         THREE = 'THREE',
         FOUR = 'FOUR',
         FIVE = 'FIVE',
         SIX = 'SIX',
       }
       
       enum MuscleGroup {
         PEITO= 'PEITO',
         COSTAS= 'COSTAS',
         OMBROS= 'OMBROS',
         BICEPS= 'BICEPS',
         TRICEPS='TRICEPS',
         POSTERIOR='POSTERIOR',
         GLUTEO='GLUTEO',
         QUADRICEPS='QUADRICEPS',
         ABDOMEN='ABDOMEN',
       }
       const muscleGroups = [
        MuscleGroup.PEITO,  MuscleGroup.COSTAS,  MuscleGroup.OMBROS, MuscleGroup.BICEPS, MuscleGroup.TRICEPS,  MuscleGroup.POSTERIOR,  MuscleGroup.GLUTEO,  MuscleGroup.QUADRICEPS, MuscleGroup.ABDOMEN,
    ];
    const navigate = useNavigate()
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const { isOpen, onToggle } = useDisclosure();
    const handleCheckboxChange = (value: string) => {
        let updatedGroups = [...selectedGroups];

        if (updatedGroups.includes(value)) {
            updatedGroups = updatedGroups.filter((group) => group !== value);
        } else {
            if (updatedGroups.length < 3) {
                updatedGroups.push(value);
            }
        }

        setSelectedGroups(updatedGroups);
        formik.setFieldValue('muscle_group_target', updatedGroups);
    };
/*
    const validationSchema = Yup.object({
        weight: Yup.number().required("Peso é obrigatório").positive("Peso deve ser um valor positivo").min(40, 'peso minimo de 40 kg'),
        height: Yup.number().required("Altura é obrigatória").positive("Altura deve ser um valor positivo"),
        gender: Yup.string().required("Gênero é obrigatório"),
        age: Yup.number().required("Idade é obrigatória").positive("Idade deve ser um valor positivo"),
        body_fat_percentage: Yup.number().required("Percentual de gordura corporal é obrigatório").positive("Percentual de gordura corporal deve ser um valor positivo"),
        goal: Yup.string().required("Objetivo é obrigatório"),
       level: Yup.string().required('o tempo é obrigatório'),
        muscle_group_target: Yup
            .array()
            .max(3, 'Selecione no máximo 3 grupos musculares **ALVO**'),
        activity_level: Yup.string().required("Nível de atividade física é obrigatório"),
        training_frequency: Yup.string().required("Frequência de treinamento é obrigatória"),
        average_training_time: Yup.string().required("Tempo médio de treinamento é obrigatório"),
    });
    */
   console.log(user)


    const formik = useFormik({
        initialValues: {
            muscle_group_target:'',
            weight: user?.info?.weight ?? "",
            height: user?.info?.height ?? "",
            gender: user?.info?.gender ?? "",
            age: user?.info?.age ?? "",
            body_fat_percentage: user?.info?.body_fat_percentage ?? "",
            goal: user?.info?.goal ?? "",
            activity_level: user?.info?.activity_level ?? "",
            level: user?.info?.level ?? Level.BEGINNER,
            training_frequency: ""
        },
       // validationSchema: validationSchema,
        onSubmit: async(values) => {
            try{
                await api.post('/wizard', {
                    data: {
            
                        weight: Number(values.weight),
                        height: Number(values.height),
                        gender: values.gender,
                        age:  Number(values.age),
                        body_fat_percentage:Number( values.body_fat_percentage),
                        goal: values.goal,
                        activity_level: Number(values.activity_level),
                        level: values.level,
                        isFinished:true,
                        frequency: values.training_frequency,
                        muscle_target: values.muscle_group_target
                    }
                })
                toast.success('BEM VINDO')
                navigate('/dashboard')
            }catch(err){
                console.log(err)
            }   
            // Lógica para enviar os dados do formulário para o Redux ou qualquer outra ação necessária
        },
    });
    useEffect(()=>{
        console.log(formik.values)
    }, [formik])
    return (
        <Box m={10}>
            <Center mb={10}>
                <Heading as="h1" fontSize="3xl" fontWeight="bold" textAlign="center" color="primary.500">
                    SIT<span style={{ color: "orange" }}>FIT</span>
                </Heading>
            </Center>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <Box
                        animation={position === 1 ? "fadeIn" : ""}
                        display={position === 1 ? "block" : "none"}
                        mb={10}
                        p={5}
                        rounded="md"
                        bgColor="purple.50"
                        boxShadow="md"
                    >
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaWeight size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Peso (kg):
                                </Text>
                            </Box>
                            <Input type="number" name="weight" value={formik.values.weight} onChange={formik.handleChange} rounded="md" />
                            {formik.touched.weight || formik.errors.weight && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.weight}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaArrowsAltV size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Altura (cm):
                                </Text>
                            </Box>
                            <Input type="number" name="height" value={formik.values.height} onChange={formik.handleChange} rounded="md" />
                            {formik.touched.height || formik.errors.height && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.height}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaVenusMars size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Gênero:
                                </Text>
                            </Box>



                            <RadioGroup name="gender" value={formik.values.gender} onChange={(value) => formik.setFieldValue('gender', value)}>
                                <Stack direction="row">
                                    <Radio id="female" value="F">
                                        Feminino
                                    </Radio>
                                    <Radio id="male" value="M">
                                        Masculino
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            {formik.touched.gender || formik.errors.gender && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.gender}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaBirthdayCake size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Idade:
                                </Text>
                            </Box>
                            <Input type="number" name="age" value={formik.values.age} onChange={formik.handleChange} rounded="md" />
                            {formik.touched.age || formik.errors.age && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.age}
                                </Text>
                            )}
                        </Box>

                        <Center mt={10}>
                            <Button
                                colorScheme="blue"
                                color={'white'}
                                variant="solid"
                                size="lg"
                                type="button" 
                                rightIcon={<FaArrowRight />}
                                onClick={() => dispatch(next())}
                                disabled={!formik.values.weight || !formik.values.height || !formik.values.gender || !formik.values.age}
                            >
                                Próximo
                            </Button>
                        </Center>
                    </Box>

                    <Box
                        animation={position === 2 ? "fadeIn" : ""}
                        display={position === 2 ? "block" : "none"}
                        mb={10}
                        p={5}
                        rounded="md"
                        bgColor="purple.50"
                        boxShadow="md"
                    >
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaChartPie size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Percentual de gordura corporal (%):
                                </Text>
                            </Box>
                            <Input
                                type="number"
                                name="body_fat_percentage"
                                value={formik.values.body_fat_percentage}
                                onChange={formik.handleChange}
                                rounded="md"
                            />
                            {formik.touched.body_fat_percentage || formik.errors.body_fat_percentage && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.body_fat_percentage}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaBullseye size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Objetivo:
                                </Text>

                            </Box>
                            <Select name="goal" value={formik.values.goal} onChange={formik.handleChange} rounded="md">
                                <option value="">Selecione...</option>
                                <option value={Goal.GAIN_MASS}>Hipertrofia</option>
                                <option value={Goal.MAINTENANCE}>Manutenção</option>
                                <option value={Goal.LOSE_FAT}>Emagrecer</option>
                            </Select>
                            {formik.touched.goal || formik.errors.goal && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.goal}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
    <Box display="flex" alignItems="center" mb={3}>
        <FaDumbbell size={25} color="purple.400" />
        <Text ml={3} fontWeight="bold" color="gray.600">
            Grupo Muscular Alvo:
        </Text>
    </Box>
    <Select
        name="muscle_group_target"
        value={formik.values.muscle_group_target}
        onChange={formik.handleChange}
        rounded="md"
    >
        <option value="" label="Selecione..." />
        {muscleGroups.map((group) => (
            <option key={group} value={group} label={group} />
        ))}
    </Select>
    {formik.touched.muscle_group_target &&
    formik.errors.muscle_group_target && (
        <Text color="red.500" mt={1} fontSize="sm">
            {formik.errors.muscle_group_target}
        </Text>
    )}
</Box>
<Box display="flex" flexDirection="column" alignItems="center" mt={5}>
    <Box display="flex" alignItems="center" mb={3}>
        <FaRegChartBar size={25} color="purple.400" />
        <Text ml={3} fontWeight="bold" color="gray.600">
            Frequência de Treinamento:
        </Text>
    </Box>
    <Select
        name="training_frequency"
        value={formik.values.training_frequency}
        onChange={formik.handleChange}
        rounded="md"
    >
        <option value="" label="Selecione..." />
        {Object.values(frequency).map((freq) => (
            <option key={freq} value={freq} label={freq} />
        ))}
    </Select>
    {formik.touched.training_frequency &&
    formik.errors.training_frequency && (
        <Text color="red.500" mt={1} fontSize="sm">
            {formik.errors.training_frequency}
        </Text>
    )}
</Box>


                        

                        <Center mt={10}>
                            <Flex alignItems="center">
                                <Button
                                  type="button" 
                                    leftIcon={<FaArrowLeft />}
                                    colorScheme="blue" variant="outline"  size={'lg'} onClick={() => dispatch(back())}>
                                    Voltar
                                </Button>
                                <Button
                                     type="button"                             
                                     colorScheme="blue"
                                    color={'white'}
                                    variant="solid"
                                    size="lg"
                                    ml={5}
                                    rightIcon={<FaArrowRight />}
                                    onClick={() => dispatch(next())}
                                    disabled={!formik.values.body_fat_percentage || !formik.values.goal }
                                >
                                    Próximo
                                </Button>
                            </Flex>
                        </Center>
                    </Box>

                    <Box
                        animation={position === 3 ? "fadeIn" : ""}
                        display={position === 3 ? "block" : "none"}
                        mb={10}
                        p={5}
                        rounded="md"
                        bgColor="purple.50"
                        boxShadow="md"
                    >
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaRunning size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Nível de atividade física:
                                </Text>
                            </Box>
                            <Select name="activity_level" value={formik.values.activity_level} onChange={formik.handleChange} rounded="md">
                                <option value="">Selecione...</option>
                                <option value="1.2">Sedentário</option>
                                <option value="1.375">Leve - exercício 2-3x por semana</option>
                                <option value="1.55">Moderada - exercício 4-5x por semana</option>
                                <option value="1.75">Ativo - exercício 5-6x por semana</option>
                            </Select>
                            {formik.touched.activity_level || formik.errors.activity_level && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.activity_level}
                                </Text>
                            )}
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <FaHourglassEnd size={25} color="purple.400" />
                                <Text ml={3} fontWeight="bold" color="gray.600">
                                    Tempo médio de treinamento (initerruptos):
                                </Text>
                            </Box>
                            <Select name="level" value={formik.values.level} onChange={formik.handleChange} rounded="md">
                                <option value="">Selecione...</option>
                                <option value={Level.BEGINNER}>Até 6 meses de treinamento</option>
                                <option value={Level.INTERMEDIATED}>até 3 anos de treinamento</option>
                                <option value={Level.ADVANCED}>+3 anos</option>
                                <option value={Level.ATHLETE}>Atleta alto rendimento</option>
                            </Select>
                            {formik.touched.level || formik.errors.level && (
                                <Text color="red.500" mt={1} fontSize="sm">
                                    {formik.errors.level}
                                </Text>
                            )}
                        </Box>

                        <Center mt={10}>
                            <Flex alignItems="center">
                                <Button colorScheme="blue" variant="outline" size="lg" onClick={() => dispatch(back())}>
                                    Voltar
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    variant="solid"
                                    size="lg"
                                    ml={5}
                                    rightIcon={<FaCheck />}
                                    type="submit"
                                    
                                >
                                    Enviar
                                </Button>
                            </Flex>
                        </Center>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}