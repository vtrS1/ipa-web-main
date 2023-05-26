import React from 'react'
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react'

export const NavItem = ({
  icon,
  title,
  description,
  active,
  navSize,
  onClick
}) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && '#fefefe'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'red' }}
          w={navSize === 'large' && '100%'}
          onClick={onClick}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color="white" />
              <Text
                ml={5}
                textColor="#fefefe"
                display={navSize === 'small' ? 'none' : 'flex'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}
