let visitor = session.user === undefined ? null : load("user", session.user);

if(visitor === null) {
    redirect("/index");
    return;
}

wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Delete Account",
            "de": "Acccount löschen"
        }));
        nav(() => {
            a({"href": "/profile/index?user=" + visitor.username}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        });
        p(translate({
            "en": "By deleting your account, all your articles and comments get deleted too. The deletion of an account is irreversible.",
            "de": "Durch die Löschung deines Accounts werden alle Artikel und Kommentare gelöscht. Die Löschung deines Accounts kann nicht rückgängig gemacht werden."
        }));
        request("user", (name, data, template, id) => {
            return require("bcrypt").compareSync(req.body.password, visitor.password);
        }, translate({
            "en": "The provided password is incorrect",
            "de": "Das angegebene Passwort ist inkorrekt."
        }), (data) => {
            session.user = undefined;
            update("session", session, undefined, session._id);

            let articles = loadAll("article", {"author": visitor.username});
            articles.forEach(articles => {
                unlinkAll("comment", {"article": article._id});
                let path = "./root/files/" + article._id;
                if(fs.existsSync(path)) {
                    fs.readdirSync(path).forEach(function(file, index) {
                        fs.unlinkSync(path + "/" + file);
                    });
                    fs.rmdirSync(path);
                }
                unlink(article);
            });
            unlink(visitor);

            redirect("/");
        }, undefined, ["password"]);
    });
});