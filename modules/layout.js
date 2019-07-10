html(() => {
    head(() => {
        meta({"charset": "UTF-8"});
        link({"rel": "stylesheet", "type": "text/css", "href": "/stylesheets/style.css"});
        link({"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Neuton|Open+Sans+Condensed:700&display=swap"});
        script({"src": "/scripts/set-label-hover.js"}); 
    });
    body(() => {
        main(() => {
            content();
        });
    });
});