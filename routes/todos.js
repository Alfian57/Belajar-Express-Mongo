const express = require("express");
const router = express.Router();
const db = require("../models");
const Todo = db.todos;
const {
  createValidation,
  updateValidation,
} = require("../validation/todoValidation");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res, next) => {
  Todo.find()
    .then((result) => {
      res.send({
        status: true,
        message: "Success to Get All Todos",
        data: {
          todos: result,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message,
        data: null,
      });
    });
});

router.get("/:id", verifyToken, async (req, res, next) => {
  Todo.findById(req.params.id)
    .then((result) => {
      res.send({
        status: true,
        message: "Succes to Get Todo",
        data: {
          todo: result,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: err.message,
        data: null,
      });
    });
});

router.post("/", verifyToken, async (req, res) => {
  const validation = createValidation(req.body);

  if (validation) {
    return res.status(400).send({
      status: false,
      message: validation.message,
      data: null,
    });
  }

  const todo = new Todo({
    todo: req.body.todo,
    is_done: req.body.is_done,
  });

  todo
    .save()
    .then((result) => {
      res.status(201).json({
        status: true,
        message: "Success to Create Todo",
        data: {
          todo: result,
        },
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: false,
        message: err.message,
        data: null,
      });
    });
});

router.put("/:id", verifyToken, async (req, res) => {
  const validation = updateValidation(req.body);

  if (validation) {
    return res.status(400).send({
      status: false,
      message: validation.message,
      data: null,
    });
  }

  Todo.findOneAndUpdate(req.params.id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          status: false,
          message: "Todo Not Found",
          data: null,
        });
      }

      res.status(404).json({
        status: true,
        message: "Success to Update Todo",
        data: {
          todo: result,
        },
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: false,
        message: err.message,
        data: null,
      });
    });
});

router.delete("/:id", verifyToken, async (req, res) => {
  Todo.findOneAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          status: false,
          message: "Todo Not Found",
          data: null,
        });
      }

      res.status(404).json({
        status: true,
        message: "Success to Delete Todo",
        data: {
          todo: result,
        },
      });
    })
    .catch((err) => {
      res.status(409).json({
        status: false,
        message: err.message,
        data: null,
      });
    });
});

module.exports = router;
