html(() => {
    head(() => {
        meta({"charset": "UTF-8"});
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