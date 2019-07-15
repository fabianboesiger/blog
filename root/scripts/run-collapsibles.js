window.addEventListener("load", () => {
    let collapsibles = document.getElementsByClassName("collapsible");
    for(let i = 0; i < collapsibles.length; i++) {
        let collapsible = collapsibles[i];
        collapsible.nextElementSibling.classList.add("content");
        collapsible.addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.classList.toggle("active");
        });
    }
});