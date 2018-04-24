import React, { PureComponent, Fragment } from 'react'
import LazyImage from '../../Common/LazyImage'
import ScaledWrapper from '../../Common/ScaledWrapper'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import { Pulsate } from '../../Animations'
import { Animate } from 'react-move'
import { easeQuadOut } from 'd3-ease'

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
      <Animate
        show={!active}
        start={() => ({
          y: 260
        })}

        leave={() => ({
          y: [0],
          timing: { duration: 400, ease: easeQuadOut }
        })}
      >
        {({ y }) => (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: `translate3d(-50%, ${y}%, 0)`
            }}
          >
            <LazyImage
              src='/static/assets/images/menu/gangsterclaus.png'
            />
          </div>
        )}
      </Animate>
      <Animate
        show={!active}
        start={() => ({
          y: 0,
          opacity: 1
        })}

        leave={() => ({
          y: [100],
          opacity: [0],
          timing: { duration: 400, ease: easeQuadOut },
          events: { end: onEnd }
        })}
      >
        {({ y, opacity }) => (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: `translate3d(-50%, ${-y}%, 0)`,
              opacity
            }}
          >
            <Pulsate disabled={active}>
              <LazyImage
                src='/static/assets/images/menu/skull.png'
              />
            </Pulsate>
          </div>
        )}
      </Animate>
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
          <Animate
            show
            start={() => ({
              x: -50,
              opacity: 0
            })}

            enter={() => ({
              x: [0],
              opacity: [1],
              timing: { duration: 400, ease: easeQuadOut }
            })}
          >
            {({ x, opacity }) => (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  transform: `translate3d(${x}%, 0, 0)`,
                  opacity
                }}
              >
                <LazyImage
                  src='/static/assets/images/menu/santarun.gif'
                />
              </div>
            )}
          </Animate>
        </IntroContent>
        <IntroContent>
          {
            ['Play', 'Leaderboards', 'Settings'].map((item, index) => (
              <Animate
                key={item}
                show
                start={() => ({
                  x: 50,
                  opacity: 0
                })}

                enter={() => ({
                  x: [0],
                  opacity: [1],
                  timing: { duration: 400, ease: easeQuadOut, delay: 50 * index }
                })}
              >
                {({ x, opacity }) => (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '30px',
                      color: '#787878',
                      display: 'flex',
                      alignItems: 'center',
                      transform: `translate3d(${x}%, 0, 0)`,
                      opacity
                    }}
                  >
                    {item}
                  </div>
                )}
              </Animate>
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
