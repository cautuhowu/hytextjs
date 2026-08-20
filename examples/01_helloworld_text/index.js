import { Hytext } from "../../core/hytext.js";

const app = new Hytext();

app.head({
    lang : "en",
    title : "Hello, Worlds!",
    meta : {
        charset : "UTF-8"
    }
});

app.body(body => {
    body.h1({}, "Hello, Worlds!");
});