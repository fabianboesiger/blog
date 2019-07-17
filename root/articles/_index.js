const fs = require("fs");
const md = (new (require("remarkable"))());

wrap("layout.js", () => {
    h1(translate({
        "en": "Articles",
        "de": "Artikel"
    }));
    nav(() => {
        a({"href": "/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
        if(session.user !== undefined && load("user", session.user).writer === true) {
            a({"href": "/articles/write"}, translate({
                "en": "Write Article",
                "de": "Artikel verfassen"
            }));
        }
    });
    articles = loadAll("article");
    if(articles === null) {
        articles = [];
    }
    if(articles.length > 0) {
        div({"id": "articles"}, () => {
            articles.forEach((element) => {
                let string = element.content;
                let rendered = md.render(string);

                let title = "<h2>" + rendered.substring(rendered.indexOf("<h1>") + 4, rendered.indexOf("</h1>")) + "</h2>";
                let paragraph = null;
                let start = rendered.indexOf("<p>");
                if(start !== -1) {
                    paragraph = rendered.substring(start, rendered.indexOf("</p>") + 4);
                }
                let imageSource = null;
                let imageIndex = rendered.indexOf("<img src=\"") + 10;
                if(imageIndex >= 0) {
                    imageSource = rendered.substring(imageIndex);
                    imageSource = imageSource.substring(0, imageSource.indexOf("\""));
                }

                a({"href": "/articles/article?id=" + element._id}, () => {
                    article(() => {
                        if(imageSource !== null) {
                            div({
                                "class": "image-holder", 
                                "style": "background-image: url(" + imageSource + ")"
                            });
                        }
                        output += title;
                        if(paragraph !== null) {
                            output += paragraph;
                        }
                    });
                })
            });
        });
    } else {
        p(translate({
            "en": "There are currently no articles.",
            "de": "Es sind derzeit keine Artikel verfügbar."
        }));
    }
});