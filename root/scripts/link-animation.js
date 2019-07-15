window.addEventListener("load", () => {
    let main = document.getElementsByTagName("main")[0];

    let links = document.getElementsByTagName("a");
    for(let i = 0; i < links.length; i++) {
        let link = links[i];

        link.addEventListener("click", (e) => {
            e.preventDefault();

            let url = link.getAttribute("href");
            let c = "go-straight";

            let animation = link.getAttribute("animation");
            if(animation !== null) {
                c = animation;
            } else {
                let referer = window.location.href;
                if(url.charAt(url.length - 1) === "/") {
                    url += "index";
                }

                if(url.indexOf("//") === -1) {
                    let refererNoProtocol = referer.substring(referer.indexOf("//") + 2);
                    let refererUrl = refererNoProtocol.substring(refererNoProtocol.indexOf("/"));
                    
                    if(url === refererUrl) {
                        c = "go-same";
                    } else {
                        let difference = url.split("/").length - refererUrl.split("/").length;
                        if(difference < 0) {
                            c = "go-up";
                        } else
                        if(difference > 0) {
                            c = "go-down";
                        } else {
                            let urlIndex = url.lastIndexOf("/");
                            let refererUrlIndex = refererUrl.lastIndexOf("/");
                            if(urlIndex !== -1 && refererUrlIndex !== -1) {
                                let urlFile = url.substring(urlIndex + 1);
                                let refererUrlFile = refererUrl.substring(refererUrlIndex + 1);
                                if(urlFile === "index" && refererUrlFile !== "index") {
                                    c = "go-up";
                                } else 
                                if(urlFile !== "index" && refererUrlFile === "index") {
                                    c = "go-down";
                                }
                            }
                        }
                    }
                } else {
                    c = "end";
                }
            }

            if(c === "go-same") {
                window.location = url;
            } else {
                let newMain = main.cloneNode(true);
                newMain.className = "";
                newMain.classList.add(c);
                main.parentNode.replaceChild(newMain, main);

                setTimeout(() => {
                    window.location = url;
                }, 150);
            }
        });
    }
});