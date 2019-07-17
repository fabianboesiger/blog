let id = req.params.id;

if(id === undefined) {
    redirect("/articles");
    return;
}

let article = load("article", id);

if(article === null) {
    redirect("/articles");
    return;
}

wrap("layout.js", () => {
    h1(translate({
        "en": "Create Article",
        "de": "Artikel erstellen"
    }));
    nav(() => {
        a({"href": "/articles/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
        a({"href": "/articles/upload"}, translate({
            "en": "Upload Files",
            "de": "Dateien hochladen"
        }));
    });
    markdownOverview();
    request("article", save, translate({
        "en": "An article with the same name already exists",
        "de": "Es existiert bereits ein Artikel mit diesem Namen"
    }), translate({
        "en": "Article saved successfully",
        "de": "Artikel erfolgreich gespeichert"
    }), id);
});