const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")

//update user
router.put("/:id", async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin){
    if (req.body.password){
      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) res.status(500).json(err)
        //set password to hashed
        req.body.password = hash;
      }))  
    }
    
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!")
  }
})

//delete user
router.delete("/:id", async (req,res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been deleted")
    } catch(err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!")
  }
})

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username

  try{
    const user = userId 
      ? await User.findById(req.query.userId)
      : await User.findOne({username: username})
    const {password, updatedAt, ...other} = user._doc
    res.status(200).json(other)
  } catch(err) {
    res.status(500).json(err)
  }
})


//Get all users 
router.get('/all', async (req, res) => {
  try{
    const users = await User.find()
    const securedUsers = users.map(user => {
      const {password, updatedAt, ...other} = user._doc
      return other
    })
    res.status(200).json(securedUsers)
  } catch (err) {
    res.status(500).json(err)
  }
})


//Get Friends
router.get("/friends/:userId", async (req, res) => {
  try{
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(user.followings.map(friendId => {
      return User.findById(friendId)
    }))

    let friendList = []
    friends.map(friend => {
      const {_id, username, profilePicture} = friend
      friendList.push({_id, username, profilePicture})
    })
    
    res.status(200).json(friendList)
    
    
  } catch (err) {
    res.status(500).json(err)
  }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers: req.body.userId}})
        await currentUser.updateOne({$push:{followings: req.params.id}})

        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)){
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json ("you didn't follow this user")
      }
    } catch(err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You can't unfollow yourself")
  }
})

module.exports = router