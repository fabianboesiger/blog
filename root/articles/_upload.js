wrap("layout.js", () => {
    h1(translate({
        "en": "Upload Files",
        "de": "Dateien Hochladen"
    }));
    nav(() => {
        a({"href": "/articles/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
        a({"href": "/articles/write"}, translate({
            "en": "Write Article",
            "de": "Artikel verfassen"
        }));
    });
    request("article", save, translate({
        "en": "An article with the same name already exists",
        "de": "Es existiert bereits ein Artikel mit diesem Namen"
    }), translate({
        "en": "Article saved successfully",
        "de": "Artikel erfolgreich gespeichert"
    }));
});