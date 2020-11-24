const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) =>{
    let postId =  req.params.comment_id;
    Comment.find({ post_id: postId},(error,comments)=>{
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments);
        }
    })
}

exports.create_a_comment = () =>{
    let new_post = new Comment(req.body);

    new_post.post_id = req.params.comment_id;

    new_post.save((error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(201);
            res.json(comment);
        }
    });
}

exports.get_a_comment = () =>{

}

exports.update_a_comment = () => {

}

exports.delete_a_comment = () => {
    
}