import express from 'express'
import serverSideRender from '../controllers/serverSideRender'

const router = express.Router()

router.get(['/', '/game'], serverSideRender)

export default router
