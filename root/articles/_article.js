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
        if(session.user !== undefined) {
            br();
            a({"href": "/", "class": "reaction"}, "🙂"); // Like
            a({"href": "/", "class": "reaction"}, "🙁"); // Dislike
            a({"href": "/", "class": "reaction"}, "😴"); // Boring
            a({"href": "/", "class": "reaction"}, "😂"); // Funny
            a({"href": "/", "class": "reaction"}, "😭"); // Sad
            a({"href": "/", "class": "reaction"}, "😤"); // Angry
            a({"href": "/", "class": "reaction"}, "😎"); // Cool
            a({"href": "/", "class": "reaction"}, "🤓"); // Nerdy
            a({"href": "/", "class": "reaction"}, "🤔"); // Thoughtful
            a({"href": "/", "class": "reaction"}, "😍"); // Beautiful
            a({"href": "/", "class": "reaction"}, "😬"); // Cringy
            a({"href": "/", "class": "reaction"}, "🤯"); // Overwhelming
        }
    });
    
    if(content !== null) {
        output += content;
    }
});