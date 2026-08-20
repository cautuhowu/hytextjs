import { Hytext } from "../../core/hytext.js";

const app = new Hytext();

app.head({
    lang : "en",
    title : "Hello World Canvas",
    meta : {
        charset : "UTF-8"
    }
});

app.body(body => {
    const canvas = body.canvas({
        width : 500,
        height : 200
    });

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, 500, 200);

    ctx.fillStyle = "white";
    ctx.font = "32px sans-serif";
    ctx.fillText("Hello World", 150, 115);
});