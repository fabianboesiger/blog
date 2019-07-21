loadArticles = function(filter, sort = "latest", size = -1) {
    const md = (new (require("remarkable"))());

    articles = loadAll("article", filter);
    if(articles === null) {
        articles = [];
    }
    let sortings = {
        "latest": (a, b) => {
            return b.date - a.date;
        },
        "best": (a, b) => {
            return (b.likes.length - b.dislikes.length) - (a.likes.length - a.dislikes.length);
        },
        "worst": (a, b) => {
            return (b.dislikes.length - b.likes.length) - (a.dislikes.length - a.likes.length);
        },
        "clicks": (a, b) => {
            return b.clicks - a.clicks;
        },
        "ratings": (a, b) => {
            return  (b.dislikes.length + b.likes.length) - (a.dislikes.length + a.likes.length);
        }
    }    
    articles.sort(sortings[sort]);
    if(size >= 0) {
        articles.splice(size);
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
                let imageIndex = rendered.indexOf("<img src=\"");
                if(imageIndex >= 0) {
                    imageSource = rendered.substring(imageIndex + 10);
                    imageSource = imageSource.substring(0, imageSource.indexOf("\""));
                }

                a({"href": "/articles/article?id=" + element._id}, () => {
                    article(() => {
                        if(imageSource !== null) {
                            div({
                                "class": "image-holder", 
                                "style": "background-image: url(/files/" + element._id + "/" + imageSource + ")"
                            });
                        }
                        output += title;
                        if(paragraph !== null) {
                            output += paragraph.replace(/src="/, "src=\"/files/" + element._id + "/");
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
}


beautifyDate = function(millis) {
    let d = new Date(millis);
    let months = [
        translate({"en": "January", "de": "Januar"}),
        translate({"en": "February", "de": "Februar"}),
        translate({"en": "March", "de": "März"}),
        translate({"en": "April", "de": "April"}),
        translate({"en": "May", "de": "Mai"}),
        translate({"en": "June", "de": "Juni"}),
        translate({"en": "July", "de": "Juli"}),
        translate({"en": "August", "de": "August"}),
        translate({"en": "September", "de": "September"}),
        translate({"en": "October", "de": "Oktober"}),
        translate({"en": "November", "de": "November"}),
        translate({"en": "December", "de": "Dezember"})
    ];
    return translate({
        "en": (d.getDate() === 1 ? "1st" : d.getDate() === 2 ? "2nd" : d.getDate() === 3 ? "3rd" : d.getDate() + "th") + " of " + months[d.getMonth()] + " " + d.getFullYear() + " at " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2), 
        "de": d.getDate() + ". " + months[d.getMonth()] + " " + d.getFullYear() + " um " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
    });
}

metaData = function(author, date) {
    p({"class": "author"}, () => {
        print(translate({
            "en": "Written by ", 
            "de": "Geschrieben von "
        }));
        a({"href": "/profile/index?user=" + author}, author);
        print(translate({
            "en": " on the ", 
            "de": " am "
        }));
        print(beautifyDate(date));
    });
}

html(() => {
    head(() => {
        meta({"charset": "UTF-8"});
        meta({"name": "viewport", "content": "width=device-width, maximum-scale=1.0, user-scalable=no"});
        title("Fälis Blog");
        link({"rel": "stylesheet", "type": "text/css", "href": "/stylesheets/style.css"});
        script({"src": "/scripts/label-hover-focus.js"}); 
        script({"src": "/scripts/link-animation.js"}); 
        script({"src": "/scripts/run-collapsibles.js"});
        script({"src": "/scripts/keep-scroll-position.js"});
    });
    body(() => {
        let referer = req.headers.referer;
        let c = "straight";
        if(referer !== undefined) {
            let refererNoProtocol = referer.substring(referer.indexOf("//") + 2);
            let refererHost = refererNoProtocol.substring(0, refererNoProtocol.indexOf("/"));
            let refererUrl = refererNoProtocol.substring(refererNoProtocol.indexOf("/"));
            let refererUrlQuestionmark = refererUrl.indexOf("?");
            if(refererUrlQuestionmark !== -1) {
                refererUrl = refererUrl.substring(0, refererUrlQuestionmark);
            }

            let host = req.headers.host;

            console.log(host);

            let url = req.url;
            let urlQuestionmark = url.indexOf("?");
            if(urlQuestionmark !== -1) {
                url = url.substring(0, urlQuestionmark);
            }

            console.log(url, refererUrl);
            console.log(host, refererHost);

            if(host !== refererHost) {
                c = "start";
            } else {
                if(url === refererUrl) {
                    c = "same";
                } else {
                    let difference = url.split("/").length - refererUrl.split("/").length;
                    if(difference < 0) {
                        c = "up";
                    } else
                    if(difference > 0) {
                        c = "down";
                    } else {
                        let urlIndex = url.lastIndexOf("/");
                        let refererUrlIndex = refererUrl.lastIndexOf("/");
                        if(urlIndex !== -1 && refererUrlIndex !== -1) {
                            let urlFile = url.substring(urlIndex + 1);
                            let refererUrlFile = refererUrl.substring(refererUrlIndex + 1);
                            if(urlFile === "index" && refererUrlFile !== "index") {
                                c = "up";
                            } else 
                            if(urlFile !== "index" && refererUrlFile === "index") {
                                c = "down";
                            }
                        }
                    }
                }
            }
        } else {
            c = "start";
        }
        main({"class": c}, () => {
            content();
        });
    });
});