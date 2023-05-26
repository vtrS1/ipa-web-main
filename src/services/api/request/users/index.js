import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const createUser = (data) => api.post('/addUsers', data)

export const updateUser = (data) => api.put('/userUpdate', data)

export const ListUser = async () => {
  try {
    const result = await api.get('/finduser')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}
