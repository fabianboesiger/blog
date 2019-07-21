wrap("layout.js", () => {
    div({"class": "centered-form"}, () => {
        h1(translate({
            "en": "Recover Account",
            "de": "Account Wiederherstellen"
        }));
        nav(() => {
            a({"href": "/signin"}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        });
        request("user", (name, data, template, id) => {
            let user = load(name, data.username);
            if(user === null) {
                return false;
            }
            if(!user.confirmed) {
                return false;
            }
            if(user.lastRecoveryAttempt !== undefined && user.lastRecoveryAttempt > Date.now() - 1000 * 60 * 10) {
                return true;
            }
            user.key = generateId(64);
            user.lastRecoveryAttempt = Date.now();
            mail(user.email, translate({
                "en": "Recover Account",
                "de": "Account Wiederherstellen"
            }), translate({
                "en": "<h1>Recover Account</h1><p>Hello, " + user.username + "! Please click <a href=\"http://blog.ddnss.ch/unlock?user=" + user.username + "&key=" + user.key + "\">here</a> to recover your account.",
                "de": "<h1>Account Wiederherstellen</h1><p>Hallo, " + user.username + "! Bitte klicke <a href=\"http://blog.ddnss.ch/unlock?user=" + user.username + "&key=" + user.key + "\">hier</a>, um deinen Acccount wiederherzustellen."
            }));
            save(user);
            return true;
        }, translate({
            "en": "This user does not exist or did not confirm his email address",
            "de": "Dieser Benutzer existiert nicht oder hat seine E-Mail Adresse nicht bestätigt"
        }), translate({
            "en": "A recovery mail was sent successfully",
            "de": "Ein Link zur Wiederherstellung deines Accounts wurde erfolgreich gesendet"
        }), undefined, ["username"]);
    });
});