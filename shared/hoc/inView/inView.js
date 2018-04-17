import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isElemInView, testForPassiveScroll } from '../../utils/domUtils'
import { throttle } from '../../utils/commonUtils'
import { omit } from '../../utils/objectUtils'

export default (WrappedComponent) => (
  class InView extends PureComponent {
    static propTypes = {
      scrollCheck: PropTypes.bool,
      resizeCheck: PropTypes.bool,
      timerCheck: PropTypes.bool,
      timerDelay: PropTypes.number,
      offset: PropTypes.number,
      once: PropTypes.bool
    }

    static defaultProps = {
      scrollCheck: true,
      resizeCheck: true,
      timerCheck: false,
      timerDelay: 200,
      offset: 0,
      once: false
    }

    constructor (props) {
      super(props)

      this.state = {
        isVisible: null
      }

      this.passiveData = testForPassiveScroll() ? { passive: true } : false
      this.containerRef = null
      this.timer = null
    }

    componentDidMount () {
      this.hasMounted = true
      this.start()
    }

    componentWillUnmount () {
      this.hasMounted = false
      this.cleanup()
    }

    cleanup = () => {
      this.unBindEvents()
      this.containerRef = null
    }

    start = () => {
      this.bindEvents()
      this.performCheck()
    }

    storeRef = (ref) => {
      this.containerRef = ref
    }

    bindEvents = () => {
      const { scrollCheck, resizeCheck, timerCheck, timerDelay } = this.props

      if (scrollCheck) {
        window.addEventListener('scroll', this.handleEvent, this.passiveData)
      }

      if (resizeCheck) {
        window.addEventListener('resize', this.handleEvent, false)
      }

      if (timerCheck) {
        this.timer = setInterval(this.performCheck, timerDelay)
      }
    }

    unBindEvents = () => {
      const { scrollCheck, resizeCheck, timerCheck } = this.props

      if (scrollCheck) {
        window.removeEventListener('scroll', this.handleEvent, this.passiveData)
      }

      if (resizeCheck) {
        window.removeEventListener('resize', this.handleEvent, false)
      }

      if (timerCheck) {
        this.timer = clearInterval(this.timer)
      }
    }

    performCheck = () => {
      if (!this.hasMounted) {
        return false
      }

      const isVisible = isElemInView(this.containerRef, this.props.offset)

      if (isVisible !== this.state.isVisible) {
        this.setState({ isVisible })

        if (this.props.once && isVisible) {
          this.cleanup()
        }
      }
    }

    handleEvent = throttle(this.performCheck, 100)

    render () {
      const { children, ...rest } = this.props
      const { isVisible } = this.state

      return (
        <div ref={this.storeRef}>
          <WrappedComponent isVisible={isVisible} { ...omit(rest, ['scrollCheck', 'resizeCheck', 'timerCheck', 'timerDelay']) } />
        </div>
      )
    }
  }
)
