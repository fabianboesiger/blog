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
    h1(translate({
        "en": "Confirm Email Address",
        "de": "E-Mail Adresse bestätigen"
    }));
    nav(() => {
        a({"href": "/"}, translate({
            "en": "Home",
            "de": "Home"
        }));
    });
    if(user.key === key) {
        user.confirmed = true;
        user.key = generateId(64);
        save(user);
        p(translate({
            "en": "Your email address was confirmed successfully.",
            "de": "Deine E-Mail Adresse wurde erfolgreich bestätigt."
        }));
    } else {
        p(translate({
            "en": "This link is invalid.",
            "de": "Dieser Link ist ungültig."
        }));
    }
});