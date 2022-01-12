import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  userName: {
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

//a middleware function check that access token finds a user that matches the accestoken stored in DB
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ loggedOut: true });
  }
};

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/allusers", async (req, res) => {
  //res.send(req.body)
  const allUsers = await User.find();
  res.status(200).json(allUsers);

  console.log("Sucessfully got all users!");
});

// Endpoint to login with a user
app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "User not found",
        success: false,
      });
    }
    console.log("Sucessfully logged in!");
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// Endpoint to create a new user
app.post("/signup", async (req, res) => {
  const { userName, password } = req.body;
  try {
    // take a json request body and split into name, email password
    
    // creates a new user instance using the userName, email, password. Password
    // is not a plaintext password, it is encrypted as hexideicmal representation
    // Do we need await here?
    const user = await new User({ userName, password: bcrypt.hashSync(password) }).save();

    //returns json and access token and user id
    res.status(201).json({
      response: {
        userId: user._id,
        userName: user.userName,
        accessToken: user.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
  console.log("Sucessfully added a user!");
});

// Authenticated endpoint that returns logged in content
//use the authenticateUser function to protect the secrets endpoint
app.get("/content", authenticateUser);
app.get("/content", (req, res) => {
  res.json({ secret: "This is a super secret message" });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
