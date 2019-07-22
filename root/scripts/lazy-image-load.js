
window.addEventListener("load", () => {
    let images = document.querySelectorAll("[lazy-src], [lazy-background]");
    for(let i = 0; i < images.length; i++) {
        let image = images[i];
        let isImage = true;
        let lazy = image.getAttribute("lazy-src");
        if(lazy === null) {
            isImage = false;
            lazy = image.getAttribute("lazy-background");
        }
        if(lazy !== null && lazy !== undefined) {
            let download = new Image();
            download.onload = function(){
                if(isImage) {
                    image.src = this.src;
                } else {
                    image.style.backgroundImage = "url(" + this.src + ")";
                }
            };
            download.src = lazy;
        }
    }
});