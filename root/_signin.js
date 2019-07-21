wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Sign In",
            "de": "Anmelden"
        }));
        nav(() => {
            a({"href": "/index"}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
            a({"href": "/signup"}, translate({
                "en": "Sign Up",
                "de": "Registrieren"
            }));
            a({"href": "/recover"}, translate({
                "en": "Forgot Password",
                "de": "Passwort vergessen"
            }));
        });
        request("user", (name, data, template, id) => {
            let user = load(name, data.username);
            if(user === null) {
                return false;
            }
            return require("bcrypt").compareSync(req.body.password, user.password);
        }, translate({
            "en": "The provided data is faulty",
            "de": "Die angegebenen Daten sind fehlerhaft"
        }), (data) => {
            session.user = data.username;
            update("session", session, undefined, session._id);
            redirect("/");
        }, undefined, ["username", "password"]);
    });
});