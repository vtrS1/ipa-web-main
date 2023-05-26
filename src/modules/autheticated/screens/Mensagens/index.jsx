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
  Box,
  Select
} from '@chakra-ui/react'
import { DrawerDetailsMessage, DrawerMensagem, Sidebar } from 'components'
import { useState, useEffect } from 'react'
import { ListMessage } from 'services/api/request/message'

export const MessageScreen = () => {
  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const [listData, setListData] = useState([])

  const LoadMessageList = async () => {
    const result = await ListMessage()
    setListData(result)
  }

  useEffect(() => {
    LoadMessageList()
  }, [])

  useEffect(() => {
    setFilterUser(
      listData.filter(
        (listData) =>
          listData.descricao.includes(search) ||
          listData.titulo.includes(search)
      )
    )
  }, [search])

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
        <Card mb="15px" flexDir="row">
          <FormControl mb="15px" mr="15px" mt="15px" ml="15px">
            <FormLabel>Mensagem</FormLabel>
            <Input
              name="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite a Mensagem"
            />
          </FormControl>
          <FormControl w="400px" mb="15px" mr="15px" mt="15px" ml="15px">
            <FormLabel>Titulo</FormLabel>
            <Select
              placeholder="Selecione o titulo"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            >
              {listData.map(({ id, titulo }) => {
                return <option key={id}>{titulo}</option>
              })}
            </Select>
          </FormControl>
        </Card>

        <Box alignItems="flex-end" outlineColor="transparent" mt="15px">
          <DrawerMensagem name="Criar Mensagem" />
        </Box>

        <Flex flexDir="column" w="86vw" h="100vh">
          <Card mt="10px">
            <CardHeader bgColor="#201b2c" borderRadius="20px">
              <Heading textColor="#fefefe" size="md">
                Mensagens
              </Heading>
            </CardHeader>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Titulo</Th>
                  <Th>Descrição</Th>
                  <Th>Editar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {search.length > 3
                  ? filterUser.map(({ id, titulo, descricao }) => {
                      return (
                        <Tr key={id}>
                          <Td>{titulo}</Td>
                          <Td>{descricao}</Td>
                          <Td>
                            <DrawerDetailsMessage
                              id={id}
                              titulo={titulo}
                              descricao={descricao}
                            />
                          </Td>
                        </Tr>
                      )
                    })
                  : listData.map(({ id, titulo, descricao }) => {
                      return (
                        <Tr key={id}>
                          <Td>{titulo}</Td>
                          <Td>{descricao}</Td>
                          <Td>
                            <DrawerDetailsMessage
                              id={id}
                              titulo={titulo}
                              descricao={descricao}
                            />
                          </Td>
                        </Tr>
                      )
                    })}
              </Tbody>
            </Table>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
