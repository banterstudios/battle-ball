import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'shared/styles/theme'
import GlobalStyle from 'shared/styles/global'
import MainLayout from 'shared/components/Layouts/Main'
import routes from 'shared/routes'

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <MainLayout>
          <Switch>
            { routes.map((route) => <Route {...route} key={route.path} />) }
          </Switch>
        </MainLayout>
        <GlobalStyle />
      </>
    </ThemeProvider>
  )
}
