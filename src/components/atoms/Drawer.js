import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  FormControl,
  IconButton
} from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'
import { AddIcon, EmailIcon, UpDownIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  createUser,
  createGuardian,
  createMessage,
  createTag,
  sendSms,
  ListGuardians,
  selectguardian,
  ListMessage,
  updateGuardian,
  updateMessage,
  updateUser,
  changedGuardian
} from 'services/api/request'
import { useMutation } from 'react-query'
import { FiEye } from 'react-icons/fi'
import { ListFilial } from 'services/api/request/filialsetorcargo'
import { ListGuarded } from 'services/api/request/guarded'
import { ListColaborator } from 'services/api/request/recemadmitidos'

export const DrawerGuardians = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => createGuardian(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Guardião',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Guardião criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      email: '',
      matricula: '',
      numerotel: '',
      setor: '',
      cargo: '',
      filial: '',
      codigodosetor: '',
      codigofilial: '',
      codigocargo: '',
      valecredito: '',
      turno: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required()
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
      values.codigocargo = 1
      values.codigodosetor = 1
      values.codigofilial = 1
    }
  })

  return (
    <>
      <Button ml="" leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar Guardião</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  error={errors.name}
                  value={values.name}
                  placeholder="Insira o nome do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input
                  ref={firstField}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                  placeholder="Insira o email do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Matricula</FormLabel>
                <Input
                  ref={firstField}
                  id="matricula"
                  name="matricula"
                  type="number"
                  onChange={handleChange}
                  error={errors.matricula}
                  value={values.matricula}
                  placeholder="Insira a Matricula do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Numero de Telefone</FormLabel>
                <Input
                  ref={firstField}
                  id="numerotel"
                  name="numerotel"
                  onChange={handleChange}
                  error={errors.numerotel}
                  value={values.numerotel}
                  placeholder="Insira a número de telefone do Guardião"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Setor</FormLabel>
                <Input
                  ref={firstField}
                  id="setor"
                  name="setor"
                  onChange={handleChange}
                  error={errors.setor}
                  value={values.setor}
                  placeholder="Insira a setor do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Cargo</FormLabel>
                <Input
                  ref={firstField}
                  id="cargo"
                  name="cargo"
                  onChange={handleChange}
                  error={errors.cargo}
                  value={values.cargo}
                  placeholder="Insira a cargo do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Filial</FormLabel>

                <Input
                  ref={firstField}
                  id="filial"
                  name="filial"
                  onChange={handleChange}
                  error={errors.filial}
                  value={values.filial}
                  placeholder="Insira a filial do Guardião"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="name">Cartão Vale Crédito</FormLabel>
                <Input
                  ref={firstField}
                  id="valecredito"
                  name="valecredito"
                  onChange={handleChange}
                  error={errors.valecredito}
                  value={values.valecredito}
                  placeholder="Insira a vale credito do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Turno</FormLabel>

                <Select
                  ref={firstField}
                  id="turno"
                  name="turno"
                  onChange={handleChange}
                  error={errors.turno}
                  value={values.turno}
                  placeholder="Insira a turno do Guardião"
                >
                  <option value="Abertura">Abertura</option>
                  <option value="Fechamento">Fechamento</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Sem controle de jornada">
                    Sem controle de jornada
                  </option>
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerMensagem = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => createMessage(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Mensagem',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Mensagem criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      titulo: '',
      descricao: ''
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('Titulo é Obrigatorio'),
      descricao: Yup.string().required('Descrição é obrigatória')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <>
      <Button ml="" leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar Mensagem </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="titulo">Titulo</FormLabel>
                <Input
                  ref={firstField}
                  id="titulo"
                  name="titulo"
                  onChange={handleChange}
                  error={errors.titulo}
                  value={values.titulo}
                  placeholder="Insira o titulo da Mensagem"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Descrição da mensagem</FormLabel>
                <Textarea
                  id="descricao"
                  name="descricao"
                  onChange={handleChange}
                  error={errors.descricao}
                  value={values.descricao}
                  placeholder="Insira a Descrição da Mensagem"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerUser = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => createUser(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Usuário',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Usuário Criado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      matricula: '',
      numerotel: ''
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
    <>
      <Button ml="" leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar Usuário</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  error={errors.name}
                  value={values.name}
                  placeholder="Insira o nome do usuário"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="name">E-mail</FormLabel>
                <Input
                  ref={firstField}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                  placeholder="Insira o email do usuário"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Senha</FormLabel>
                <Input
                  ref={firstField}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  error={errors.password}
                  value={values.password}
                  type="password"
                  placeholder="Insira a senha"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Matricula</FormLabel>
                <Input
                  ref={firstField}
                  id="matricula"
                  name="matricula"
                  onChange={handleChange}
                  error={errors.matricula}
                  value={values.matricula}
                  placeholder="Insira a matricula do usuário"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Numero de Telefone</FormLabel>
                <Input
                  ref={firstField}
                  id="numerotel"
                  name="numerotel"
                  onChange={handleChange}
                  type="tel"
                  error={errors.numerotel}
                  value={values.numerotel}
                  placeholder="Insira o Nº telefone do usuário"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Criar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerGuarded = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  return (
    <>
      <Button ml="" leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar Guardado</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  placeholder="Insira o nome do Guardião"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Turno</FormLabel>
                <Select id="turno" defaultValue="segun">
                  <option value="diurno">Diurno</option>
                  <option value="noturno">Noturno</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Selecione a Filial</FormLabel>
                <Select id="filial" defaultValue="segun">
                  <option value="diurno">Cash torres</option>
                  <option value="noturno">Cash barreira</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Selecione o Setor</FormLabel>
                <Select id="setor" defaultValue="segun">
                  <option value="diurno">Diurno</option>
                  <option value="noturno">Noturno</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="name">E-mail</FormLabel>
                <Input
                  ref={firstField}
                  id="email"
                  placeholder="Insira o nome do Guardião"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Matricula</FormLabel>
                <Input
                  ref={firstField}
                  id="matricula"
                  placeholder="Insira o nome do Guardião"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue">Salvar</Button>
          </DrawerFooter>
        </DrawerContent>
        y
      </Drawer>
    </>
  )
}

export const DrawerSendSms = ({ name, recipientId, ...props }) => {
  const [listData, setListData] = useState([])

  const LoadMessageList = async () => {
    const result = await ListMessage()
    setListData(result)
  }

  useEffect(() => {
    LoadMessageList()
  }, [])

  const toast = useToast()
  const mutation = useMutation((newUser) => sendSms(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao enviar Mensagem',
        description:
          error?.response?.data?.error || 'Por Favor, Selecione um guardado.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Mensagem enviada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      id: '',
      message: ''
    },
    validationSchema: Yup.object({
      message: Yup.string().required('Campo Obrigatório')
    }),
    onSubmit: (data) => {
      values.id = recipientId
      mutation.mutate(data)
    }
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  return (
    <>
      <Button
        leftIcon={<EmailIcon />}
        bgColor="green"
        onClick={onOpen}
        textColor="white"
        _hover={{ bg: 'green.400' }}
        {...props}
      >
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Enviar Mensagem</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormControl>
                  <FormLabel>Selecione a mensagem a ser enviada</FormLabel>
                  <Select
                    id="message"
                    name="message"
                    onChange={handleChange}
                    placeholder="Selecione o titulo"
                  >
                    {listData.map(({ id, titulo, descricao }) => {
                      return (
                        <option value={descricao} key={id}>
                          {titulo}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Enviar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerTags = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => createTag(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Tag',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Tag criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      tag: '',
      descricao: ''
    },
    validationSchema: Yup.object({
      tag: Yup.string().required('Nome da Tag é Obrigatoria'),
      descricao: Yup.string().required('Descrição é obrigatória')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <>
      <Button ml="" leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar Tag </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="tag">nametag</FormLabel>
                <Input
                  ref={firstField}
                  id="tag"
                  name="tag"
                  onChange={handleChange}
                  error={errors.tag}
                  value={values.tag}
                  placeholder="Insira o titulo da Tag"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="descricao">Descrição da tag</FormLabel>
                <Textarea
                  id="descricao"
                  name="descricao"
                  onChange={handleChange}
                  error={errors.descricao}
                  value={values.descricao}
                  placeholder="Insira a Descrição da Tag"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerSelectGuardians = ({ name, recipientId, ...props }) => {
  const [listData, setListData] = useState([])

  const [filialData, setListfilialData] = useState([])
  const filialList = async () => {
    const result = await ListFilial()
    setListfilialData(result)
  }
  useEffect(() => {
    filialList()
  }, [])

  if (filialData.length < 0) {
    console.log(filialData[0].namefilial)
  }

  const [Colaborador, setColaborador] = useState([])

  const colaboradorList = async () => {
    const result = await ListColaborator()
    setColaborador(result)
  }

  const [searchGuarded, setSearchGuarded] = useState('')

  const [filterGuarded, setFilterGuarded] = useState([])

  if (filterGuarded.length < 0) {
    console.log('' + filterGuarded)
  }
  useEffect(() => {
    setFilterGuarded(
      GuardedData.filter((listData) =>
        listData.guardian.name.includes(searchGuarded)
      )
    )
  }, [searchGuarded])

  const [GuardedData, setGuardedData] = useState([])

  const LoadGuardedList = async () => {
    const result = await ListGuarded()
    setGuardedData(result)
  }

  useEffect(() => {
    LoadGuardedList()
  }, [])

  const qtdConsultaGuardados = listData
  for (let i = 0; i < qtdConsultaGuardados.length; i++) {
    listData[i].qte = 0
  }

  const Guardados = GuardedData
  for (let j = 0; j < Guardados.length; j++) {
    listData.map((user) => {
      if (user.name === GuardedData[j].guardian.name) {
        user.qte = user.qte + 1
      }
      return console.log()
    })
  }

  const LimparArray = []
  const [NewRecipientId, setNewRecipientId] = useState([])

  const Varredura = (recipientId) => {
    LimparArray.push()
    if (!recipientId.length < 1) {
      console.log('o primeiro valor: ' + recipientId[0])
      const nomeFilialColaboradorPrimeiro = Colaborador.find(
        (id) => id.id === parseInt(recipientId[0])
      )
      const filialTeste = nomeFilialColaboradorPrimeiro.filial
      const tamanhoArray = recipientId.length

      for (let i = 0; i < tamanhoArray; i++) {
        const ColaboradorTeste = Colaborador.find(
          (id) => id.id === parseInt(recipientId[i])
        )
        if (ColaboradorTeste.filial === filialTeste) {
          LimparArray.push(`${ColaboradorTeste.id}`)
          console.log(ColaboradorTeste.id)
        } else {
          const error = 'error'
          toast({
            title: 'Falha ao Selecionar o Colaborador',
            description:
              error?.response?.data?.error ||
              'Por Favor, selecionar colaboradores de mesma Filial',
            status: error,
            duration: 2000,
            isClosable: true
          })
        }
      }
      setNewRecipientId(LimparArray)
      console.log('Array ' + LimparArray)
    }
  }

  const encontrarFilial = (recipientId) => {
    if (recipientId.length < 1) {
      setSearch('')
    }
    const teste = Colaborador.find((id) => {
      const num = parseInt(recipientId[0])
      return id.id === num
    })
    if (teste !== undefined) {
      setSearch(teste.filial)
      console.log(teste.filial)
    }
  }

  useEffect(() => {
    colaboradorList()
    encontrarFilial(recipientId)
    Varredura(recipientId)
  }, [recipientId.length])

  const loadGuardianList = async () => {
    const result = await ListGuardians()
    setListData(result)
  }

  useEffect(() => {
    loadGuardianList()
  }, [])

  const [search, setSearch] = useState('')

  const [filterGuardian, setFilterGuardian] = useState([])

  useEffect(() => {
    setFilterGuardian(
      listData.filter((listData) => listData.filial.includes(search))
    )
  }, [search])

  const toast = useToast()
  const mutation = useMutation((newUser) => selectguardian(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Selecionar o Guardião',
        description:
          error?.response?.data?.error || 'Por Favor, selecione o colaborador',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Guardião Selecionado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      id: [],
      guardiansid: ''
    },
    validationSchema: Yup.object({
      guardiansid: Yup.string().required('Escolha um Guardião, por favor')
    }),
    onSubmit: (data) => {
      values.id = NewRecipientId
      console.log(data)
      mutation.mutate(data)
    }
  })

  function processar() {
    setSearchGuarded(values.guardiansid)
  }

  useEffect(() => {
    processar()
  }, [values])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  // <FormControl mt="15px" ml="15px">
  // <FormLabel>Filial</FormLabel>
  // <Select
  //   onChange={(e) => setSearch(e.target.value)}
  //   placeholder="Selecione a Filial"
  // >
  //   {filialData.map(({ id, filialcode, namefilial }) => {
  //     return <option key={id}>{namefilial}</option>
  //   })}
  // </Select>
  // <FormControl>

  return (
    <>
      <Button
        leftIcon={<UpDownIcon />}
        bgColor="red"
        onClick={onOpen}
        textColor="white"
        _hover={{ bg: 'red.400' }}
        {...props}
      >
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Selecionar guardião
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <Box>
                  <FormControl mt="30px" ml="15px">
                    <FormLabel>Selecionar Guardiões</FormLabel>
                    <Select
                      id="guardiansid"
                      name="guardiansid"
                      onChange={handleChange}
                      placeholder="Selecione o Guardião"
                    >
                      {search.length > 0
                        ? filterGuardian.map(
                            ({ id, name, turno, filial, qte }) => {
                              return (
                                <option value={name} key={id}>
                                  {name} | {turno} | {filial} | {qte}
                                </option>
                              )
                            }
                          )
                        : listData.map(({ id, name, turno, filial, qte }) => {
                            return (
                              <option value={name} key={id}>
                                {name} | {turno} | {filial} | {qte}
                              </option>
                            )
                          })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Selecionar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerChangedGuardians = ({ name, recipientId, ...props }) => {
  const [listData, setListData] = useState([])

  const loadGuardianList = async () => {
    const result = await ListGuardians()
    setListData(result)
  }

  useEffect(() => {
    loadGuardianList()
  }, [])

  const toast = useToast()
  const mutation = useMutation((newUser) => changedGuardian(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao alterar Guardião',
        description:
          error?.response?.data?.error || 'Por Favor, Selecione um guardado.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Guardião Alterado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      id: [],
      guardiansid: ''
    },
    validationSchema: Yup.object({
      guardiansid: Yup.number()
    }),
    onSubmit: (data) => {
      values.id = recipientId
      console.log(data)
      mutation.mutate(data)
    }
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  return (
    <>
      <Button
        leftIcon={<UpDownIcon />}
        bgColor="red"
        onClick={onOpen}
        textColor="white"
        _hover={{ bg: 'red.400' }}
        {...props}
      >
        {name}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Alterar guardião</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <Box>
                  <FormControl mt="15px" ml="15px">
                    <FormLabel>Guardiões</FormLabel>
                    <Select
                      id="guardiansid"
                      name="guardiansid"
                      onChange={handleChange}
                      placeholder="Selecione o Guardião"
                    >
                      {listData.map(({ id, name, turno }) => {
                        return (
                          <option value={id} key={id}>
                            {name} | {turno}
                          </option>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Alterar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerDetailsGuardians = ({
  id,
  name,
  email,
  matricula,
  numerotel,
  setor,
  cargo,
  filial,
  valecredito,
  turno,
  codigofilial,
  codigocargo,
  codigodosetor
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => updateGuardian(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Guardião',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Guardião criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name,
      email,
      matricula,
      numerotel,
      setor,
      cargo,
      filial,
      codigodosetor,
      codigofilial,
      codigocargo,
      valecredito,
      turno
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required()
    }),
    onSubmit: (data) => {
      values.id = id
      mutation.mutate(data)
    }
  })

  return (
    <>
      <IconButton ml="" icon={<FiEye />} colorScheme="teal" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  error={errors.name}
                  value={values.name}
                  placeholder={name}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input
                  ref={firstField}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                  placeholder={email}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Matricula</FormLabel>
                <Input
                  ref={firstField}
                  id="matricula"
                  name="matricula"
                  type="number"
                  onChange={handleChange}
                  error={errors.matricula}
                  value={values.matricula}
                  placeholder={matricula}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Numero de Telefone</FormLabel>
                <Input
                  ref={firstField}
                  id="numerotel"
                  name="numerotel"
                  onChange={handleChange}
                  error={errors.numerotel}
                  value={values.numerotel}
                  placeholder={numerotel}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Setor</FormLabel>
                <Select
                  ref={firstField}
                  id="setor"
                  name="setor"
                  onChange={handleChange}
                  error={errors.setor}
                  value={values.setor}
                  placeholder={setor}
                >
                  <option value="DEV_BI">DEV_BI</option>
                  <option value="RH_MNE_MAO">RH_MNE_MAO</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Cargo</FormLabel>
                <Select
                  ref={firstField}
                  id="cargo"
                  name="cargo"
                  onChange={handleChange}
                  error={errors.cargo}
                  value={values.cargo}
                  placeholder={cargo}
                >
                  <option value="Desenvolvedor Web">Desenvolvedor Web</option>
                  <option value="Assistente TI I">Assistente TI I</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Filial</FormLabel>

                <Select
                  ref={firstField}
                  id="filial"
                  name="filial"
                  onChange={handleChange}
                  error={errors.filial}
                  value={values.filial}
                  placeholder={filial}
                >
                  <option value="Cash Torres">Cash Torres</option>
                  <option value="Cash Flores">Cash Flores</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="name">Cartão Vale Crédito</FormLabel>
                <Input
                  ref={firstField}
                  id="valecredito"
                  name="valecredito"
                  onChange={handleChange}
                  error={errors.valecredito}
                  value={values.valecredito}
                  placeholder={valecredito}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Turno</FormLabel>

                <Select
                  ref={firstField}
                  id="turno"
                  name="turno"
                  onChange={handleChange}
                  error={errors.turno}
                  value={values.turno}
                  placeholder={turno}
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                </Select>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerDetailsMessage = ({ id, titulo, descricao }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => updateMessage(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Mensagem',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Mensagem criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      id,
      titulo,
      descricao
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('Titulo é Obrigatorio'),
      descricao: Yup.string().required('Descrição é obrigatória')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <>
      <IconButton ml="" icon={<FiEye />} colorScheme="teal" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar Mensagem </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="titulo">Titulo</FormLabel>
                <Input
                  ref={firstField}
                  id="titulo"
                  name="titulo"
                  onChange={handleChange}
                  error={errors.titulo}
                  value={values.titulo}
                  placeholder={titulo}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="desc">Descrição da mensagem</FormLabel>
                <Textarea
                  id="descricao"
                  name="descricao"
                  onChange={handleChange}
                  error={errors.descricao}
                  value={values.descricao}
                  placeholder={descricao}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerDetailsUser = ({
  id,
  name,
  email,
  matricula,
  numerotel
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => updateUser(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Usuário',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Usuário Criado com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      id,
      name,
      email,
      matricula,
      numerotel
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Insira um Email válido')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <>
      <IconButton ml="" icon={<FiEye />} colorScheme="teal" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar Usuário</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  ref={firstField}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  error={errors.name}
                  value={values.name}
                  placeholder={name}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="name">E-mail</FormLabel>
                <Input
                  ref={firstField}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                  placeholder={email}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="name">Matricula</FormLabel>
                <Input
                  ref={firstField}
                  id="matricula"
                  name="matricula"
                  onChange={handleChange}
                  error={errors.matricula}
                  value={values.matricula}
                  placeholder={matricula}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="name">Numero de Telefone</FormLabel>
                <Input
                  ref={firstField}
                  id="numerotel"
                  name="numerotel"
                  onChange={handleChange}
                  type="tel"
                  error={errors.numerotel}
                  value={values.numerotel}
                  placeholder={numerotel}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerDetailsTags = ({ tag, descricao }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()
  const toast = useToast()
  const mutation = useMutation((newUser) => createTag(newUser), {
    onError: (error) => {
      toast({
        title: 'Falha ao Criar Tag',
        description:
          error?.response?.data?.error || 'Por Favor, Tente Novamente',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    },
    onSuccess: (data) => {
      toast({
        title: 'Tag criada com sucesso',
        status: 'success',
        duration: 6000,
        isClosable: true
      })
      window.location.reload(false)
    }
  })

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      tag: '',
      descricao: ''
    },
    validationSchema: Yup.object({
      tag: Yup.string().required('Nome da Tag é Obrigatoria'),
      descricao: Yup.string().required('Descrição é obrigatória')
    }),
    onSubmit: (data) => {
      mutation.mutate(data)
    }
  })

  return (
    <>
      <IconButton ml="" icon={<FiEye />} colorScheme="teal" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar Tag </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="tag">nametag</FormLabel>
                <Input
                  ref={firstField}
                  id="tag"
                  name="tag"
                  onChange={handleChange}
                  error={errors.tag}
                  value={values.tag}
                  placeholder={tag}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="descricao">Descrição da tag</FormLabel>
                <Textarea
                  id="descricao"
                  name="descricao"
                  onChange={handleChange}
                  error={errors.descricao}
                  value={values.descricao}
                  placeholder={descricao}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
