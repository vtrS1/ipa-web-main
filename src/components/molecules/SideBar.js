import React, { useState } from 'react'
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Image,
  IconButton
} from '@chakra-ui/react'
import { FiUser } from 'react-icons/fi'
import {
  IoPersonSharp,
  IoHelpBuoySharp,
  IoPeopleOutline,
  IoMailOutline,
  IoEnterOutline
} from 'react-icons/io5'
import { NavItem } from './NavItem'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const navigate = useNavigate()
  const [navSize] = useState('large')
  return (
    <Flex
      pos="sticky"
      left=""
      bgColor="#201b2c"
      h="100vh"
      marginTop=""
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '10px'}
      w={navSize === 'small' ? '75px' : '240px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="10%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <Image w="80px" src="/img/lgbg.png"></Image>

        <NavItem
          onClick={() => navigate('/colaboradores')}
          navSize={navSize}
          icon={IoPersonSharp}
          title="Colaboradores"
        />
        <NavItem
          onClick={() => navigate('/guardioes')}
          navSize={navSize}
          icon={IoHelpBuoySharp}
          title="Guardioes"
        />
        <NavItem
          onClick={() => navigate('/guardados')}
          navSize={navSize}
          icon={IoPeopleOutline}
          title="Guardados"
        />
        <NavItem
          onClick={() => navigate('/mensagens')}
          navSize={navSize}
          icon={IoMailOutline}
          title="Mensagens"
        />

        <NavItem
          onClick={() => navigate('/usuarios')}
          navSize={navSize}
          icon={FiUser}
          title="Usuários"
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        bgColor="#201b2c"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <IconButton
            color="white"
            bg="#201b2c"
            _hover={{ bg: '#5a4c7d' }}
            icon={<IoEnterOutline />}
            onClick={() => navigate('/')}
          ></IconButton>
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === 'small' ? 'none' : 'flex'}
          >
            <Heading textColor="white" as="h3" size="sm">
              {localStorage.getItem('name')}
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
