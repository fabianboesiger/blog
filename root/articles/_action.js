const fs = require("fs");

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
        save(article);
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
        save(article);
    } else
    if(type === "delete") {
        unlinkAll("comment", {"article": article._id});
        let path = "./root/files/" + article._id;
        if(fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                fs.unlinkSync(path + "/" + file);
            });
            fs.rmdirSync(path);
        }
        unlink(article);
        redirect("/articles");
        return;
    } else {
        let commentid = req.params.comment;
        if(commentid === undefined) {
            redirect("/articles/article?id=" + id);
        }
        let comment = load("comment", commentid);
        if(comment === null) {
            redirect("/articles/article?id=" + id);
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
            save(comment);
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
            save(comment);
        } else
        if(type === "deletecomment") {
            unlink(comment);
        }

    }
}

redirect("/articles/article?id=" + id);