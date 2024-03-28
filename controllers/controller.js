import session from 'express-session'
import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'

class Controller {
  static login_get = (req, res) => {
    // Consider implementing session validation here (e.g., checking if a user is already logged in)
    res.render('login')
  }

  static home_get = (req, res) => {
    // Validate user session or redirect to login if not authorized
    res.render('home')
  }

  static dashboard_get = (req, res) => {
    // Validate user session or redirect to login if not authorized
    res.render('dashboard')
  }

  static logout_post = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        // Consider sending an error message to the user
      }
      res.redirect('/home')
    })
  }

  static signup_get = (req, res) => {
    res.render('signup')
  }

  static signup_post = async (req, res) => {
    try {
      const data = req.body
      const existingUser = await userModel.findOne({ email: data.uemail })

      if (existingUser) {
        req.session.message = `${existingUser.name} is an existing user. Please Login!`
        res.redirect('/login')
        return; // Exit the function if user exists
      }

      const hashedPwd = await bcrypt.hash(data.upwd, 10)
      const newUser = new userModel({
        name: data.uname,
        email: data.uemail,
        password: hashedPwd,
      })
      await newUser.save()
      req.session.message = 'Signup successful. Login using your email!'
      res.redirect('/login')
    } catch (e) {
      console.error('Error during signup:', e);
      // Consider sending an error message to the user
    }
  }

  static login_post = async (req, res) => {
    try {
      const data = req.body
      const user = await userModel.findOne({ email: data.uemail })

      if (!user) {
        req.session.message = 'Invalid email or password'
        res.redirect('/login')
        return; // Exit the function if user not found
      }

      const isMatched = await bcrypt.compare(data.upwd, user.password)
      if (isMatched) {
        req.session.isValid = true; // Session validation after successful login
        res.redirect('/dashboard')
      } else {
        req.session.message = 'Invalid email or password'
        res.redirect('/login')
      }
    } catch (e) {
      console.error('Error during login:', e);
      // Consider sending an error message to the user
    }
  }
}

export default Controller
