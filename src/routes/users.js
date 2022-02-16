const express = require("express");
const User = require("../schema/users");
const router = new express.Router();
const cors = require('cors')

router.post("/users/new", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ err: e.message });
  }
});

router.post("/users/login", async (req,res)=>{
    try{
        const user = await User.checkCredentials(req.body.user,req.body.password)
        const token = await user.generateAuthToken()
        res.send({success:true,data:user,token:token});
    }
    catch(error){
        console.log("User: "+req.body.user+", Message: "+error.message)
        res.status(201).send({
            success:false
        })
    }

})

module.exports = router;
