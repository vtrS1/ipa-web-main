import { Flex, Image, useToast } from '@chakra-ui/react'
import { Text, Input, Button } from 'components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { forgotPassword } from 'services/api/request/login'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

export const ForgotScreen = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useMutation((newUser) => forgotPassword(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao enviar e-mail',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'E-mail enviado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      navigate(`/resetpassword?email=${values.email}`)
    }
  })
  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um Email válido')
        .required('E-mail é Obrigatorio')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <Flex flexDir="row" w="100vw" h="100vh">
      <Flex
        alignItems={['center', 'flex-start']}
        justifyContent="center"
        padding={['24px', '48px', '80px', '112px']}
        flexDir="column"
        w={['100%', '100%', '100%', '40%']}
        h="100%"
      >
        <Flex flexDir="column" w={['100%', '100%', '100%', '416px']}>
          <Image
            src="/img/logoguardians.svg"
            alt="guardians Logo"
            w="140px"
            h="80px"
          />
          <Text.ScreenTitle mt="48px">Esqueceu a senha ?</Text.ScreenTitle>
          <Text>
            Insira seu e-mail abaixo para envio do código de recuperação
          </Text>
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            mt="24px"
            placeholder="email@exemplo.com"
          />

          <Flex
            mt="8px"
            w="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
          ></Flex>

          <Button
            isLoading={mutation.isLoading}
            onClick={handleSubmit}
            mt="24px"
          >
            Enviar Código
          </Button>
        </Flex>
      </Flex>
      <Flex
        w={['0%', '0%', '0%', '60%']}
        h="100vh"
        backgroundImage="url('/img/bglg.svg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        borderTopLeftRadius="32px"
        borderBottomLeftRadius="32px"
      />
    </Flex>
  )
}
