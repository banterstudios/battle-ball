import Home from 'shared/views/Home'
import Game from 'shared/views/Game'
import PageNotFound from 'shared/views/PageNotFound'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/game',
    component: Game,
    exact: true
  },
  {
    path: '*',
    component: PageNotFound
  }
]
