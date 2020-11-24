const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) =>{
    let postId =  req.params.post_id;
    Comment.find({'post_id': postId},(error,comments)=>{
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            console.log(comments);
            res.json(comments);
        }
    })
}

exports.create_a_comment = (req, res) =>{
    let elements = req.body; elements['post_id'] = req.params.post_id;
    
    let new_comment = new Comment(elements);

    new_comment.save((error, comment) => {
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

exports.get_a_comment = (req,res) => {

}

exports.update_a_comment = (req,res) => {

}

exports.delete_a_comment = (req,res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({message: "Comment deleted !"});
        }
    })
}