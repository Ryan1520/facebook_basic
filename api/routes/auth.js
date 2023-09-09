const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { response } = require("express")

//REGISTER
router.post('/register', (req, res) => {
  //create user model
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) throw err;
    //set password to hashed
    newUser.password = hash;

    //Save user
    newUser.save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err))
  }))  
})

//LOGIN
router.post("/login", (req, res) => {
  const user = User.findOne({email: req.body.email})
  .then(user => {
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if(err) res.status(500).json(err)
  
      if(isMatch) {
        res.status(200).json(user)
      } else {
        res.status(400).json("wrong password")
      }
    })
  })
  .catch(err => res.status(404).json("user not found"))
})

module.exports = router