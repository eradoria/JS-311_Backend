const express = require("express");
const promoController = require("../controllers/controllers");
const router = express.Router();

router.get("/", promoController.getAll);

// router.get("/:id", promoController.getByCompanyId);

router.get("/:company_name", promoController.getByCompany);

router.post("/", promoController.createUser);

router.put("/:id", promoController.updateUserById);

router.delete("/:first_name", promoController.deleteByCompanyname);

module.exports = router;
