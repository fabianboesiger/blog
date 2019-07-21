window.addEventListener("load", () => {
    let fileUpload = document.querySelector("input[type=file]");
    let uploads = document.getElementsByClassName("uploads")[0];
    let nameSpans = document.getElementsByClassName("name");
    let names = [];
    for(let i = 0; i < nameSpans.length; i++) {
        names.push(nameSpans[i].textContent);
    }
    fileUpload.addEventListener("change", function() {
        update();
    });
    update();
    function update() {
        if(fileUpload.files) {
            let toRemove = document.getElementsByClassName("new");
            while(toRemove[0]) {
                toRemove[0].parentNode.removeChild(toRemove[0]);
            }
            for(let i = 0; i < fileUpload.files.length; i++) {
                let file = fileUpload.files[i];
                if(!names.includes(file.name)) {
                    let reader = new FileReader();
                    reader.onload = function(e) {
                        let li = document.createElement("li");
                        li.classList.add("new");
                        let span = document.createElement("span");
                        span.innerText = file.name;
                        span.classList.add("name");
                        let img = document.createElement("img");
                        img.setAttribute("src", e.target.result);
                        li.appendChild(span);
                        li.appendChild(img);
                        if(uploads === undefined) {
                            uploads = document.createElement("ul");
                            uploads.classList.add("uploads");
                            fileUpload.parentNode.insertBefore(uploads, fileUpload.nextSibling);
                        }
                        uploads.appendChild(li);
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
    }
});