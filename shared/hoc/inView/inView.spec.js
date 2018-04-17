import React from 'react'
import { shallow, mount } from 'enzyme'
import inView from './inView'

const MockComponent = () => (<div />)

jest.useFakeTimers()
jest.mock('shared/utils/domUtils/domUtils.js')

const { isElemInView } = require('shared/utils/domUtils/domUtils.js')

isElemInView.mockImplementation(() => true)

describe('components/Common/InView', () => {
  let StubComponent

  beforeEach(() => {
    StubComponent = inView(MockComponent)
  })

  describe('Given this component', () => {
    describe('When it is rendered', () => {
      it('should exist', () => {
        const component = shallow(<StubComponent />)
        expect(component.exists()).toBe(true)
        component.unmount()
      })

      it('should render passed children', () => {
        const component = shallow(<StubComponent />)
        expect(component.find('MockComponent')).toHaveLength(1)
        component.unmount()
      })
    })

    describe('When checking visibility', () => {
      describe('and its initially mounted it will perform a check', () => {
        describe('and the component is visible', () => {
          it('then set isVisible to true', () => {
            isElemInView.mockImplementation(() => true)

            const component = mount(<StubComponent />)
            expect(component.instance().state.isVisible).toBe(true)
          })
        })

        describe('and the component is not visible', () => {
          it('then set isVisible to false', () => {
            isElemInView.mockImplementation(() => false)

            const component = mount(<StubComponent />)
            expect(component.instance().state.isVisible).toBe(false)
          })
        })
      })

      describe('Given a child component', () => {
        describe('When it is rendered', () => {
          it('it will receive isVisible prop', () => {
            const component = mount(<StubComponent />)
            expect(component.find('MockComponent').props().isVisible).toBeDefined()
          })
        })
      })

      describe('Given the timerCheck prop is enabled', () => {
        describe('When a period of time has passed', () => {
          describe('And the component is visible', () => {
            it('isVisible is set to true', () => {
              isElemInView.mockImplementation(() => false)
              const component = mount(<StubComponent timerCheck />)
              isElemInView.mockImplementation(() => true)
              jest.advanceTimersByTime(200)
              expect(component.instance().state.isVisible).toBe(true)
            })
          })

          describe('And the component is not visible', () => {
            it('isVisible set to false', () => {
              isElemInView.mockImplementation(() => true)
              const component = mount(<StubComponent timerCheck />)
              isElemInView.mockImplementation(() => false)
              jest.advanceTimersByTime(200)
              expect(component.instance().state.isVisible).toBe(false)
            })
          })
        })
      })

      describe('Given the prop "once" is enabled', () => {
        describe('And isVisible is true', () => {
          it('perform a clean up', () => {
            isElemInView.mockImplementation(() => false)
            StubComponent = inView(MockComponent)
            const component = mount(<StubComponent once />)
            isElemInView.mockImplementation(() => true)
            const spy = jest.spyOn(component.instance(), 'cleanup')
            component.instance().forceUpdate()
            component.instance().start()

            expect(spy.mock.calls.length).toBe(1)
          })
        })
      })
    })
  })
})
