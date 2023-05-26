import { api } from 'services/api'
import { ErrorAlert } from 'components'

export const ListGuardians = async () => {
  try {
    const result = await api.get('/findguardians')
    return result.data
  } catch (error) {
    ErrorAlert('Não foi possivel buscar os Guardiões')
  }
}

export const createGuardian = (data) => api.post('/addGuardians', data)

export const updateGuardian = (data) => api.put('/guardianUpdate', data)

export const changedGuardian = (data) => api.post('/changed-guardian', data)

export const selectguardian = (data) => api.post('/selectguardian', data)
