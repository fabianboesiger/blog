const fs = require("fs");

wrap("layout.js", () => {
    h1(translate({
        "en": "Articles",
        "de": "Artikel"
    }));
    nav(() => {
        a({"href": "/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
        if(session.user !== undefined && load("user", session.user).writer === true) {
            a({"href": "/articles/write"}, translate({
                "en": "Write Article",
                "de": "Artikel verfassen"
            }));
        }
    });
    form(() => {
        function getSelect(name, translated, options) {
            label({"for": name}, translated);
            select({"name": name, "id": name}, () => {
                for(let key in options) {
                    let attributes = {"value": key};
                    if(req.params[name] === key) {
                        attributes.selected = null;
                    }
                    option(attributes, options[key]);
                }
            });
        }
        div({"class": "input-wrapper third"}, () => {
            getSelect("category", translate({
                "en": "Category",
                "de": "Kategorie"
            }), {
                "all": translate({
                    "en": "All",
                    "de": "Alle"
                }),
                "politics": translate({
                    "en": "Politics",
                    "de": "Politik"
                }),
                "technology": translate({
                    "en": "Technology",
                    "de": "Technologie"
                }),
                "science": translate({
                    "en": "Science",
                    "de": "Wissenschaft"
                }),
                "entertainment": translate({
                    "en": "Entertainment",
                    "de": "Unterhaltung"
                }),
                "meta": translate({
                    "en": "Meta",
                    "de": "Meta"
                })
            });
           
        });
        div({"class": "input-wrapper third"}, () => {
            getSelect("language", translate({
                "en": "Language",
                "de": "Sprache"
            }), {
                "all": translate({
                    "en": "All",
                    "de": "Alle"
                }),
                "en": translate({
                    "en": "English",
                    "de": "Englisch"
                }),
                "de": translate({
                    "en": "German",
                    "de": "Deutsch"
                })
            });
           
        });
        div({"class": "input-wrapper third"}, () => {
            getSelect("sort", translate({
                "en": "Sort By",
                "de": "Sortieren nach"
            }), {
                "latest": translate({
                    "en": "Latest",
                    "de": "Das Neueste"
                }),
                "best": translate({
                    "en": "Best Rated",
                    "de": "Am besten bewertet"
                }),
                "worst": translate({
                    "en": "Worst Rated",
                    "de": "Am schlechtesten bewertet"
                }),
                "ratings": translate({
                    "en": "Most Rated",
                    "de": "Am meisten bewertet"
                }),
                "clicks": translate({
                    "en": "Most Clicked",
                    "de": "Am meisten geklickt"
                })
            });
        });
        div({"class": "input-wrapper"}, () => {
            input({"type": "submit", "value": translate({
                "en": "Submit",
                "de": "Senden"
            })});
        });
    });
    let attributes = {"visible": true};
    if(req.params.category !== undefined) {
        if(req.params.category !== "all") {
            attributes.category = req.params.category;
        }
    }
    if(req.params.language !== undefined) {
        if(req.params.language !== "all") {
            attributes.language = req.params.language;
        }
    }
    loadArticles(attributes, req.params.sort);
});