const express = require("express");

const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(certificateController.createCertificate)
  .get(authMiddleware.authendicateToken, certificateController.getAllCertificates);

router.route("/:id").get(certificateController.getACertificate)


module.exports = router;
