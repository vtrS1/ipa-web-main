import { Flex, Image, useToast } from '@chakra-ui/react'
import { Text, Input, Button } from 'components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { resetPassword } from 'services/api/request/login'
import { useMutation } from 'react-query'

export const ResetScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const toast = useToast()
  const mutation = useMutation((newUser) => resetPassword(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao redefinir a senha',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Senha redefinida com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      navigate('/')
    }
  })

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      token: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: Yup.object({
      token: Yup.string()
        .max(6, 'Token possui 6 digitos')
        .required('Token é Obrigatorio'),
      email: Yup.string().email(),
      password: Yup.string()
        .min(6, 'A senha precisa ter mais de 6 caracters')
        .required('Senha é obrigatória'),
      confirmpassword: Yup.string()
        .min(6, 'A senha precisa ter mais de 6 caracters')
        .required('Senha é obrigatória')
        .oneOf([Yup.ref('password'), null], 'Senhas Diferentes')
    }),
    onSubmit: (data) => {
      mutation.mutate({
        email: searchParams.get('email'),
        token: data.token,
        password: data.password
      })
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
          <Text.ScreenTitle mt="48px">Insira o Token</Text.ScreenTitle>
          <Input
            id="token"
            name="token"
            error={errors.token}
            onChange={handleChange}
            mt="24px"
            placeholder="Token"
          />
          <Input.Password
            id="password"
            name="password"
            onChange={handleChange}
            mt="16px"
            placeholder="**************"
          />
          <Input.Password
            id="confirmpassword"
            name="confirmpassword"
            error={errors.confirmpassword}
            onChange={handleChange}
            mt="16px"
            placeholder="Confirme sua senha"
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
            Alterar Senha
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
