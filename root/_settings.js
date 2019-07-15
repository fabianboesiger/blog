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
            a({"href": "/index"}, translate({
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
            "en": "Your profile was changed successfully",
            "de": "Dein Profil wurde erfolgreich geändert"
        }), session.user, ["password", "confirmPassword"]);
    });
});