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
  Button,
  Box
} from '@chakra-ui/react'
import { DrawerDetailsTags, DrawerTags, Sidebar } from 'components'
import { useState, useEffect } from 'react'
import { ListTags } from 'services/api/request'

export const TagsScreen = () => {
  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const [listData, setListData] = useState([])

  const LoadMessageList = async () => {
    const result = await ListTags()
    setListData(result)
  }

  useEffect(() => {
    LoadMessageList()
  }, [])

  useEffect(() => {
    setFilterUser(
      listData.filter(
        (listData) =>
          listData.descricao.includes(search) || listData.tag.includes(search)
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
            <FormLabel>Tags</FormLabel>
            <Input
              placeholder="Digite a descrição da tag"
              name="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </FormControl>
        </Card>

        <Box alignItems="flex-end" outlineColor="transparent" mt="15px">
          <Button mr="20px" w="150px" h="40px" size="md">
            Pesquisar
          </Button>
          <DrawerTags name="Criar Tag" />
        </Box>

        <Flex flexDir="column" w="86vw" h="100vh">
          <Card mt="10px">
            <CardHeader bgColor="#201b2c" borderRadius="20px">
              <Heading textColor="#fefefe" size="md">
                Tags
              </Heading>
            </CardHeader>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Tag</Th>
                  <Th>Descrição</Th>
                  <Th>Editar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {search.length > 0
                  ? filterUser.map(({ id, tag, descricao }) => {
                      return (
                        <Tr key={id}>
                          <Td>{tag}</Td>
                          <Td>{descricao}</Td>
                          <Td>
                            <DrawerDetailsTags
                              tag={tag}
                              descricao={descricao}
                            />
                          </Td>
                        </Tr>
                      )
                    })
                  : listData.map(({ id, tag, descricao }) => {
                      return (
                        <Tr key={id}>
                          <Td>{tag}</Td>
                          <Td>{descricao}</Td>
                          <Td>
                            <DrawerDetailsTags
                              tag={tag}
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
