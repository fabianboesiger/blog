if(req.params.user === undefined) {
    redirect("/index");
    return;
}
let user = load("user", req.params.user);
if(user === null) {
    redirect("/index");
    return;
}

let visitor = session.user === undefined ? null : load("user", session.user);

wrap("layout.js", () => {
    h1(translate({
        "en": "Comments of " + user.username,
        "de": "Kommentare von " + user.username
    }));
    nav(() => {
        a({"href": "/profile/index?user=" + user.username}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
    });

    let comments = loadAll("comment", {"author": user.username});
    if(comments.length > 0) {
        comments.forEach((comment) => {
            let id = comment.article;
            div({"class": "comment"}, () => {
                metaData(comment.author, comment.date);
                p(comment.content);
                p(() => {
                    if(visitor !== null) {
                        //a({"href": "/articles/action?type=likecomment&id=" + id + "&comment=" + comment._id, "animation": "go-stay"}, () => {
                            let c = "stats";
                            if(comment.likes.includes(visitor.username)) {
                                c += " active";
                            }
                            span({"class": c}, () => {
                                span({"class": "icon"}, "👍");
                                print(comment.likes.length);
                            });
                        //});
                        //a({"href": "/articles/action?type=dislikecomment&id=" + id + "&comment=" + comment._id, "animation": "go-stay"}, () => {
                            c = "stats";
                            if(comment.dislikes.includes(visitor.username)) {
                                c += " active";
                            }
                            span({"class": c}, () => {
                                span({"class": "icon"}, "👎");
                                print(comment.dislikes.length);
                            });
                        //});
                    } else {
                        span({"class": "stats"}, () => {
                            span({"class": "icon"}, "👍");
                            print(comment.likes.length);
                        });
                        span({"class": "stats"}, () => {
                            span({"class": "icon"}, "👎");
                            print(comment.dislikes.length);
                        });
                    }
                    /*
                    if(visitor !== null) {
                        if(visitor.username === comment.author || visitor.moderator) {
                            a({"href": "/articles/action?type=deletecomment&id=" + id + "&comment=" + comment._id}, translate({
                                "en": "Delete Comment",
                                "de": "Kommentar löschen"
                            }));
                        }
                    }*/
                    a({"href": "/articles/article?id=" + id}, translate({
                        "en": "Visit Article",
                        "de": "Artikel besuchen"
                    }));
                });
            });
        });
    } else {
        p(translate({
            "en": "There are currently no comments",
            "de": "Es sind derzeit keine Kommentare vorhanden"
        }));
    }

});