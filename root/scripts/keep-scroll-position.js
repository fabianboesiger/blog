let key = window.location.href;
let questionmarkIndex = key.indexOf("?");
if(questionmarkIndex !== -1) {
    key = key.substring(0, questionmarkIndex);
}

window.addEventListener("load", () => {
    let save = document.querySelectorAll("a, input[type=submit]");
    for(let i = 0; i < save.length; i++) {
        save[i].addEventListener("click", (e) => {
            console.log(window.pageYOffset);
            document.cookie = "offset=" + window.pageXOffset+"|"+window.pageYOffset+"|"+key;
        });
    }
});


if(document.cookie !== undefined && document.cookie !== null) {
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++) {
        let splitted = cookies[i].split("=");
        if(splitted[0].trim() === "offset") {
            let coordinates = splitted[1].trim().split("|");
            if(coordinates[2] === key) {
                window.addEventListener("load", () => {
                    window.scrollTo(coordinates[0], coordinates[1]);
                });
            }
            break;
        }
    }
}
document.cookie = "offset=";
