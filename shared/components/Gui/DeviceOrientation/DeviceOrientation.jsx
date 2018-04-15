import React, { PureComponent } from 'react'
import LazyImage from '../../Common/LazyImage'
import glamorous from 'glamorous'
import { createPortal } from 'react-dom'
import { queryById } from '../../../utils/domUtils'

const rootElem = process.browser ? queryById('modal-root') : null

const StyledArticle = glamorous.article(({
  theme: {
    priorityModalZIndex,
    modalPrimaryBg
  }
}) => ({
  zIndex: priorityModalZIndex,
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  position: 'relative',
  width: '75%'
}))

export default class DeviceOrientation extends PureComponent {
  render () {
    return rootElem ? (
      createPortal(
        <StyledArticle>
          <StyledImgWrapper>
            <LazyImage src='/static/assets/images/rotate-text.jpg' />
          </StyledImgWrapper>
        </StyledArticle>,
        rootElem
      )
    ) : null
  }
}
