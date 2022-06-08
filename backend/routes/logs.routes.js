module.exports = app => {
  const logs = require("../controllers/logs.controller.js");

  const router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", logs.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", logs.findOne);

  // Create a new Tutorial
  router.delete("/", logs.deleteAll);

  app.use("/api/logs", router);
};
