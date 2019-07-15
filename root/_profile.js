if(req.params.user === undefined) {
    redirect("/");
}

let user = load("user", req.params.user);

if(user === null) {
    redirect("/");
}

wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Profile",
            "de": "Profil"
        }));
        nav(() => {
            a({"href": "/index"}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        });
        h2(translate({
            "en": "Change Permissions",
            "de": "Berechtigungen ändern"
        }));
        if(session.user !== undefined && load("user", session.user).developer) {
            request("user", update, translate({
                "en": "The settings couldn't be applied",
                "de": "Die Einstellungen konnten nicht übernommen werden"
            }), translate({
                "en": "The profile was changed successfully",
                "de": "Das Profil wurde erfolgreich geändert"
            }), req.params.user, ["writer", "moderator"]);
        }
        
    });
});