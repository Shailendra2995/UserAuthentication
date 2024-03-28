import Controller from '../controllers/controller.js'
import isValid from '../middlewares/validate.js'
import express from 'express'

const router = express.Router()

router.get('/login', Controller.login_get)
router.post('/login', Controller.login_post)
router.get('/', Controller.home_get)
router.get('/dashboard', isValid, Controller.dashboard_get)
router.post('/logout', Controller.logout_post)
router.get('/signup', Controller.signup_get)
router.post('/signup', Controller.signup_post)

export default router
