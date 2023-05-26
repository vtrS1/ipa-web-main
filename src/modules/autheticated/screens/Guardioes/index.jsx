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
  Select,
  Input,
  Box
} from '@chakra-ui/react'
import { DrawerDetailsGuardians, DrawerGuardians, Sidebar } from 'components'
import { useState, useEffect } from 'react'
import { ListGuardians } from 'services/api/request'
import {
  ListCargo,
  ListFilial,
  ListSetor
} from 'services/api/request/filialsetorcargo'

export const GuardiansScreen = () => {
  const [listData, setListData] = useState([])

  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const [filialData, setListfilialData] = useState([])

  const [setorData, setListsetorData] = useState([])

  const [cargoData, setListcargoData] = useState([])

  const [itens, setitens] = useState([])

  const [itensPerPage, setItensPerPage] = useState(5)

  const [currentPage, setCurrenrPage] = useState(0)

  const pages = Math.ceil(itens.length / itensPerPage)

  const startIndex = currentPage * itensPerPage

  const endIndex = startIndex + itensPerPage

  const currentItens = itens.slice(startIndex, endIndex)

  const cargoList = async () => {
    const result = await ListCargo()
    setListcargoData(result)
  }

  useEffect(() => {
    cargoList()
  }, [])

  const SetorList = async () => {
    const result = await ListSetor()
    setListsetorData(result)
  }

  useEffect(() => {
    SetorList()
  }, [])

  const filialList = async () => {
    const result = await ListFilial()
    setListfilialData(result)
  }

  useEffect(() => {
    filialList()
  }, [])

  const loadGuardianList = async () => {
    const result = await ListGuardians()
    setListData(result)
    setitens(result)
  }

  useEffect(() => {
    loadGuardianList()
  }, [])

  useEffect(() => {
    setFilterUser(
      listData.filter(
        (listData) =>
          listData.name.includes(search) ||
          listData.email.includes(search) ||
          listData.filial.includes(search) ||
          listData.setor.includes(search) ||
          listData.cargo.includes(search) ||
          listData.turno.includes(search)
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
          <FormControl mt="15px" ml="15px">
            <FormLabel>Filial</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Selecione a Filial"
            >
              {filialData.map(({ id, filialcode, namefilial }) => {
                return <option key={id}>{namefilial}</option>
              })}
            </Select>
          </FormControl>
          <FormControl mt="15px" ml="15px">
            <FormLabel>Setor</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Selecione o Setor"
            >
              {setorData.map(({ id, namesetor }) => {
                return <option key={id}>{namesetor}</option>
              })}
            </Select>
          </FormControl>
          <FormControl mt="15px" ml="15px">
            <FormLabel>Cargo</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Selecione o Cargo"
            >
              {cargoData.map(({ id, cargoname }) => {
                return <option key={id}>{cargoname}</option>
              })}
            </Select>
          </FormControl>
          <FormControl mt="15px" ml="15px" mr="15px">
            <FormLabel>Nome</FormLabel>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome do guardião"
              type="text"
            />
          </FormControl>
        </Card>

        <Card bgColor="transparent" mb="15px" flexDir="row">
          <FormControl w="700px" mt="15px" ml="15px" mb="15px">
            <FormLabel>Turno</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Selecione o Turno"
            >
              <option value="Abertura">Abertura</option>
              <option value="Fechamento">Fechamento</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Sem controle de jornada">
                Sem controle de jornada
              </option>
            </Select>
          </FormControl>
        </Card>

        <Box alignItems="flex-end" outlineColor="transparent" mt="15px">
          <DrawerGuardians name="Criar Guardiões" />
        </Box>

        <Flex flexDir="column" w="86vw" h="100vh">
          <Card mt="25px">
            <CardHeader bgColor="#201b2c" borderRadius="20px">
              <Heading textColor="#fefefe" size="md">
                Guardiões
              </Heading>
            </CardHeader>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Matricula</Th>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Filial</Th>
                  <Th>Setor</Th>
                  <Th>Cargo</Th>
                  <Th>Turno</Th>
                  <Th>Editar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {search.length > 0
                  ? filterUser.map(
                      ({
                        id,
                        matricula,
                        name,
                        email,
                        filial,
                        setor,
                        cargo,
                        turno,
                        numerotel,
                        valecredito,
                        codigofilial,
                        codigocargo,
                        codigodosetor
                      }) => {
                        return (
                          <Tr key={id}>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{email}</Td>
                            <Td>{filial}</Td>
                            <Td>{setor}</Td>
                            <Td>{cargo}</Td>
                            <Td>{turno}</Td>
                            <Td>
                              <DrawerDetailsGuardians
                                id={id}
                                codigocargo={codigocargo}
                                codigofilial={codigofilial}
                                codigodosetor={codigodosetor}
                                name={name}
                                email={email}
                                matricula={matricula}
                                numerotel={numerotel}
                                turno={turno}
                                filial={filial}
                                setor={setor}
                                cargo={cargo}
                                valecredito={valecredito}
                              >
                                Detalhes
                              </DrawerDetailsGuardians>
                            </Td>
                          </Tr>
                        )
                      }
                    )
                  : currentItens.map(
                      ({
                        id,
                        matricula,
                        name,
                        email,
                        filial,
                        setor,
                        cargo,
                        turno,
                        numerotel,
                        valecredito,
                        codigofilial,
                        codigocargo,
                        codigodosetor
                      }) => {
                        return (
                          <Tr key={id}>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{email}</Td>
                            <Td>{filial}</Td>
                            <Td>{setor}</Td>
                            <Td>{cargo}</Td>
                            <Td>{turno}</Td>
                            <Td>
                              <DrawerDetailsGuardians
                                id={id}
                                name={name}
                                email={email}
                                matricula={matricula}
                                numerotel={numerotel}
                                setor={setor}
                                cargo={cargo}
                                filial={filial}
                                valecredito={valecredito}
                                turno={turno}
                                codigocargo={codigocargo}
                                codigofilial={codigofilial}
                                codigodosetor={codigodosetor}
                              ></DrawerDetailsGuardians>
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
