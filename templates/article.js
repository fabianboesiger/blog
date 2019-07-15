({
    "id": {
        "unique": true,
        "unique-message": translate({
            "en": "This Title is invalid, it contains invalid characters or is not unique",
            "de": "Der Titel dieses Atikels ist invalide, er enthält ungültige Zeichen oder ist nicht einzigartig"
        }),
        "hidden": true,
        "required": true,
        "onvalidate": (data) => {
            if(!/^# .*/.test(data.content)) {
                return "";
            }
            let to = data.content.indexOf("\n");
            if(to === -1) {
                to = data.content.length;
            }
            if(data.content.charAt(to - 1) === "\r") {
                to--;
            }
            let old = data.content.substring(data.content.indexOf("# ") + 2, to).toLowerCase().trim();
            let out = "";
            for(let i = 0; i < old.length; i++) {
                let c = old.charAt(i);
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
        "onvalidate": (data) => {
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