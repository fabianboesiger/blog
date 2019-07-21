let id = req.params.id;

if(id === undefined) {
    redirect("/articles");
    return;
}
let article = load("article", id);
if(article === null) {
    redirect("/articles");
    return;
}


let visitor = session.user === undefined ? null : load("user", session.user);

let type = req.params.type;
if(type !== undefined) {
    if(type === "like") {
        if(article.likes.includes(visitor.username)) {
            article.likes.splice(article.likes.indexOf(visitor.username), 1);
        } else {
            article.likes.push(visitor.username);  
            if(article.dislikes.includes(visitor.username)) {
                article.dislikes.splice(article.dislikes.indexOf(visitor.username), 1);
            }
        }
    } else
    if(type === "dislike") {
        if(article.dislikes.includes(visitor.username)) {
            article.dislikes.splice(article.dislikes.indexOf(visitor.username), 1);
        } else {
            article.dislikes.push(visitor.username);
            if(article.likes.includes(visitor.username)) {
                article.likes.splice(article.likes.indexOf(visitor.username), 1);
            }
        }
    } else
    if(type === "delete") {
        unlinkAll("comment", {"article": article._id});
        unlink(article);
        redirect("/articles");
        return;
    } else {
        let commentid = req.params.comment;
        if(commentid === undefined) {
            return;
        }
        let comment = load("comment", commentid);
        if(comment === null) {
            return;
        }

        if(type === "likecomment") {
            if(comment.likes.includes(visitor.username)) {
                comment.likes.splice(comment.likes.indexOf(visitor.username), 1);
            } else {
                comment.likes.push(visitor.username);  
                if(comment.dislikes.includes(visitor.username)) {
                    comment.dislikes.splice(comment.dislikes.indexOf(visitor.username), 1);
                }
            }
        } else
        if(type === "dislikecomment") {
            if(comment.dislikes.includes(visitor.username)) {
                comment.dislikes.splice(comment.dislikes.indexOf(visitor.username), 1);
            } else {
                comment.dislikes.push(visitor.username);
                if(comment.likes.includes(visitor.username)) {
                    comment.likes.splice(comment.likes.indexOf(visitor.username), 1);
                }
            }
        } else
        if(type === "deletecomment") {
            unlink(comment);
            return;
        }

        save(comment);

    }
}

save(article);

redirect("/articles/article?id=" + id);