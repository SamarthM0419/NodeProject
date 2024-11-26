const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const cors = require("cors");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User doesn't exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch(
  "/profile/edit",
  cors({ origin: "http://localhost:3000", credentials: true }),
  userAuth,
  async (req, res) => {
    try {
      if (!validateEditProfile(req)) {
        throw new Error("Invalid Edit request");
      }

      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );
      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName}, your profile was updated successfully`,
        data: loggedInUser,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = profileRouter;
