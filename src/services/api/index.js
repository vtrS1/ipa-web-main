import axios from 'axios'
import { QueryClient } from 'react-query'

export const api = axios.create({
  baseURL: 'http://ipa-api.novaeranet.com.br',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('tokenapi')}`
  }
})

export const queryClient = new QueryClient()
