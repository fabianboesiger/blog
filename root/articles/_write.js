const md = (new (require("remarkable"))());

let article = null;
if(req.params.id !== undefined) {
    article = load("article", req.params.id);
}

let visitor = session.user === undefined ? null : load("user", session.user);

wrap("layout.js", () => {
    script({"src": "/scripts/file-preview.js"});

    h1(translate({
        "en": "Write Article",
        "de": "Artikel schreiben"
    }));

    nav(() => {
        if(req.params.id !== undefined) {
            a({"href": "/articles/article?id=" + req.params.id}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        } else {
            a({"href": "/articles/index"}, translate({
                "en": "Back",
                "de": "Zurück"
            }));
        }
    });

    h2({"class": "collapsible"}, translate({
        "en": "How to Write an Article",
        "de": "Wie man einen Artikel schreibt"
    }));
    div(() => {
        p(translate({
            "en": "It's simple, I swear ...",
            "de": "Es ist einfach, wirklich ..."
        }));
        p(translate({
            "en": "Each article should contain a title (<code># Title</code>), at least one paragraph and an image. Images have to be uploaded and linked inside the content with <code>![](filename.jpg)</code>. Make sure that you select the correct category and language. The article is only visible if the <i>publish article</i> option is selected. Articles that are not published can be edited in your profile.",
            "de": "Jeder Artikel sollte einen Titel (<code># Title</code>), mindestens einen Paragraphen und ein Bild enthalten.  Bilder müssen hochgeladen und anschliessend im Inhalt mit <code>![](dateiname.jpg)</code> verlinkt werden. Stelle sicher, dass du die richtige Kategorie und Sprache wählst. Der Artikel ist nur sichtbar falls die <i>Artikel veröffentlichen</i> Option gewählt ist. Artikel, die nicht veröffentlicht wurden, können weiterhin in deinem Profil bearbeitet werden."
        }));
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

    let overview = ["# " + translate({"en": "Heading 1", "de": "Überschrift 1"}),
                    "## " + translate({"en": "Heading 2", "de": "Überschrift 2"}),
                    "### " + translate({"en": "Heading 3", "de": "Überschrift 3"}),
                    "#### " + translate({"en": "Heading 4", "de": "Überschrift 4"}),
                    "##### " + translate({"en": "Heading 5", "de": "Überschrift 5"}),
                    "###### " + translate({"en": "Heading 6", "de": "Überschrift 6"}),
                    "Paragraph 1\n\nParagraph 2",
                    translate({"en": "Line 1  \nLine 2", "de": "Zeile 1  \nZeile 2"}),
                    translate({"en": "**Bold 1**  \n__Bold 2__", "de": "**Fett 1**  \n__Fett 2__"}),
                    translate({"en": "*Italic 1*  \n_Italic 2_", "de": "*Kursiv 1*  \n_Kursiv 2_"}),
                    translate({"en": "> Quote", "de": "> Zitat"}),
                    "1. Element 1\n2. Element 2\n3. Element 3",
                    "* Element 1\n* Element 2\n* Element 3",
                    "    Code Block",
                    "`Code`",
                    "---",
                    "[Duck Duck Go](https://duckduckgo.com)",
                    "![Test Image](/images/test-image.jpg)",
                    translate({"en": "|Column 1|Column 2|Column 3|\n|---|---|---|\n|1|2|3|\n|4|5|6|", "de": "|Spalte 1|Spalte 2|Spalte 3|\n|---|---|---|\n|1|2|3|\n|4|5|6|"})];
    for(let i = 0; i < overview.length; i++) {
        overview[i] = ["<pre>" + overview[i] + "</pre>", md.render(overview[i])];
    }
    h2({"class": "collapsible"}, translate({
        "en": "Markdown Overview",
        "de": "Markdown Übersicht"
    }));
    spreadsheet(["Markdown", translate({"en": "Output", "de": "Ergebnis"})], overview);
    if(article !== null) {
        if(visitor === null || article.author !== visitor.username) {
            redirect("/articles/article?id=" + req.params.id);
        }
        request("article", update, translate({
            "en": "An article with the same name already exists",
            "de": "Es existiert bereits ein Artikel mit diesem Namen"
        }), (data, id) => {
            redirect("/articles/article?id=" + id);
        }, req.params.id);
    } else {
        request("article", save, translate({
            "en": "An article with the same name already exists",
            "de": "Es existiert bereits ein Artikel mit diesem Namen"
        }), (data, id) => {
            redirect("/articles/article?id=" + id);
        });
    }
});