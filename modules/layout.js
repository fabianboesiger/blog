markdownOverview = function() {
    const md = (new (require("remarkable"))());

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
}

html(() => {
    head(() => {
        meta({"charset": "UTF-8"});
        meta({"name": "viewport", "width": "512px", "initial-scale": "1"});
        link({"rel": "stylesheet", "type": "text/css", "href": "/stylesheets/style.css"});
        script({"src": "/scripts/label-hover-focus.js"}); 
        script({"src": "/scripts/link-animation.js"}); 
        script({"src": "/scripts/run-collapsibles.js"}); 
    });
    body(() => {
        let referer = req.headers.referer;
        let c = "straight";
        if(referer !== undefined) {
            let refererNoProtocol = referer.substring(referer.indexOf("//") + 2);
            let refererHost = refererNoProtocol.substring(0, refererNoProtocol.indexOf("/"));
            let refererUrl = refererNoProtocol.substring(refererNoProtocol.indexOf("/"));
            let host = req.headers.host;
            let url = req.url;

            if(host !== refererHost) {
                c = "start";
            } else {
                if(url === refererUrl) {
                    c = "same";
                } else {
                    let difference = url.split("/").length - refererUrl.split("/").length;
                    if(difference < 0) {
                        c = "up";
                    } else
                    if(difference > 0) {
                        c = "down";
                    } else {
                        let urlIndex = url.lastIndexOf("/");
                        let refererUrlIndex = refererUrl.lastIndexOf("/");
                        if(urlIndex !== -1 && refererUrlIndex !== -1) {
                            let urlFile = url.substring(urlIndex + 1);
                            let refererUrlFile = refererUrl.substring(refererUrlIndex + 1);
                            if(urlFile === "index" && refererUrlFile !== "index") {
                                c = "up";
                            } else 
                            if(urlFile !== "index" && refererUrlFile === "index") {
                                c = "down";
                            }
                        }
                    }
                }
            }
        } else {
            c = "start";
        }
        main({"class": c}, () => {
            content();
        });
    });
});