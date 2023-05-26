import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListMessage = async () => {
  try {
    const result = await api.get('/findmessages')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar as mensagens')
  }
}

export const updateMessage = async (data) =>
  await api.put('/updateMessage', data)

export const createMessage = async (data) => await api.post('/addMessage', data)
