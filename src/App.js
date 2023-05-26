import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles'
import { RouterProvider } from 'react-router-dom'
import { router } from 'router'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'services/api'
import { Provider } from 'react-redux'
import { store } from 'services/store'

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
