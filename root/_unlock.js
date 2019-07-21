if(req.params.user === undefined) {
    redirect("/index");
    return;
}
let user = load("user", req.params.user);
if(user === null) {
    redirect("/index");
    return;
}
let key = req.params.key;


wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Choose new Password",
            "de": "Neues Passwort wählen"
        }));
        nav(() => {
            a({"href": "/signin"}, translate({
                "en": "Sign In",
                "de": "Anmelden"
            }));
        });
        if(key === user.key) {
            request("user", update, translate({
                "en": "The settings couldn't be applied",
                "de": "Die Einstellungen konnten nicht übernommen werden"
            }), () => {
                user.key = generateId(64);
                save(user);
                redirect("/signin");
            }, user.username, ["password", "confirmPassword"]);
        } else {
            p(translate({
                "en": "This link is invalid.",
                "de": "Dieser Link ist ungültig."
            }));
        }
       
    });
});