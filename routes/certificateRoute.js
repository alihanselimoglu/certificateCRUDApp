const express = require("express");

const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(certificateController.createCertificate)
  .get(authMiddleware.authendicateToken, certificateController.getAllCertificates);

router.route("/:id").get(certificateController.getACertificate)
router.route("/:id").delete(certificateController.deleteCertificate)
router.route("/:id").put(certificateController.updateCertificate)


module.exports = router;
