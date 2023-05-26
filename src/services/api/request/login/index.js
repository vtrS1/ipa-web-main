import { api } from 'services/api'

export const loginRealease = (data) => api.post('/login', data)

export const forgotPassword = (data) => api.post('/forgot-password', data)

export const resetPassword = (data) => api.post('/reset-password', data)
