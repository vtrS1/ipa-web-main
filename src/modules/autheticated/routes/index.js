import {
  HomeScreen,
  GuardiansScreen,
  GuardedScreen,
  UserScreen,
  MessageScreen,
  TagsScreen,
  ColaboradoresScreen
} from 'modules/autheticated/screens'

export const authRoutes = [
  {
    path: '/home',
    element: <HomeScreen />
  },
  {
    path: '/guardioes',
    element: <GuardiansScreen />
  },
  {
    path: '/guardados',
    element: <GuardedScreen />
  },
  {
    path: '/usuarios',
    element: <UserScreen />
  },
  {
    path: '/mensagens',
    element: <MessageScreen />
  },
  {
    path: '/tags',
    element: <TagsScreen />
  },
  {
    path: '/colaboradores',
    element: <ColaboradoresScreen />
  }
]
