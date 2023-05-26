import { Grid, Center, Text, Flex } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import { FiUser } from 'react-icons/fi'
import {
  IoHelpBuoySharp,
  IoPeopleOutline,
  IoMailOutline,
  IoPersonSharp
} from 'react-icons/io5'

export const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
      bgColor="#F0F0F0"
    >
      <Flex
        paddingStart="px"
        justifyContent="center"
        flexDir="column"
        w="100%"
        h="30%"
      >
        <Grid templateColumns="repeat(5, 5fr)" gap={7}>
          <Center
            flexDir="Column"
            _hover={{ bg: 'red' }}
            onClick={() => navigate('/guardados')}
            borderRadius="10px"
            bg="#201b2c"
            w="100%"
            h="200"
            color="white"
          >
            <Icon as={IoPeopleOutline} boxSize={20} background="transparent" />
            <Text fontWeight="extrabold">Guardados</Text>
          </Center>
          <Center
            flexDir="Column"
            onClick={() => navigate('/guardioes')}
            _hover={{ bg: 'red' }}
            borderRadius="10px"
            bg="#201b2c"
            w="100%"
            h="200"
            color="white"
          >
            <Text fontWeight="extrabold">
              <Icon as={IoHelpBuoySharp} boxSize={20} />
            </Text>
            <Text fontWeight="extrabold">Guardiões</Text>
          </Center>
          <Center
            flexDir="Column"
            onClick={() => navigate('/mensagens')}
            _hover={{ bg: 'red' }}
            borderRadius="10px"
            bg="#201b2c"
            w="100%"
            h="200"
            color="white"
          >
            <Icon as={IoMailOutline} boxSize={20} />
            <Text fontWeight="extrabold">Mensagem</Text>
          </Center>
          <Center
            flexDir="Column"
            onClick={() => navigate('/colaboradores')}
            _hover={{ bg: 'red' }}
            borderRadius="10px"
            bg="#201b2c"
            w="100%"
            h="200"
            color="white"
          >
            <Icon as={IoPersonSharp} boxSize={20} />
            <Text fontWeight="extrabold">Colaboradores</Text>
          </Center>
          <Center
            flexDir="Column"
            onClick={() => navigate('/usuarios')}
            _hover={{ bg: 'red' }}
            borderRadius="10px"
            bg="#201b2c"
            w="100%"
            h="200"
            color="white"
          >
            <Icon as={FiUser} boxSize={20} />
            <Text fontWeight="extrabold">Usuários</Text>
          </Center>
        </Grid>
      </Flex>
    </Flex>
  )
}
