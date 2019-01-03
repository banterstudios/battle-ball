import React from 'react'
import { hydrate } from 'react-dom'
import Router from 'shared/config/router'
import { queryById } from 'shared/utils/domUtils'

hydrate(
  <Router />,
  queryById('app')
)
