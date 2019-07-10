wrap("layout.js", () => {
    h1("Error " + statusCode);
    if(errorList > 0) {
        list(ul, errorList);
    }
});