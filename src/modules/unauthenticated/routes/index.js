import { ForgotScreen, LoginScreen, ResetScreen } from '../screens'

export const unauthRoutes = [
  {
    path: '/',
    element: <LoginScreen />
  },
  {
    path: '/forgotpassword',
    element: <ForgotScreen />
  },
  {
    path: '/resetpassword',
    element: <ResetScreen />
  }
]
