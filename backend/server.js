import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true); //added due to deprecation error 26868
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);


//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
//a middleware function check that access token finds a user that matches the accestoken stored in DB
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ 
        response: {
          message:'Please log in'
        },
         success: false 
        });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
  
};

// Start defining your routes here

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Authenticated endpoint that returns logged in content
//use the authenticateUser function to protect the secrets endpoint
app.get("/content", authenticateUser);
app.get("/content", (req, res) => {
  res.json({ secret: "This is a super secret message" });
});


// Endpoint to create a new user
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const salt = bcrypt.genSaltSync();
    // take a json request body and split into name, email password 
    // creates a new user instance using the userName, email, password. Password
    // is not a plaintext password, it is encrypted as hexideicmal representation
    
    if (password.length < 5) {
			throw { message: 'Password must be at least 5 characters long' };
		}
    const newUser = await new User({ 
      username, 
      password: bcrypt.hashSync(password, salt),
    }).save();

    //returns json and access token and user id
    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    });
  }
});

// Endpoint to login with a user
app.post("/signin", async (req, res) => {
  const { username, password } = req.body
  
  try {
    const user = await User.findOne({ username});

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
    console.log("Sucessfully logged in!");
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
