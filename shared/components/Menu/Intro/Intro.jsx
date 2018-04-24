import React, { PureComponent, Fragment } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import { Pulsate } from '../../Animations'
import { CSSTransition, transit } from 'react-css-transition'
CSSTransition.childContextTypes = {
  // this can be empty
}

const StyledImageRelativeContainer = glamorous.div({
  position: 'relative',
  marginTop: '20px',
  width: '50%'
})

const StyledIntro = glamorous.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
})

const IntroContentWrapper = glamorous.div({
  position: 'relative',
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%'
})

const IntroContent = glamorous.div({
  position: 'relative',
  width: '50%'
})

export default class Intro extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    isLoading: PropTypes.bool,
    onEnd: PropTypes.func
  }

  static defaultProps = {
    active: false,
    isLoading: true
  }

  renderLoader = ({ active, onEnd }) => (
    <Fragment>
      <CSSTransition
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%'
        }}
        defaultStyle={{ transform: 'translate3d(-50%, 260%, 0)' }}
        enterStyle={{
          transform: transit('translate3d(-50%, 0, 0)', 400, 'ease-in-out')
        }}
        transitionAppear
        active={active}
      >
        <LazyImage
          src='/static/assets/images/menu/gangsterclaus.png'
        />
      </CSSTransition>
      <CSSTransition
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%'
        }}
        defaultStyle={{ transform: 'translate3d(-50%, 0, 0)', opacity: 1 }}
        enterStyle={{
          transform: transit('translate3d(-50%, -100%, 0)', 400, 'ease-in-out'),
          opacity: transit(0, 400, 'ease-in-out')
        }}
        active={active}
        transitionAppear
        onTransitionComplete={onEnd}
      >
        <Pulsate disabled={active}>
          <LazyImage
            src='/static/assets/images/menu/skull.png'
          />
        </Pulsate>
      </CSSTransition>
    </Fragment>
  )

  renderOptions = () => (
    <Fragment>
      <StyledImageRelativeContainer>
        <LazyImage
          noAnimation
          src='/static/assets/images/menu/gangsterclaus.png'
        />
      </StyledImageRelativeContainer>
      <IntroContentWrapper>
        <IntroContent css={{ marginLeft: '20%' }}>
          <CSSTransition
            style={{
              position: 'relative',
              width: '100%'
            }}
            transitionAppear
            defaultStyle={{ transform: 'translate3d(-50%, 0, 0)', opacity: 0 }}
            enterStyle={{
              transform: transit('translate3d(0, 0, 0)', 300, 'ease-in-out'),
              opacity: transit(1, 300, 'ease-in-out')
            }}
            activeStyle={{
              transform: 'translate3d(0, 0, 0)',
              opacity: 1
            }}
            active
          >
            <LazyImage
              src='/static/assets/images/menu/santarun.gif'
            />
          </CSSTransition>
        </IntroContent>
        <IntroContent>
          {
            ['Play', 'Leaderboards', 'Settings'].map((item, index) => (
              <CSSTransition
                key={item}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '30px',
                  color: '#787878',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 20
                }}
                transitionAppear
                defaultStyle={{ transform: 'translate3d(50%, 0, 0)', opacity: 0 }}
                enterStyle={{
                  transform: transit('translate3d(0, 0, 0)', 300, 'ease-in-out', index * 50),
                  opacity: transit(1, 300, 'ease-in-out', index * 50)
                }}
                activeStyle={{
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1
                }}
                active
              >
                {item}
              </CSSTransition>
            ))
          }
        </IntroContent>
      </IntroContentWrapper>
    </Fragment>
  )

  render () {
    const { active, isLoading, onEnd } = this.props

    return (
      <ScaledWrapper>
        <StyledIntro>
          {
            isLoading ? (
              this.renderLoader({ active, onEnd })
            ) : (
              this.renderOptions()
            )
          }
        </StyledIntro>
      </ScaledWrapper>
    )
  }
}
