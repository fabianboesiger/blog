({
    "username": {
        "unique": true,
        "unique-message": translate({
            "en": "The username may only consist of the characters a-z, A-Z, 0-9, dots, dashes and underscores",
            "de": "Der Benutzername darf nur aus den Zeichen a-z, A-Z, 0-9, Punkten, Bindestrichen und Unterstrichen bestehen"
        }),
        "label": translate({
            "en": "Username",
            "de": "Benutzername"
        }),
        "type": "text",
        "minlength": 4,
        "minlength-message": translate({
            "en": "Username length has to be between 4 and 16 characters.",
            "de": "Die Länge des Benutzernamens muss zwischen 4 und 16 Zeichen liegen."
        }),
        "maxlength": 16,
        "maxlength-message": translate({
            "en": "Username length has to be between 4 and 16 characters.",
            "de": "Die Länge des Benutzernamens muss zwischen 4 und 16 Zeichen liegen."
        }),
        "required": true,
        "required-message": translate({
            "en": "Username is required.",
            "de": "Der Benutzername wird benötigt."
        })
    },
    "password": {
        "label": translate({
            "en": "Password",
            "de": "Passwort"
        }),
        "type": "password",
        "minlength": 4,
        "minlength-message": translate({
            "en": "Password length has to be between 4 and 16 characters.",
            "de": "Die Länge des Passworts muss zwischen 4 und 16 Zeichen liegen."
        }),
        "maxlength": 16,
        "maxlength-message": translate({
            "en": "Password length has to be between 4 and 16 characters.",
            "de": "Die Länge des Passworts muss zwischen 4 und 16 Zeichen liegen."
        }),
        "required": true,
        "required-message": translate({
            "en": "Password is required.",
            "de": "Das Passwort wird benötigt."
        }),
        "presave": (data) => {return data.password.length <= 16 ? require("bcrypt").hashSync(data.password, 10): data.password;},
        "autocomplete": false
    },
    "confirmPassword": {
        "label": translate({
            "en": "Confirm Password",
            "de": "Passwort bestätigen"
        }),
        "type": "password",
        "required": true,
        "required-message": translate({
            "en": "Password confirmation is required.",
            "de": "Das Passwort muss bestätigt werden."
        }),
        "validate": data => {
            return data.confirmPassword === data.password;
        },
        "validate-message": translate({
            "en": "Passwords have to match.",
            "de": "Die Passwörter müssen übereinstimmen."
        }),
        "autocomplete": false,
        "save": false
    },
    "developer": {
        "type": "boolean",
        "required": true,
        "default": false,
        "hidden": true
    },
    "writer": {
        "label": translate({
            "en": "Write Permission",
            "de": "Schreibberechtigung"
        }),
        "type": "boolean",
        "required": true,
        "default": false,
        "hidden": true
    },
    "moderator": {
        "label": translate({
            "en": "Moderator",
            "de": "Moderator"
        }),
        "type": "boolean",
        "required": true,
        "default": false,
        "hidden": true
    }
})