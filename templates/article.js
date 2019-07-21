({
    /*
    "id": {
        "unique": true,
        "unique-message": translate({
            "en": "The title may only consist of the characters a-z, A-Z, 0-9, ä, Ä, ö, Ö, ü, Ü, dots, dashes and underscores.",
            "de": "Der Titel dieses Atikels ist invalide, er enthält ungültige Zeichen"
        }),
        "hidden": true,
        "required": true,
        "onvalidate": (data) => {
            const md = (new (require("remarkable"))());
            let rendered = md.render(data.content);
            let start = rendered.indexOf("<h1>");
            if(start === -1) {
                return "";
            }
            let title = rendered.substring(start + 4, rendered.indexOf("</h1>"));
            let out = "";
            for(let i = 0; i < title.length; i++) {
                let c = title.charAt(i);
                switch(c) {
                    case " ": out += "-"; break;
                    case "ä": out += "ae"; break;
                    case "ö": out += "oe"; break;
                    case "ü": out += "ue"; break;
                    default: out += c;
                }
            }
            return out;
        },
        "pass": "content"
    },
    */
   "files": {
        "type": "file",
        "multiple": true,
        "label": translate({
            "en": "Upload Files",
            "de": "Dateien hochladen"
        }),
        "extension": ["jpg", "png", "gif", "jpeg"],
        "extension-message": translate({
            "en": "File type is not valid, only JPGs, JPEGs, PNGs and GIFs are allowed",
            "de": "Dateityp ist falsch, nur JPGs, JPEGs, PNGs und GIFs sind erlaubt"
        }),
        "postsave": (data) => {
            const fs = require("fs");
            if(!fs.existsSync("./root/files")) {
                fs.mkdirSync("./root/files");
            }
            let to = "./root/files/" + data._id;
            if(!fs.existsSync(to)) {
                fs.mkdirSync(to, {"recursive": true});
            }
            data.files.forEach((filename) => {
                fs.rename("./temporary/" + filename, to + "/" +filename, (err) => {
                });
            });
        }
    },
    "content": {
        "type": "textarea",
        "label": translate({
            "en": "Content",
            "de": "Inhalt"
        }),
        "required": true,
        "required-message": translate({
            "en": "Content is required",
            "de": "Es wird einen Inhalt benötigt"
        }),
        "empty": false,
        "empty-message": translate({
            "en": "Content can't be empty",
            "de": "Der Inhalt darf nicht leer sein"
        })
    },
    "date": {
        "hidden": true,
        "required": true,
        "default": () => {
            return Date.now();
        }
    },
    "category": {
        "type": "select",
        "label": translate({
            "en": "Category",
            "de": "Kategorie"
        }),
        "options": [
            {
                "value": "politics", 
                "content": translate({
                    "en": "Politics",
                    "de": "Politik"
                })
            },
            {
                "value": "technology", 
                "content": translate({
                    "en": "Technology",
                    "de": "Technologie"
                })
            },
            {
                "value": "science", 
                "content": translate({
                    "en": "Science",
                    "de": "Wissenschaft"
                })
            },
            {
                "value": "entertainment", 
                "content": translate({
                    "en": "Entertainment",
                    "de": "Unterhaltung"
                })
            },
            {
                "value": "meta", 
                "content": translate({
                    "en": "Meta",
                    "de": "Meta"
                })
            }
        ],
        "options-message": translate({
            "en": "Please select a valid value",
            "de": "Bitte wähle einen gültigen Wert"
        })
    },
    "language": {
        "type": "select",
        "label": translate({
            "en": "Language",
            "de": "Sprache"
        }),
        "options": [
            {
                "value": "en", 
                "content": translate({
                    "en": "English",
                    "de": "Englisch"
                })
            },
            {
                "value": "de", 
                "content": translate({
                    "en": "German",
                    "de": "Deutsch"
                })
            }
        ],
        "options-message": translate({
            "en": "Please select a valid value",
            "de": "Bitte wähle einen gültigen Wert"
        })
    },
    "visible": {
        "type": "boolean",
        "label": translate({
            "en": "Publish Article",
            "de": "Artikel veröffentlichen"
        }),
        "required": true,
        "default": false
    },
    "clicks": {
        "type": "number",
        "hidden": true,
        "required": true,
        "default": 0,
    },
    "likes": {
        "type": "array",
        "hidden": true,
        "required": true,
        "default": []
    },
    "dislikes": {
        "type": "array",
        "hidden": true,
        "required": true,
        "default": []
    },
    "author": {
        "type": "text",
        "hidden": true,
        "default": () => {
            return session.user;
        }
    }
})