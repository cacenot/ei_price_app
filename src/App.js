import React from 'react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import {
  Container,
} from '@material-ui/core'

import MuiTheme from './styles/mui'
import MainPage from './pages/MainPage'
import ProductsProvider from './entities/Product/provider'

function App() {
  return (
    <MuiThemeProvider theme={MuiTheme}>
      <ProductsProvider>
        <Container>
          <MainPage />
        </Container>
      </ProductsProvider>
    </MuiThemeProvider>
  )
}

export default App
