import { Configuration } from "./hytext/configuration.js";
import { Elements } from "./hytext/elements.js";

export class Hytext {
    #bodyConfigure = false;

    constructor() {
        this.configuration = new Configuration();
        this.elements = new Elements();
        this._body = null;
    }

    head(config) {
        this.configuration.head(config);
    }

    body(callback) {
        if (this.#bodyConfigure) {
            throw new Error("The document body has already been configured.");
        }
        if (typeof callback !== "function") {
            throw new TypeError("The body callback must be a function.");
        }
        const createdElements = [];
        window.__HYTEXT_COLLECTOR__ = createdElements;
        
        this.#bodyConfigure = true;

        callback(this.elements);

        window.__HYTEXT_COLLECTOR__ = null;

        createdElements.forEach(element => {
            if (element instanceof Node) {
                document.body.appendChild(element);
            }
        });
    }
}