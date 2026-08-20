export class Elements {
    constructor() {
        return new Proxy(this, {
            get: (_, tag) => {
                return (attributes = {}, value) => {
                    const tagName = String(tag).replaceAll("_", "-");
                    const element = document.createElement(tagName);

                    if (attributes !== undefined) {
                        if (attributes === null || typeof attributes !== "object" || Array.isArray(attributes)) {
                            throw new TypeError("Element attributes must be an object.");
                        }
                    }

                    // Attributes
                    for (const [key, attribute] of Object.entries(attributes)) {
                        if (key.startsWith("on") && typeof attribute === "function") {
                            element.addEventListener(key.slice(2).toLowerCase(), attribute);
                        } else if (key === "style" && attribute !== null && typeof attribute === "object") {
                            Object.assign(element.style, attribute);
                        } else if (key in element) {
                            element[key] = attribute;
                        } else {
                            element.setAttribute(key, attribute);
                        }
                    }

                    // Text
                    if (typeof value === "string" || typeof value === "number") {
                        element.appendChild(document.createTextNode(String(value)));
                    }

                    // Container
                    else if (typeof value === "function") {
                        const previousCollector = window.__HYTEXT_COLLECTOR__;
                        const childElements = [];

                        window.__HYTEXT_COLLECTOR__ = childElements;

                        value(this);

                        window.__HYTEXT_COLLECTOR__ = previousCollector;

                        for (const child of childElements) {
                            if (child instanceof Node) {
                                element.appendChild(child);
                            }
                        }
                    }

                    if (window.__HYTEXT_COLLECTOR__) {
                        window.__HYTEXT_COLLECTOR__.push(element);
                    }

                    return element;
                };
            }
        });
    }
}