import { UpDownIcon } from '@chakra-ui/icons'
import { Button as ChakraButton } from '@chakra-ui/react'

export const Button = ({ children, ...props }) => (
  <ChakraButton
    fontWeight="bold"
    fontSize="16px"
    borderRadius="16px"
    textColor="white"
    h="56px"
    bg="brand.primary"
    _hover={{
      bg: 'brand.primary'
    }}
    {...props}
  >
    {children}
  </ChakraButton>
)

export const ButtonChangeGuardian = ({ children, ...props }) => (
  <ChakraButton
    leftIcon={<UpDownIcon />}
    bgColor="red.500"
    textColor="white"
    _hover={{ bg: 'red.400' }}
    w="190px"
    h="40px"
    size="md"
    {...props}
  >
    {children}
  </ChakraButton>
)
