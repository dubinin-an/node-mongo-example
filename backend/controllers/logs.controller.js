const db = require("../models");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const Logs = db.logs;

// Retrieve all
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    console.log('findAll', req.query)

    Logs.find({})
    .then((data) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, data);
    })
    .catch((err) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

// Find a single
exports.findOne = (req, res) => {
  const id = req.params.id;

    Logs.findById(id)
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

// Delete all
exports.deleteAll = (req, res) => {
    Logs.deleteMany({})
    .then(data => {
      // message: `${data.deletedCount} Tutorials were deleted successfully!`
      serverResponses.sendSuccess(res, messages.SUCCESSFUL_DELETE, data);
    })
    .catch(err => {
      serverResponses.sendError(res, messages.BAD_REQUEST, err);
    });
};

