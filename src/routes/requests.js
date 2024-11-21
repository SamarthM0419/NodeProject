const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const data = req.user;

  //sending a connection request
  console.log("sending a connection request");
  res.send(data.firstName + " sent connection request");
});

module.exports = requestRouter;