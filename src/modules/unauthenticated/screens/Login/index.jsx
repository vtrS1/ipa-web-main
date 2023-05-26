import { Flex, Image, useToast } from '@chakra-ui/react'
import { Text, Input, Link, Button } from 'components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginRealease } from 'services/api/request/login'
import { useMutation } from 'react-query'
import { saveItem } from 'services/storage'
import { useDispatch } from 'react-redux'
import { setAll } from 'services/store/slices/user'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const mutation = useMutation((newUser) => loginRealease(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao realizar login',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Login feito com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      console.log({ data })
      saveItem('tokenapi', data.data.token)
      saveItem('name', data.data.name)
      dispatch(
        setAll({
          token: data?.data.token,
          user: data?.data.name
        })
      )
      navigate('/colaboradores')
    }
  })

  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Insira um Email válido')
        .required('E-mail é Obrigatorio'),
      password: Yup.string()
        .min(6, 'A senha precisa ter mais de 6 caracters')
        .required('Senha é obrigatória')
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
          <Text.ScreenTitle mt="48px">Login</Text.ScreenTitle>
          <Input
            id="email"
            name="email"
            mt="24px"
            placeholder="email@exemplo.com"
            onChange={handleChange}
          />
          <Input.Password
            id="password"
            name="password"
            mt="16px"
            placeholder="**************"
            onChange={handleChange}
          />

          <Flex
            mt="8px"
            w="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <Link onClick={() => navigate('/forgotpassword')}>
              Esqueceu sua senha?
            </Link>
          </Flex>

          <Button
            isLoading={mutation.isLoading}
            onClick={handleSubmit}
            mt="24px"
          >
            Login
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
