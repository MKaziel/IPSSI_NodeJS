const Comment = require("../models/commentModel");

exports.list_all_comments = (req, res) => {
    let postId = req.params.post_id;
    Comment.find({ post_id: postId }, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur.",
            });
        } else {
            res.status(200);
            console.log(comments);
            res.json(comments);
        }
    });
};

exports.create_a_comment = (req, res) => {
    // let elements = req.body; elements['post_id'] = req.params.post_id;
    // let new_comment = new Comment(elements);
    let url = "https://loripsum.net/api/plaintext";
    let body = req.body;
    const axios = require("axios");

    if (
        typeof body.message === "undefined" ||
        body.message === null ||
        body.message === ""
    ) {
        axios.get(url).then(function (response) {
            if (response.status == 200) {
                console.log("\n MESSAGE \n");
                console.log(response.data);

                let new_comment = new Comment({
                    ...req.body,
                    message: response.data,
                    post_id: req.params.post_id,
                });
                new_comment.save((error, comment) => {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({
                            message: "Erreur serveur.",
                        });
                    } else {
                        res.status(201);
                        res.json(comment);
                    }
                });
            }
        }).catch(function(response){
            res.status(400);
            console.log(response);
            res.json({
                message : "Bad request : Impossible to acces to url given in parameter",
            });
        });
    } else {
        let new_comment = new Comment({
            ...req.body,
            post_id: req.params.postId,
        });
        new_comment.save((error, comment) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur.",
                });
            } else {
                res.status(201);
                res.json(comment);
            }
        });
    }
};

exports.get_a_comment = (req, res) => {
    Comment.findById(req.params.comment_id, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur.",
            });
        } else {
            res.status(200);
            console.log(comment);
            res.json({
                message: "Comment find !",
                object: comment,
            });
        }
    });
};

exports.update_a_comment = (req, res) => {
    Comment.findByIdAndUpdate(
        req.params.comment_id,
        req.body,
        { new: true },
        (error, comment) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur.",
                });
            } else {
                res.status(200);
                console.log(comment);
                res.json({
                    message: "Comment modified !",
                    object: comment,
                });
            }
        }
    );
};

exports.delete_a_comment = (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur.",
            });
        } else {
            res.status(200);
            res.json({ message: "Comment deleted !" });
        }
    });
};
