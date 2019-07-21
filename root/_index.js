wrap("layout.js", () => {
    h1("Fälis Blog");
    nav(() => {
        if(session.user !== undefined) {
            a({"href": "/profile/index?user=" + session.user}, translate({
                "en": "Profile",
                "de": "Profil"
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
        a({"href": "/users"}, translate({
            "en": "Users",
            "de": "Benutzer"
        }));
    });
    /*
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
    */
    p(translate({
        "en": "Welcome at Fälis Blog. On this website can read articles from selected authors, write comments and more. Visit me on <a href=\"https://github.com/fabianboesiger\">GitHub</a> if you want to know more about this project.",
        "de": "Willkommen bei Fälis Blog. Auf dieser Seite kannst du Artikel von ausgelesenen Autoren lesen, Kommentare abgeben und mehr. Besuche mich auf <a href=\"https://github.com/fabianboesiger\">GitHub</a>, wenn dir dieses Projekt gefällt."
    }));
    h2(translate({
        "en": "The Latest",
        "de": "Das Neueste"
    }));
    loadArticles({"visible": true}, "latest", 1);
    h2(translate({
        "en": "The Best",
        "de": "Das Beste"
    }));
    loadArticles({"visible": true}, "best", 1);
    h2(translate({
        "en": "The Most Clicked",
        "de": "Das meist geklickte"
    }));
    loadArticles({"visible": true}, "clicks", 1);
});