wrap("layout.js", () => {
    h1(translate({
        "en": "Users",
        "de": "Benutzer"
    }));
    nav(() => {
        a({"href": "/index"}, translate({
            "en": "Back",
            "de": "Zurück"
        }));
    });

    let data = [];
    let users = loadAll("user");

    users.sort((a, b) => {
        return b.score - a.score;
    });

    users.forEach((user, index) => {
        data.push(["<a href=\"/profile/index?user=" + user.username + "\">" + user.username + "</a>", "" + (index + 1), "🗿 " + user.score]);
    });

    p(translate({
        "en": "Collect Moai by writing good articles.",
        "de": "Sammle Moai, indem du gute Artikel schreibst."
    }));

    spreadsheet([translate({"en": "User", "de": "Benutzer"}), translate({"en": "Rank", "de": "Rang"}), "Moai"], data);
});