import React from 'react'
import { hydrate } from 'react-dom'
import { queryById } from 'shared/utils/domUtils'
import Client from './Client'

hydrate(
  <Client />,
  queryById('app')
)
