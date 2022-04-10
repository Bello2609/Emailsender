const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
// this is the route that will prevent unauthorised user from accessing protected route
const routeProtect = require("../routeProtect/is_Auth");

router.get("/", routeProtect, userController.getIndex);

module.exports = router;