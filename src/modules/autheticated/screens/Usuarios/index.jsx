import {
  Flex,
  Card,
  CardHeader,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
  Box
} from '@chakra-ui/react'
import { DrawerDetailsUser, DrawerUser, Sidebar } from 'components'
import { ListUser } from 'services/api/request/users '
import { useEffect, useState } from 'react'
import '../RecemAdmitidos/button.css'

export const UserScreen = () => {
  const [listData, setListData] = useState([])

  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const loadUserList = async () => {
    const result = await ListUser()
    setListData(result)
    setitens(result)
  }

  useEffect(() => {
    loadUserList()
  }, [])

  useEffect(() => {
    setFilterUser(
      listData.filter(
        (listData) =>
          listData.name.includes(search) || listData.email.includes(search)
      )
    )
  }, [search])

  const [itens, setitens] = useState([])

  const [itensPerPage, setItensPerPage] = useState(5)

  const [currentPage, setCurrenrPage] = useState(0)

  const pages = Math.ceil(itens.length / itensPerPage)

  const startIndex = currentPage * itensPerPage

  const endIndex = startIndex + itensPerPage

  const currentItens = itens.slice(startIndex, endIndex)

  return (
    <Flex flexDir="row" w="100vw" h="100vh">
      <Flex w="13vw">
        <Sidebar />
      </Flex>
      <Flex flexDir="column" w="86vw" h="80vh">
        <Card mt="20px">
          <CardHeader textColor="white" bgColor="#201b2c" borderRadius="20px">
            <Heading size="md">Filtros</Heading>
          </CardHeader>
        </Card>
        <Card flexDir="row">
          <FormControl mb="15px" mt="15px" ml="15px" mr="15px">
            <FormLabel>Nome</FormLabel>
            <Input
              name="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome ou e-mail"
              value={search}
            />
          </FormControl>
        </Card>

        <Box alignItems="flex-end" outlineColor="transparent" mt="15px">
          <DrawerUser name="Criar Usuário" />
        </Box>

        <Flex flexDir="column" w="86vw" h="100vh">
          <Card mt="10px">
            <CardHeader bgColor="#201b2c" borderRadius="20px">
              <Heading textColor="#fefefe" size="md">
                Usuários
              </Heading>
            </CardHeader>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Matricula</Th>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Número Telefone</Th>
                  <Th>Editar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {search.length > 0
                  ? filterUser.map(
                      ({ id, name, email, matricula, numerotel }) => {
                        return (
                          <Tr key={id}>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{email}</Td>
                            <Td>{numerotel}</Td>
                            <Td>
                              <DrawerDetailsUser
                                id={id}
                                name={name}
                                email={email}
                                matricula={matricula}
                                numerotel={numerotel}
                              />
                            </Td>
                          </Tr>
                        )
                      }
                    )
                  : currentItens.map(
                      ({ id, name, email, matricula, numerotel }) => {
                        return (
                          <Tr key={id}>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{email}</Td>
                            <Td>{numerotel}</Td>
                            <Td>
                              <DrawerDetailsUser
                                id={id}
                                name={name}
                                email={email}
                                matricula={matricula}
                                numerotel={numerotel}
                              />
                            </Td>
                          </Tr>
                        )
                      }
                    )}
              </Tbody>
            </Table>
          </Card>
        </Flex>
        <Flex className="centralizar">
          <Flex>
            {Array.from(Array(pages), (item, index) => {
              return (
                <button
                  key={index}
                  className="pagination"
                  value={index}
                  onClick={(e) => setCurrenrPage(Number(e.target.value))}
                >
                  {index + 1}
                </button>
              )
            })}
          </Flex>
          <div>- -</div>
          <div>
            <select
              value={itensPerPage}
              onChange={(e) => setItensPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}
