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

if(visitor === null || !visitor.developer) {
    redirect("/profile/index");
}

wrap("layout.js", () => {
    h1(translate({
        "en": "Profile",
        "de": "Profil"
    }));
    nav(() => {
        a({"href": "/profile/index?user=" + user._id}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
    });

    h2(translate({
        "en": "Change Permissions",
        "de": "Berechtigungen ändern"
    }));
    request("user", update, translate({
        "en": "The settings couldn't be applied",
        "de": "Die Einstellungen konnten nicht übernommen werden"
    }), translate({
        "en": "The profile was changed successfully",
        "de": "Das Profil wurde erfolgreich geändert"
    }), req.params.user, ["writer", "moderator"]);

});