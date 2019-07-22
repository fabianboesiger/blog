window.addEventListener("load", () => {
    let links = document.getElementsByClassName("background-link");
    for(let i = 0; i < links.length; i++) {
        let link = links[i];
        link.addEventListener("click", (e) => {
            e.preventDefault();
            let href = link.getAttribute("href");
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                    if(xmlhttp.status === 200 || xmlhttp.status === 302) {
                        let other = link.nextSibling;
                        if(link.previousSibling === null) {
                            // like
                            other = link.nextSibling;
                        } else {
                            // dislike
                            other = link.previousSibling;
                        }
                        if(link.firstChild.classList.contains("active")) {
                            link.firstChild.classList.remove("active");
                            link.firstChild.lastChild.innerHTML = parseInt(link.firstChild.lastChild.innerHTML) - 1;
                        } else {
                            link.firstChild.classList.add("active");
                            link.firstChild.lastChild.innerHTML = parseInt(link.firstChild.lastChild.innerHTML) + 1;
                        }
                        if(other.firstChild.classList.contains("active")) {
                            other.firstChild.classList.remove("active");
                            other.firstChild.lastChild.innerHTML = parseInt(other.firstChild.lastChild.innerHTML) - 1;
                        }
                    }
                }
            };
            xmlhttp.open("GET", href, true);
            xmlhttp.send();
        });
    }
});