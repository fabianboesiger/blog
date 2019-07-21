let visitor = session.user === undefined ? null : load("user", session.user);

if(visitor === null) {
    redirect("/index");
    return;
}

wrap("layout.js", () => {
    h1(translate({
        "en": "Confirm Email Address",
        "de": "E-Mail Adresse bestätigen"
    }));
    nav(() => {
        a({"href": "/profile/index?user=" + visitor.username}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
    });
    visitor.key = generateId(64);
    visitor.confirmed = false;
    mail(visitor.email, translate({
        "en": "Confirm Email Address",
        "de": "Bestätige deine E-Mail Adresse"
    }), translate({
        "en": "<h1>Confirm Email Address</h1><p>Hello, " + visitor.username + "! Please confirm your email address by clicking <a href=\"http://blog.ddnss.ch/profile/confirm?user=" + visitor.username + "&key=" + visitor.key + "\">here</a>.",
        "de": "<h1>Bestätige deine E-Mail Adresse</h1><p>Hallo, " + visitor.username + "! Bitte bestätige deine E-Mail Adresse, indem du <a href=\"http://blog.ddnss.ch/profile/confirm?user=" + visitor.username + "&key=" + visitor.key + "\">hier</a> klickst."
    }));
    save(visitor);
    p(translate({
        "en": "Another email was sent.",
        "de": "Es wurde erneut eine E-Mail gesendet."
    }));
});