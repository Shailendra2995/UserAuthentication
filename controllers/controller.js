import session from 'express-session'
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'

class Controller {
	static login_get = (req, res) => {
		req.session.isValid = true
		res.render('login')
	}
	static home_get = (req, res) => {
		res.render('home')
	}

	static dashboard_get = (req, res) => {
		res.render('dashboard')
	}

	static logout_post = (req, res) => {
		req.session.destroy((err) => {
			if (err) throw err
			res.redirect('/home')
		})
	}
	static signup_get = (req, res) => {
		res.render('signup')
	}
	static signup_post = async (req, res) => {
		try {
			const data = req.body
			const userEmail = await userModel.findOne({ email: data.uemail })

			if (userEmail) {
				req.session.message = `${userEmail.name} is an existing user. Please Login!`

				res.redirect('/login')
			}

			const hashedPwd = await bcrypt.hash(data.upwd, 10)
			if (!userEmail) {
				const newUser = new userModel({
					name: data.uname,
					email: data.uemail,
					password: hashedPwd,
				})
				await newUser.save()
				req.session.message =
					'Signup successful. Login using your email!'
				res.redirect('/login')
			}
			res.redirect('/home')
		} catch (e) {
			console.log(e)
		}
	}
	static login_post = async (req, res) => {
		try {
			const data = req.body
			const user = await userModel.findOne({
				email: data.uemail,
			})
			const isMatched = await bcrypt.compare(data.upwd, user.password)
			if (isMatched) res.redirect('/dashboard')
		} catch (e) {
			console.log(e)
		}
	}
}

export default Controller
