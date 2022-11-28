const express = require("express");
const todolist = require("../controllers/todo.controller");
const account = require("../controllers/account.controller");
const router = express.Router();

router.route("/sign-in").post(account.signin);
router.route("/sign-up").post(account.signup);
router.route('/home/:id').get(todolist.findAllInAccount)
router
    .route("/")
    .get(todolist.findAll)
    .post(todolist.create)
    .delete(todolist.deleteAll);

router.route("/important").get(todolist.findAllImportant);

router
    .route("/:id")
    .get(todolist.findOne)
    .put(todolist.update)
    .delete(todolist.delete);

module.exports = router;
