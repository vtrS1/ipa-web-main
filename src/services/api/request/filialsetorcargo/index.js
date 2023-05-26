import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListFilial = async () => {
  try {
    const result = await api.get('/getfilial')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}

export const ListSetor = async () => {
  try {
    const result = await api.get('/getsetor')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}

export const ListCargo = async () => {
  try {
    const result = await api.get('/getcargos')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}
