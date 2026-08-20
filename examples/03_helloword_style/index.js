import { Hytext } from "../../core/hytext.js";

const app = new Hytext();

app.head({
    lang : "en",
    title : "Hello World Stylesheet",
    meta : {
        charset : "UTF-8"
    },
    css : ["./hello.css", "./body.css"]
});

app.body(body => {
    body.h1({
        className : "hello"
    }, "Hello, Worlds!");
});