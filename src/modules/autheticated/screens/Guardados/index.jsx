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
  Box,
  IconButton
} from '@chakra-ui/react'
import { DrawerChangedGuardians, DrawerSendSms, Sidebar } from 'components'
import { ListGuarded } from 'services/api/request/guarded'
import { ListGuardians } from 'services/api/request'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { RiWhatsappFill } from 'react-icons/ri'
import {
  ListCargo,
  ListFilial,
  ListSetor
} from 'services/api/request/filialsetorcargo'
import '../RecemAdmitidos/button.css'

export const GuardedScreen = () => {
  const [listData, setListData] = useState([])

  const [search, setSearch] = useState('')

  const [filterUser, setFilterUser] = useState([])

  const [guardianData, setListGuardianData] = useState([])

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

  const qtdelementos = currentItens.length

  function toggle(id) {
    const index = checkedItems.findIndex((i) => i === id)
    const arrcheckedItems = [...checkedItems]
    if (index !== -1) {
      arrcheckedItems.splice(index, 1)
    } else {
      if (index !== null) {
        arrcheckedItems.push(id)
      }
    }
    setCheckedItems(arrcheckedItems)
  }

  const [checkedItems, setCheckedItems] = useState([])
  const arrcheckedItems = [...checkedItems]
  console.log(checkedItems)

  const marcar = () => {
    const Checkbox = document.querySelectorAll('.check')

    for (const current of Checkbox) {
      current.checked = !current.checked

      const index = checkedItems.findIndex((i) => i === current.id)

      if (index !== -1) {
        arrcheckedItems.splice(index, 30)
      } else {
        arrcheckedItems.push(current.id)
      }

      setCheckedItems(arrcheckedItems)
    }
    console.log(Checkbox)
  }

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
    setListGuardianData(result)
  }

  useEffect(() => {
    loadGuardianList()
  }, [])

  const LoadGuardedList = async () => {
    const result = await ListGuarded()
    setListData(result)
    setitens(result)
  }

  useEffect(() => {
    LoadGuardedList()
  }, [])

  useEffect(() => {
    setFilterUser(
      listData.filter(
        (listData) =>
          listData.name.includes(search) ||
          listData.filial.includes(search) ||
          listData.setor.includes(search) ||
          listData.cargo.includes(search) ||
          listData.turno.includes(search) ||
          listData.guardian.name.includes(search) ||
          listData.dtadmissao.includes(search)
      )
    )
  }, [search])

  const wppLink = (numero) => {
    window.open('https://web.whatsapp.com/send?phone=55' + numero, '_blank')
  }

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
              placeholder="Digite aqui"
              type="text"
            />
          </FormControl>
        </Card>

        <Card bgColor="transparent" mb="15px" flexDir="row">
          <FormControl w="700px" mt="15px" ml="15px" mb="15px">
            <FormLabel>Turno</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
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

          <FormControl w="700px" mt="15px" ml="15px" mb="15px">
            <FormLabel>Guardião</FormLabel>
            <Select
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Selecione o Guardião"
            >
              {guardianData.map(({ id, name, turno }) => {
                return <option key={id}>{name}</option>
              })}
            </Select>
          </FormControl>
          <FormControl w="400px" mt="15px" ml="15px" mb="15px">
            <FormLabel>Data de Admissão</FormLabel>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Select Date and Time"
              size="md"
              type="date"
            />
          </FormControl>
        </Card>

        <Box alignItems="flex-end" outlineColor="transparent" mt="15px">
          <DrawerChangedGuardians
            name="Alterar Guardiões"
            recipientId={checkedItems}
          />
          <DrawerSendSms
            ml="20px"
            name="Enviar sms"
            recipientId={checkedItems}
          />
        </Box>

        <Flex flexDir="column" w="86vw" h="100vh">
          <Card mt="10px">
            <CardHeader bgColor="#201b2c" borderRadius="20px">
              <Heading textColor="#fefefe" size="md">
                Guardados {qtdelementos}
              </Heading>
            </CardHeader>
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>
                    <input type="checkbox" onChange={() => marcar()} />
                  </Th>
                  <Th>Matricula</Th>
                  <Th>Nome</Th>
                  <Th>Filial</Th>
                  <Th>Setor</Th>
                  <Th>Cargo</Th>
                  <Th>Data de Admissão</Th>
                  <Th>Guardião</Th>
                  <Th>Turno</Th>
                  <Th>Status</Th>
                  <Th>WhatsApp</Th>
                </Tr>
              </Thead>
              <Tbody>
                {search.length > 0
                  ? filterUser.map(
                      ({
                        id,
                        matricula,
                        name,
                        filial,
                        setor,
                        guardian,
                        cargo,
                        turno,
                        dtadmissao,
                        uffilial,
                        numerotel
                      }) => {
                        return (
                          <Tr key={id}>
                            <Td>
                              <input
                                type="checkbox"
                                className="check"
                                onChange={(id) => toggle(id.target.id)}
                                id={id}
                              />
                            </Td>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{filial}</Td>
                            <Td>{setor}</Td>
                            <Td>{cargo}</Td>
                            <Td>{moment(dtadmissao).format('DD/MM/YYYY')}</Td>
                            <Td>{guardian.name}</Td>
                            <Td>{turno}</Td>
                            <Td>{uffilial}</Td>
                            <Td>
                              <IconButton
                                onClick={() => wppLink(numerotel)}
                                icon={<RiWhatsappFill color="green" />}
                              />
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
                        filial,
                        setor,
                        guardian,
                        cargo,
                        turno,
                        dtadmissao,
                        uffilial,
                        numerotel
                      }) => {
                        return (
                          <Tr key={id}>
                            <Td>
                              <input
                                type="checkbox"
                                className="check"
                                id={id}
                                onChange={(id) => toggle(id.target.id)}
                              />
                            </Td>
                            <Td>{matricula}</Td>
                            <Td>{name}</Td>
                            <Td>{filial}</Td>
                            <Td>{setor}</Td>
                            <Td>{cargo}</Td>
                            <Td>{moment(dtadmissao).format('DD/MM/YYYY')}</Td>
                            <Td>{guardian.name}</Td>
                            <Td>{turno}</Td>
                            <Td>{uffilial}</Td>
                            <Td>
                              <IconButton
                                onClick={() => wppLink(numerotel)}
                                icon={<RiWhatsappFill color="green" />}
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
              <option value={25}>25</option>
            </select>
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}
