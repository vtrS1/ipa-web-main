import { createBrowserRouter } from 'react-router-dom'
import { unauthRoutes } from 'modules/unauthenticated/routes'
import { authRoutes } from 'modules/autheticated/routes'

export const router = createBrowserRouter([...unauthRoutes, ...authRoutes])
