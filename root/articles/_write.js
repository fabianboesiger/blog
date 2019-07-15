const md = (new (require("remarkable"))());

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
    h2({"class": "collapsible"}, translate({
        "en": "Markdown Overview",
        "de": "Markdown Übersicht"
    }));

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
                    "![Test Image](/images/test-image.jpg)"];
    
    for(let i = 0; i < overview.length; i++) {
        overview[i] = ["<pre>" + overview[i] + "</pre>", md.render(overview[i])];
    }

    spreadsheet(["Markdown", translate({"en": "Output", "de": "Ergebnis"})], overview);

    request("article", save, translate({
        "en": "An article with the same name already exists",
        "de": "Es existiert bereits ein Artikel mit diesem Namen"
    }), translate({
        "en": "Article saved successfully",
        "de": "Artikel erfolgreich gespeichert"
    }));
});