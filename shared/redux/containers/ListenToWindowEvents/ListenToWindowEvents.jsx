import { connect } from 'react-redux'
import { globalWindowResize, listenToWindowEvent } from '../../modules/listenToWindowEvents'

const mapStateToProps = ({ windowEventData }) => ({
  ...dropZone[stateName] || {}
})

const mapDispatchToProps = (dispatch, { stateName: key }) => ({
  onDrop: (files) => {
    return dispatch(addFiles({ files, key }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropZone)
