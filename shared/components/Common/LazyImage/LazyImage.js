import React, { PureComponent } from 'react'
import inView from '../../../hoc/inView'
import PropTypes from 'prop-types'
import { getImage } from '../../../utils/imageUtils'
import glamorous from 'glamorous'

const ImageContainer = glamorous.div(({ loaded }) => ({
  position: 'relative',
  opacity: loaded ? 1 : 0,
  transition: 'opacity 0.4s ease-out'
}))

const Image = glamorous.img({
  position: 'relative',
  verticalAlign: 'top'
})

const BgImage = glamorous.div(({ bgSize, bgPos, bgRepeat, bgImage }) => ({
  position: 'relative',
  width: '100%',
  backgroundPosition: bgPos,
  backgroundSize: bgSize,
  backgroundRepeat: bgRepeat,
  backgroundImage: `url('${bgImage}')`
}))

@inView
export default class LazyImage extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    useBgImage: PropTypes.bool,
    alt: PropTypes.string,
    bgPos: PropTypes.string,
    bgSize: PropTypes.string,
    bgRepeat: PropTypes.string,
    isVisible: PropTypes.bool
  }

  static defaultProps = {
    useBgImage: false,
    bgPos: 'center',
    bgSize: 'cover',
    bgRepeat: 'no-repeat'
  }

  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      error: false,
      isLoading: false
    }

    this.fetchImage = this.fetchImage.bind(this)
  }

  handleImageLoad = () => {
    this.setState({
      loaded: true,
      isLoading: false,
      error: false
    })
  }

  handleImageError = () => {
    this.setState({
      loaded: false,
      error: true,
      isLoading: false
    })
  }

  async fetchImage (src = this.props.src) {
    const { loaded, isLoading } = this.state

    if (!src || loaded || isLoading) {
      return false
    }

    try {
      const image = await getImage(src)
      this.handleImageLoad(image)
    } catch (e) {
      this.handleImageError(e)
    }
  }

  componentWillReceiveProps ({ src, isVisible }) {
    if (src !== this.props.src || isVisible) {
      this.fetchImage(src)
    }
  }

  renderImage = (props) => {
    const {
      useBgImage,
      children,
      src,
      alt,
      bgPos,
      bgSize,
      bgRepeat,
      ...rest
    } = props

    return useBgImage ? (
      <BgImage draggable={false} bgImage={src} bgPos={bgPos} bgSize={bgSize} bgRepeat={bgRepeat} {...rest}>
        { children }
      </BgImage>
    ) : (
      <Image draggable={false} src={src} alt={alt} {...rest}>
        { children }
      </Image>
    )
  }

  render () {
    const { loaded, error, isLoading } = this.state
    const { className, css, ...rest } = this.props

    return (
      <ImageContainer loaded={loaded} className={className} css={css}>
        {
          (!loaded || error || isLoading) ? null : this.renderImage(rest)
        }
      </ImageContainer>
    )
  }
}
