import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect } from "react"

import { Button, Flex, Heading, Link } from "@chakra-ui/react"
import { Sidebar } from "../../components/Sidebar"
export default function DashBordage (){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">

        

        </Flex>
      </Sidebar> 
    )
}