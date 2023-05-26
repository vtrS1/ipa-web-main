import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListTags = async () => {
  try {
    const result = await api.get('/findtags')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar as Tags')
  }
}

export const createTag = (data) => api.post('/addTags', data)
