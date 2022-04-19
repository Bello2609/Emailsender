const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");
// this is the route that will prevent unauthorised user from accessing protected route
const routeProtect = require("../routeProtect/is_Auth");

router.get("/", routeProtect, userController.getIndex);

router.post("/postMessage", userController.postMessage );

module.exports = router;