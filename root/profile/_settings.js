if(session.user === undefined) {
    redirect("/signup");
}
wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Settings",
            "de": "Einstellungen"
        }));
        nav(() => {
            a({"href": "/profile/index?user=" + session.user}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        });
        h2(translate({
            "en": "Change Password",
            "de": "Passwort ändern"
        }));
        request("user", update, translate({
            "en": "The settings couldn't be applied",
            "de": "Die Einstellungen konnten nicht übernommen werden"
        }), translate({
            "en": "Your password was changed successfully",
            "de": "Dein passwort wurde erfolgreich geändert"
        }), session.user, ["password", "confirmPassword"]);
        h2(translate({
            "en": "Change Email address",
            "de": "E-Mail Adresse ändern"
        }));
        request("user", update, translate({
            "en": "The settings couldn't be applied",
            "de": "Die Einstellungen konnten nicht übernommen werden"
        }), translate({
            "en": "Your email address was changed successfully",
            "de": "Deine E-Mail Adresse wurde erfolgreich geändert"
        }), session.user, ["email"]);
    });
});