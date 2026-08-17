import { renderer } from "./hytext/renderer.js"

export class Hytext {
    constructor() {
        this.renderer = new renderer();
        this.elements = this.renderer.elements;
    }

    head(config) {
        this.renderer.head(config);
    }

    body(callback) {
        const run = () => {
            if (typeof callback === "function") this.renderer.body(callback);
        };
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
        else run();
    }
}