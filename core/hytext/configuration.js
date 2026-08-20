import { stylesheet } from "./css.js";

export class Configuration {
    constructor() {
        this._head = null;
    }

    head(config) {
        if (this._head !== null) throw new Error("The document head has already been configured.");
        if (config === null || typeof config !== "object" || Array.isArray(config)) throw new TypeError("The head configuration must be an object.");

        this._head = config;
        this.#applyHeadConfig(config);
    }

    #applyHeadConfig(config) {
        if (config.lang !== undefined) document.documentElement.lang = config.lang;
        if (config.title !== undefined) document.title = config.title;
        if (config.meta !== undefined) this.#appendMetaElements(config.meta);
        if (config.favicon !== undefined) this.#appendFaviconElement(config.favicon);
        if (config.links !== undefined) this.#appendLinkElements(config.links);
        if (config.css !== undefined) this.#appendStylesheetElements(config.css);
        if (config.base !== undefined) this.#appendBaseElement(config.base);

        // NOTE: Styles may support animations, transitions, and more in the future.
        if (config.style && typeof config.style === "object") this.#appendStyleElement(config.style);
    }

    #appendMetaElements(metaCfg) {
        for (const [attribute, value] of Object.entries(metaCfg)) {
            const metaElement = document.createElement("meta");

            if (value !== null && typeof value === "object") {

                // "_" represents the value of the main meta attribute.
                if (value._ === undefined) {
                    throw new Error(`Undefined value of ${attribute}`);
                }

                metaElement.setAttribute(attribute, value._);

                for (const [key, content] of Object.entries(value)) {
                    if (key !== "_") {
                        metaElement.setAttribute(key, content);
                    }
                } 
            } else {
                metaElement.setAttribute(attribute, value);
            }

            document.head.appendChild(metaElement);
        }
    }

    #appendLinkElement(rel, href) {
        const linkElement = document.createElement("link");

        [linkElement.rel, linkElement.href] = [rel, href];

        document.head.appendChild(linkElement);
    }

    #appendLinkElements(linkCfg) {
        for (const [rel, value] of Object.entries(linkCfg)) {
            const linkElement = document.createElement("link");
    
            linkElement.setAttribute("rel", rel);
    
            if (value !== null && typeof value === "object") {
                for (const [key, attribute] of Object.entries(value)) {
                    linkElement.setAttribute(key, attribute);
                }
            } else {
                linkElement.setAttribute("href", value);
            }
    
            document.head.appendChild(linkElement);
        }
    }

    #appendFaviconElement(url) {
        this.#appendLinkElement("icon", url);
    }

    #appendStylesheetElements(cssCfg) {
        const stylesheetFiles = Array.isArray(cssCfg) ? cssCfg : [cssCfg];

        for (const stylesheetFile of stylesheetFiles) {
            this.#appendLinkElement("stylesheet", stylesheetFile);
        }
    }

    #appendBaseElement(href) {
        const baseElement = document.createElement("base");

        baseElement.href = href;

        document.head.appendChild(baseElement);
    }

    #appendStyleElement(styleCfg) {
        const styleElement = document.createElement("style");

        styleElement.textContent = stylesheet(styleCfg);

        document.head.appendChild(styleElement);
    }
}