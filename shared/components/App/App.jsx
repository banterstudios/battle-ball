import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import themeVariables from 'shared/styles/theme-variables'
import MainLayout from 'shared/components/Layouts/Main'

export default ({ routes }) => {
  return (
    <ThemeProvider theme={themeVariables}>
      <MainLayout>
        <Switch>
          { routes.map((route, index) => <Route {...route} key={index} />) }
        </Switch>
      </MainLayout>
    </ThemeProvider>
  )
}
