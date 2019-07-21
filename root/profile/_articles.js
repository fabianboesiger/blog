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
        "en": "Articles of " + user.username,
        "de": "Artikel von " + user.username
    }));
    nav(() => {
        a({"href": "/profile/index?user=" + user.username}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
    });

    if(visitor !== null && (user.username === visitor.username || visitor.developer)) {
        loadArticles({"author": req.params.user});
    } else {
        loadArticles({"author": req.params.user, "visible": true});
    }

});