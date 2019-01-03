import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import themeVariables from 'shared/styles/theme-variables'
import MainLayout from 'shared/components/Layouts/Main'
import routes from 'shared/routes'

export default () => {
  return (
    <ThemeProvider theme={themeVariables}>
      <MainLayout>
        <Switch>
          { routes.map((route) => <Route {...route} key={route.path} />) }
        </Switch>
      </MainLayout>
    </ThemeProvider>
  )
}
