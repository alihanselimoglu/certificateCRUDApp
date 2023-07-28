const express = require("express");

const pageController = require("../controllers/pageControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(authMiddleware.authendicateToken, pageController.getIndexPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/logout").get(pageController.getLogout);
router.route("/contact").get(pageController.getContactPage);
router.route("/contact").post(pageController.sendMail);

module.exports = router;
