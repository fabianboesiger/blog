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
        "extension": ["jpg", "png", "gif"],
        "extension-message": translate({
            "en": "File type is not valid, only JPGs, PNGs and GIFs are allowed",
            "de": "Dateityp ist falsch, nur JPGs, PNGs und GIFs sind erlaubt"
        }),
        "postsave": (data) => {
            const fs = require("fs");
            let to = "./root/files/" + data._id;
            if(!fs.existsSync(to)) {
                fs.mkdirSync(to, {"recursive": true});
            }
            data.files.forEach((filename) => {
                fs.rename("./temporary/" + filename, to + "/" +filename, (err) => {
                    console.log(err);
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
        })
    },
    "date": {
        "hidden": true,
        "required": true,
        "default": (data) => {
            if(data.date === undefined) {
                return Date.now();
            } else {
                return data.date;
            }
        }
    },
    "visible": {
        "type": "boolean",
        "label": translate({
            "en": "Publish Article",
            "de": "Artikel veröffentlichen"
        }),
        "required": true,
        "default": false
    }
})