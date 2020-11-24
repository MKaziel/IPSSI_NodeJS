module.exports = (server) => {
    const commentController = require('../controllers/commentController');

    server.route('/posts/:post_id/comments')
        .get(commentController.list_all_comments)
        .post(commentController.create_a_comment);

<<<<<<< HEAD
    server.route('/comments/:comment_id') // req.params.comment_id
=======
    server.route('/comments/:comment_id')
>>>>>>> 5-comments
        .get(commentController.get_a_comment)
        .put(commentController.update_a_comment)
        .delete(commentController.delete_a_comment);
}