import PropTypes from 'prop-types'
import Styled from 'styled-components'

const MainLayout = Styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
}

export default MainLayout
