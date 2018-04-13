import React from 'react'

import {
  Route,
  Switch
} from 'react-router-dom'

import { ThemeProvider } from 'glamorous'

import MainLayout from '../Layouts/Main'

import Home from '../../views/Home'
import PageNotFound from '../../views/PageNotFound'

export default (props) => {
  return (
    <ThemeProvider theme={{}}>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </MainLayout>
    </ThemeProvider>
  )
}
