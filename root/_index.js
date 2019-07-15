wrap("layout.js", () => {
    h1("Fälis Blog");
    nav(() => {
        if(session.user !== undefined) {
            a({"href": "/profile?user=" + session.user}, translate({
                "en": "Profile",
                "de": "Profil"
            }));
            a({"href": "/settings"}, translate({
                "en": "Settings",
                "de": "Einstellungen"
            }));
            a({"href": "/signout", "animation": "go-same"}, translate({
                "en": "Sign Out",
                "de": "Abmelden"
            }));
        } else {
            a({"href": "/signin"}, translate({
                "en": "Sign In",
                "de": "Anmelden"
            }));
            a({"href": "/signup"}, translate({
                "en": "Sign Up",
                "de": "Registrieren"
            }));
        }
        a({"href": "/articles"}, translate({
            "en": "Articles",
            "de": "Artikel"
        }));
    });
    if(session.user !== undefined) {
        h2(translate({
            "en": "Hello, " + session.user + "!",
            "de": "Hallo, " + session.user + "!"
        }));
    } else {
        h2(translate({
            "en": "Hello, World!",
            "de": "Hallo, Welt!"
        }));
    }
    p(translate({
        "en": "Welcome at Fälis Blog.",
        "de": "Willkommen bei Fälis Blog."
    }));
});