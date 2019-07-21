({
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
    },
    "article": {
        "type": "text",
        "hidden": true,
        "default": () => {
            return req.params.id;
        }
    }
})