import '@babel/polyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-styled-components'

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
})

process.on('unhandledRejection', (error) => console.log(error)) // eslint-disable-line
