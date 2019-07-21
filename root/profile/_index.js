if(req.params.user === undefined) {
    redirect("/index");
    return;
}
let user = load("user", req.params.user);
if(user === null) {
    redirect("/index");
    return;
}

let visitor = session.user === undefined ? null : load("user", session.user);

wrap("layout.js", () => {
    h1(translate({
        "en": "Profile of " + user.username,
        "de": "Profil von " + user.username
    }));
    nav(() => {
        a({"href": "/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
        a({"href": "/profile/articles?user=" + user.username}, translate({
            "en": "Articles",
            "de": "Artikel"
        }));
        a({"href": "/profile/comments?user=" + user.username}, translate({
            "en": "Comments",
            "de": "Kommentare"
        }));
        if(visitor !== null && visitor.username === user.username) {
            a({"href": "/profile/settings"}, translate({
                "en": "Settings",
                "de": "Einstellungen"
            }));
            a({"href": "/signout", "animation": "go-up"}, translate({
                "en": "Sign Out",
                "de": "Abmelden"
            }));
            a({"href": "/profile/delete"}, translate({
                "en": "Delete Account",
                "de": "Account löschen"
            }));
        }
        if(visitor !== null && visitor.developer) {
            a({"href": "/profile/permissions?user=" + user._id}, translate({
                "en": "Change Permissions",
                "de": "Berechtigungen ändern"
            }));
        }
    });

    if(visitor !== null && visitor.username === user.username) {
        if(!user.confirmed) {
            p(translate({
                "en": "Your email address isn't confirmed yet. Please check your inbox. Click <a href=\"/profile/send\">here</a> to send another email.",
                "de": "Deine E-Mail adresse wurde noch nicht bestätigt. Bitte überprüfe deinen Posteingang. Klicke <a href=\"/profile/send\">hier</a>, um erneut eine E-Mail zu erhalten."
            }));
        }
    }

    function yn(value) {
        return value ?
        translate({"en": "Yes", "de": "Ja"}) :
        translate({"en": "No", "de": "Nein"});
    }

    let published = loadAll("article", {"visible": true, "author": user.username});
    let comments = loadAll("comment", {"author": user.username});

    let likeSum = 0;
    let dislikeSum = 0;
    let clickSum = 0;

    published.forEach((article) => {
        likeSum += article.likes.length;
        dislikeSum += article.dislikes.length;
        clickSum += article.clicks;
    });


    let likeSumComments = 0;
    let dislikeSumComments = 0;

    comments.forEach((comment) => {
        likeSumComments += comment.likes.length;
        dislikeSumComments += comment.dislikes.length;
    });

    let total = likeSum + dislikeSum + likeSumComments + dislikeSumComments;
    
    let approval = (total === 0) ? 0 : ((likeSum + likeSumComments - dislikeSum - dislikeSumComments) / total);

    spreadsheet(["Informationen", ""], [
        [translate({"en": "Username", "de": "Benutzername"}), user.username],
        [translate({"en": "Member Since", "de": "Nutzer seit"}), beautifyDate(user.date)],
        ["Moai", "🗿 " + user.score],
        [translate({"en": "Developer", "de": "Entwickler"}), yn(user.developer)],
        [translate({"en": "Write Permission", "de": "Schreibberechtigung"}), yn(user.writer)],
        [translate({"en": "Moderator", "de": "Moderator"}), yn(user.moderator)],
        [translate({"en": "Published Articles", "de": "Publizierte Artikel"}), "" + published.length],
        [translate({"en": "Total Likes on Articles", "de": "Totale Likes für Artikel"}), "" + likeSum],
        [translate({"en": "Total Dislikes on Articles", "de": "Totale Dislikes für Artikel"}), "" + dislikeSum],
        [translate({"en": "Total Clicks on Articles", "de": "Totale Klicks für Artikel"}), "" + clickSum],
        [translate({"en": "Amount of Comments", "de": "Anzahl Kommentare"}), "" + comments.length],
        [translate({"en": "Total Likes on Comments", "de": "Totale Likes für Kommentare"}), "" + likeSumComments],
        [translate({"en": "Total Dislikes on Comments", "de": "Totale Dislikes für Kommentare"}), "" + dislikeSumComments],
    ]);
    
    h2(translate({
        "en": "Approval",
        "de": "Zustimmung"
    }));
    p(translate({
        "en": "The following bar shows the like to dislike ratio of this user.",
        "de": "Der folgende Graph zeigt die Like zu Dislike Ratio dieses Benutzers."
    }));
    div({"class": "progressbar-wrapper"}, () => {
        div({"class": "progressbar-background"});
        div({"class": "progressbar-bar", "style": "width: " + ((approval + 1) / 2 * 100) + "%"});
        div({"class": "progressbar-text"}, Math.round((approval + 1) / 2 * 100) + "%");
    });
});