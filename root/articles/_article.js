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

let referer = req.headers.referer;
if(referer !== undefined) {
    referer = referer.substring(referer.indexOf("//") + 2);
    referer = referer.substring(referer.indexOf("/"), referer.indexOf("?"));
    if(article.visible && !["/articles/article", "/articles/write", "/articles/action"].includes(referer)) {
        article.clicks++;
        save(article);
    }
}

const fs = require("fs");
const md = (new (require("remarkable"))());

wrap("layout.js", () => {
    /*
    let cut = article.content.indexOf("\n");
    let title = article.content.substring(article.content.indexOf("# "));
    let content = null;
    if(cut !== -1) {
        title = article.content.substring(article.content.indexOf("# "), cut);
        content = article.content.substring(cut);
    }
    */

    let rendered = md.render(article.content);

    let title = rendered.substring(rendered.indexOf("<h1>"), rendered.indexOf("</h1>") + 5);
    let content = rendered.substring(rendered.indexOf("</h1>") + 5);

    if(title !== null) {
        output += title;
    }

    nav(() => {
        a({"href": "/articles/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));

        if(visitor !== null) {
            if(visitor.username === article.author) {
                a({"href": "/articles/write?id=" + article._id}, translate({
                    "en": "Edit Article",
                    "de": "Artikel bearbeiten"
                }));
            }
            if(visitor.username === article.author || visitor.moderator) {
                a({"href": "/articles/action?type=delete&id=" + article._id}, translate({
                    "en": "Delete Article",
                    "de": "Artikel löschen"
                }));
            }
        }

        metaData(article.author, article.date);

        p(() => {
            if(visitor !== null) {
                a({"href": "/articles/action?type=like&id=" + id, "animation": "go-stay"}, () => {
                    let c = "stats";
                    if(article.likes.includes(visitor.username)) {
                        c += " active";
                    }
                    span({"class": c}, () => {
                        span({"class": "icon"}, "👍");
                        print(article.likes.length);
                    });
                });
                a({"href": "/articles/action?type=dislike&id=" + id, "animation": "go-stay"}, () => {
                    let c = "stats";
                    if(article.dislikes.includes(visitor.username)) {
                        c += " active";
                    }
                    span({"class": c}, () => {
                        span({"class": "icon"}, "👎");
                        print(article.dislikes.length);
                    });
                });
            } else {
                span({"class": "stats"}, () => {
                    span({"class": "icon"}, "👍");
                    print(article.likes.length);
                });
                span({"class": "stats"}, () => {
                    span({"class": "icon"}, "👎");
                    print(article.dislikes.length);
                });
            }
            span({"class": "stats"}, () => {
                span({"class": "icon"}, "👀");
                print(article.clicks);
            });
            let categories = {
                "politics": {
                    "text": translate({
                        "en": "Politics",
                        "de": "Politik"
                    }),
                    "emoji": "⚖️"
                },
                "technology": {
                    "text": translate({
                        "en": "Technology",
                        "de": "Technologie"
                    }),
                    "emoji": "🛸"
                },
                "science": {
                    "text": translate({
                        "en": "Science",
                        "de": "Wissenschaft"
                    }),
                    "emoji": "🔬"
                },
                "entertainment": {
                    "text": translate({
                        "en": "Entertainment",
                        "de": "Unterhaltung"
                    }),
                    "emoji": "🎤"
                },/*
                "sports": {
                    "text": translate({
                        "en": "Sports",
                        "de": "Sport"
                    }),
                    "emoji": "⚽️"
                },
                "gaming": {
                    "text": translate({
                        "en": "Gaming",
                        "de": "Gaming"
                    }),
                    "emoji": "🎮"
                },*/
                "politics": {
                    "text": translate({
                        "en": "Politics",
                        "de": "Politik"
                    }),
                    "emoji": "⚖️"
                },
                "meta": {
                    "text": translate({
                        "en": "Meta",
                        "de": "Meta"
                    }),
                    "emoji": "📣"
                }
            }
            span({"class": "stats"}, () => {
                span({"class": "icon"}, categories[article.category].emoji);
                print(categories[article.category].text);
            });
            let languages = {
                "en": {
                    "text": translate({
                        "en": "English",
                        "de": "Englisch"
                    }),
                    "emoji": "🇺🇸"
                },
                "de": {
                    "text": translate({
                        "en": "German",
                        "de": "Deutsch"
                    }),
                    "emoji": "🇩🇪"
                }
            }
            span({"class": "stats"}, () => {
                span({"class": "icon"}, languages[article.language].emoji);
                print(languages[article.language].text);
            });
        });
    });
    
    if(content !== null) {
        output += content.replace(/src="/, "src=\"/files/" + id + "/");
    }
    h2(translate({
        "en": "Write a Comment",
        "de": "Kommentar schreiben"
    }));
    request("comment", save, translate({
        "en": "The comment could not be saved",
        "de": "Der Kommentar konnte nicht erstellt werden"
    }), translate({
        "en": "Comment saved successfully",
        "de": "Kommentar erfolgreich erstellt"
    }));
    h2(translate({
        "en": "Comments",
        "de": "Kommentare"
    }));
    let comments = loadAll("comment", {"article": id});
    if(comments.length > 0) {
        comments.forEach((comment) => {
            div({"class": "comment"}, () => {
                metaData(comment.author, comment.date);
                p(comment.content);
                p(() => {
                    if(visitor !== null) {
                        a({"href": "/articles/action?type=likecomment&id=" + id + "&comment=" + comment._id, "animation": "go-stay"}, () => {
                            let c = "stats";
                            if(comment.likes.includes(visitor.username)) {
                                c += " active";
                            }
                            span({"class": c}, () => {
                                span({"class": "icon"}, "👍");
                                print(comment.likes.length);
                            });
                        });
                        a({"href": "/articles/action?type=dislikecomment&id=" + id + "&comment=" + comment._id, "animation": "go-stay"}, () => {
                            let c = "stats";
                            if(comment.dislikes.includes(visitor.username)) {
                                c += " active";
                            }
                            span({"class": c}, () => {
                                span({"class": "icon"}, "👎");
                                print(comment.dislikes.length);
                            });
                        });
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
                    if(visitor !== null) {
                        if(visitor.username === comment.author || visitor.moderator) {
                            a({"href": "/articles/action?type=deletecomment&id=" + id + "&comment=" + comment._id}, translate({
                                "en": "Delete Comment",
                                "de": "Kommentar löschen"
                            }));
                        }
                    }
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