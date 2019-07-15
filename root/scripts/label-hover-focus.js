window.addEventListener("load", () => {
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let label = input.previousSibling || input.nextSibling;
        if(label !== null) {
            input.addEventListener("mouseover", () => {
                label.classList.add("hover");
            });
            input.addEventListener("mouseout", () => {
                label.classList.remove("hover");
            });
            label.addEventListener("mouseover", () => {
                label.classList.add("hover");
            });
            label.addEventListener("mouseout", () => {
                label.classList.remove("hover");
            });
            input.addEventListener("focus", () => {
                label.classList.add("focus");
            });
            input.addEventListener("blur", () => {
                label.classList.remove("focus");
            });
        }
    }
});