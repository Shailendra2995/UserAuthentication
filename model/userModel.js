import mongoose from 'mongoose'

import {} from 'dotenv/config'


//const  URI = "mongodb+srv://shailendrakumarkarki:KE0MgjCtUlGb009x@cluster0.nv89mn1.mongodb.net/?retryWrites=true&w=majority"
const uri = process.env.MONGO_URI

mongoose
	.connect(uri)
	.then(() => console.log('Connected to MongoDB'))
	.catch((e) => console.log(e))

const userSchema = mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
})

const userModel = mongoose.model('User', userSchema)

export default userModel
