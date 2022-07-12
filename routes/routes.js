const express = require("express");
const promoController = require("../controllers/controllers");
const router = express.Router();

router.get("/", promoController.getAll);

router.get("/:company_name", promoController.getByCompanyName);

router.post("/", promoController.createUser);

router.put("/:id", promoController.updateUserById);

router.delete("/:first_name", promoController.deleteUserByFirstName);

module.exports = router;
