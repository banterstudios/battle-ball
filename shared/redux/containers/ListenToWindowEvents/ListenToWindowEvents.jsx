import React, { Component } from 'react'
import { connect } from 'react-redux'
import { globalWindowResize, listenToWindowEvent } from '../../modules/listenToWindowEvents'

const mapStateToProps = ({ windowEventData }) => ({
  ...windowEventData
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  registerEvent: (props) => dispatch(listenToWindowEvent(props))
})

const EVENT_MAPPINGS = {
  resize: globalWindowResize
}

const getEventToAction = (name) => {
  const action = EVENT_MAPPINGS[name]
  return action || null
}

export default ({ eventTypes = [] }) => (WrappedComponent) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class listenToWindowEvents extends Component {
    static WrappedComponent = WrappedComponent

    constructor (props) {
      super(props)

      const { registerEvent } = this.props

      if (Array.isArray(eventTypes) && process.browser) {
        this.events = eventTypes.reduce((arr, name) => {
          const mapEventToAction = getEventToAction(name)
          return mapEventToAction
            ? [...arr, registerEvent({ name, mapEventToAction })]
            : arr
        }, [])
      }
    }

    componentWillUnmount () {
      if (this.events && this.events.length) {
        for (let i = 0, len = this.events.length; i < len; i++) {
          this.events[i]()
        }
        this.events = null
      }
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return listenToWindowEvents
}
