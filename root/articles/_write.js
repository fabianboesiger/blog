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
    });
    h2({"class": "collapsible"}, translate({
        "en": "How to Write an Article",
        "de": "Wie man einen Artikel schreibt"
    }));
    div(() => {
        p(translate({
            "en": "It's simple, I swear ...",
            "de": "Es ist einfach, wirklich ..."
        }))
    });
    h2({"class": "collapsible"}, translate({
        "en": "Content Policy",
        "de": "Inhaltsrichtlinien"
    }));
    div(() => {
        p(translate({
            "en": "The Content is prohibited, if it ...",
            "de": "Der Inhalt ist untersagt, falls er ..."
        }));
        ol(() => {
            li(translate({
                "en": "Involves threats or harassments to individuals or groups",
                "de": "Drohungen und Belästigungen gegen Individuen oder Gruppen beinhaltet"
            }));
            li(translate({
                "en": "Is morally offensive",
                "de": "Moralisch anstössig ist"
            }));
            li(translate({
                "en": "Is not of sufficient quality",
                "de": "Qualitativ ungenügend ist"
            }));
            li(translate({
                "en": "Is purposefully misleading",
                "de": "Absichtlich irreführender ist"
            }));
            li(translate({
                "en": "Is spam",
                "de": "Spam ist"
            }));
        });
    });
    markdownOverview();
    request("article", save, translate({
        "en": "An article with the same name already exists",
        "de": "Es existiert bereits ein Artikel mit diesem Namen"
    }), translate({
        "en": "Article saved successfully",
        "de": "Artikel erfolgreich gespeichert"
    }));
});