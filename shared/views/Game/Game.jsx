import React, { Component } from 'react'
import Loader from '../../components/Loader'
import glamorous from 'glamorous'

const StyledView = glamorous.div({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export default class GameView extends Component {
  render () {
    return (
      <StyledView>
        <Loader />
      </StyledView>
    )
  }
}
