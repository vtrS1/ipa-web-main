import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListGuarded = async () => {
  try {
    const result = await api.get('/findguarded')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os usuários')
  }
}

export const sendSms = (data) => api.post('/sendsms', data)
