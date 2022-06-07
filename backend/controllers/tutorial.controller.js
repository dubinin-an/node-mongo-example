const db = require("../models");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return serverResponses.sendError(req.body, messages.BAD_REQUEST);
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then((data) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, data);
    })
    .catch((err) => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then((data) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, data);
    })
    .catch((err) => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        serverResponses.sendError(res, messages.NOT_FOUND, data);
      else
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, data);
    })
    .catch((err) => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return serverResponses.sendError(req.body, messages.BAD_REQUEST);
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data)
        serverResponses.sendError(res, messages.NOT_FOUND, data);
      else
        serverResponses.sendSuccess(res, messages.SUCCESSFUL_UPDATE, data);
    })
    .catch(err => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data)
        serverResponses.sendError(res, messages.NOT_FOUND, data);
      else
        serverResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE, data);
    })
    .catch(err => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      // message: `${data.deletedCount} Tutorials were deleted successfully!`

      serverResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE, data);
    })
    .catch(err => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

//Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
