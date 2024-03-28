import express from 'express'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import router from './routes/index.js'
import {} from 'dotenv/config'

const uri = process.env.MONGO_URI 

	
//const  URI = "mongodb+srv://shailendrakumarkarki:KE0MgjCtUlGb009x@cluster0.nv89mn1.mongodb.net/?retryWrites=true&w=majority"

const app = express()

app.use(express.urlencoded({ extended: true }))

const session_store = MongoStore.create({
	mongoUrl: uri,
	dbName: 'CostcoUsers',
	collectionName: 'CostcoSessions',
})

app.use(
	session({
		secret: 'A secret key to sign the cookie',
		saveUninitialized: false,
		resave: false,
		store: session_store,
	})
)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', router)

const PORT = process.env.PORT || 8050
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
