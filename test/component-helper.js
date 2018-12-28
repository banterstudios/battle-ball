import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

const simulateEventHelper = (component) => ({
  eventName, eventType, targets = [],
  getEvent = jest.fn(),
  afterAllEvents = jest.fn()
}) => {
  targets.forEach(({ selector, beforeEvent = jest.fn(), afterEvent = jest.fn() }) => {
    component.instance.componentDidMount()
    beforeEvent(component)

    const event = getEvent(eventType)

    if (eventType === 'element' && selector) {
      component.wrapper.find(selector)
        .simulate(eventName, event)
    }
    if (eventType === 'document') {
      const [, eventHandler] = global.document.addEventListener.mock.calls
        .find(([listenerName]) => listenerName === eventName)

      eventHandler(event)
    }

    afterEvent(component)
  })

  afterAllEvents(component)
}

const renderComponentHelper = (Component, mountOptions = {}) => {
  const { WrappedComponent } = Component
  if (WrappedComponent) {
    return renderComponentHelper(WrappedComponent, mountOptions)
  }

  beforeAll(() => {
    global.document.addEventListener = jest.fn(
      global.document.addEventListener.bind(global.document)
    )

    global.document.removeEventListener = jest.fn(
      global.document.removeEventListener.bind(global.document)
    )
  })

  afterEach(() => {
    global.document.addEventListener.mockClear()
    global.document.removeEventListener.mockClear()
  })

  return ({ children, ...props } = {}, { fullRender = false } = {}) => {
    // ".setContext() can only be used on a wrapper that was initially created
    // with a call to mount() that includes a context specified in the options
    // argument." - Enzyme docs
    // https://github.com/airbnb/enzyme/blob/v2.9.1/docs/api/ReactWrapper/setContext.md
    const mountCommonContext = { context: {} }

    const options = [
      <Component {...props}>{ children }</Component>,
      { ...mountCommonContext, ...mountOptions }
    ]

    const wrapper = fullRender ? mount(...options) : shallow(...options)

    const component = {
      wrapper,
      instance: wrapper.instance(),
      getTree: () => toJson(wrapper),
      getTreeFor: (selectedWrapper) => toJson(selectedWrapper)
    }

    return {
      ...component,
      simulateEvent: simulateEventHelper(component)
    }
  }
}

export default renderComponentHelper
