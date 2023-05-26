import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListColaborator = async () => {
  try {
    const result = await api.get('/findcolaboradores')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}
