wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Sign Up",
            "de": "Registrieren"
        }));
        nav(() => {
            a({"href": "/"}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        });
        request("user", save, translate({
            "en": "This username is already in use",
            "de": "Dieser Benutzername wird bereits verwendet"
        }), (data) => {
            session.user = data.username;
            update("session", session, undefined, session._id);
            redirect("/");
        });
    });
});