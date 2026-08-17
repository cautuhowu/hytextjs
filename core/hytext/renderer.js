import { elements } from "./elements.js";
import { css } from "./css.js";

export class renderer {
    constructor() {
        this.elements = new elements();
    }
    
    head(config) {
        if (!config) return;

        if (config.lang) document.documentElement.lang = config.lang;
        if (config.title) document.title = config.title;
        if (config.favicon) {
            const faviconUrl = config.favicon || "data:image/x-icon;,'";
            let link = document.querySelector("link[rel*='icon']") || document.createElement("link");

            link.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = faviconUrl;

            document.head.appendChild(link);
        }

        if (config.meta) {
            const metas = Array.isArray(config.meta) ? config.meta : [config.meta];

            metas.forEach(metaAttrs => {
                let meta = document.createElement("meta");

                for (let key in metaAttrs) meta.setAttribute(key, metaAttrs[key]);

                document.head.appendChild(meta);
            });
        }

        if (config.links) {
            const links = Array.isArray(config.links) ? config.links : [config.links];

            links.forEach(linkAttrs => {
                let link = document.createElement("link");

                for (let key in linkAttrs) link.setAttribute(key, linkAttrs[key]);

                document.head.appendChild(link);
            });
        }

        if (config.css) {
            let link = document.createElement("link");

            link.rel = "stylesheet";
            link.href = config.css;

            document.head.appendChild(link);
        }

        if (config.style && typeof config.style === "object") {
            const styleEl = document.createElement("style");

            styleEl.textContent = css(config.style);

            document.head.appendChild(styleEl);
        }
    }

    body(callback) {
        if (typeof callback === "function") {
            const createdElements = [];

            window.__HYTEXT_COLLECTOR__ = createdElements;

            callback(this.elements);
            window.__HYTEXT_COLLECTOR__ = null;
            
            createdElements.forEach(el => {
                if (el instanceof Node) document.body.appendChild(el);
            });
        }
    }
}