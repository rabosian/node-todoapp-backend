const express = require("express")
const taskController = require("../controller/task.controller")
const CommentController = require("../controller/comment.controller")
const router = express.Router()

router.post('/', taskController.createTask)
router.get('/', taskController.getAllTasks)
router.put('/:id', taskController.updateTaskStatus)
router.delete('/:id', taskController.deleteTask)

// comments controller
router.post('/:taskId/comments', CommentController.createComment)
router.get('/:taskId/comments', CommentController.getAllComments)

module.exports = router;