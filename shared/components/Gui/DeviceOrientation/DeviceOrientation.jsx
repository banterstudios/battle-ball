import React, { PureComponent } from 'react'
import LazyImage from '../../Common/LazyImage'
import glamorous from 'glamorous'

const StyledArticle = glamorous.article(({
  theme: {
    priorityModalZIndex,
    modalPrimaryBg
  }
}) => ({
  zIndex: priorityModalZIndex,
  display: 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url('/static/assets/images/rotate-back.jpg')`,
  backgroundColor: modalPrimaryBg,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}))

const StyledImgWrapper = glamorous.div(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '75%',
  margin: 'auto'
}))

export default class DeviceOrientation extends PureComponent {
  render () {
    return (
      <StyledArticle>
        <StyledImgWrapper>
          <LazyImage src='/static/assets/images/rotate-text.jpg' />
        </StyledImgWrapper>
      </StyledArticle>
    )
  }
}
