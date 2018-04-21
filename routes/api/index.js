
const router = require("express").Router();
const articleRoutes = require("./articles.js");

router.use("/", articleRoutes);

module.exports = router;