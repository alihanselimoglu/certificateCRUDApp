const express = require("express");

const userController = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const certificateController = require("../controllers/certificateController");

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/dashboard").get(authMiddleware.authendicateToken, userController.getDashboardPage);
router.route("/certificates/:id").get(certificateController.getACertificate)

module.exports = router;
