import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  userName:{
    type: String,
    unique: true
  },
  email:{
    type: String,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  accessToken:{
    type: String,
    default: ()=> crypto.randomBytes(128).toString('hex')
  },
})
//a middleware function check that access token finds a user that matches the accestoken stored in DB
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken:req.header('Authorization')})
  if(user){
    req.user = user;
    next()
  }else{
    res.status(401).json({loggedOut:true})
  }
}

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.get('/allusers', async (req,res) => {
  //res.send(req.body)
  const allUsers= await User.find()
  res.status(200).json(allUsers);

  console.log('Sucessfully got all users!')
})

// Endpoint to login with a user
app.post('/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email})
  if(user && bcrypt.compareSync(req.body.password, user.password)){
    res.json({userId: user._id, accessToken: user.accessToken})
  }else{
    res.json({notFound:true})
  }
  console.log('Sucessfully logged in!')
})

// Endpoint to create a new user
app.post('/signup', async (req,res) => {
  try{
    // take a json request body and split into name, email password
    const {userName, email, password} = req.body;
    // creates a new user instance using the userName, email, password. Password
    // is not a plaintext password, it is encrypted as hexideicmal representation
    const user = new User ({userName, email, password:bcrypt.hashSync(password)})
    // save user to database
    user.save()
    //returns json and access token and user id
    res.status(201).json({id:user._id, acessToken:user.accessToken})
  }catch(err) {
    res.status(400).json({message: 'could not create user', errors:err.errors})
  }
  console.log('Sucessfully added a user!')
})

// Authenticated endpoint that returns logged in content 
//use the authenticateUser function to protect the secrets endpoint
app.get('/content', authenticateUser)
app.get('/content', (req,res)=> {
  res.json({secret: 'This is a super secret message'})
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
