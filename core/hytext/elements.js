export class elements {
    constructor() {
        return new Proxy(this, {
            get(_, prop) {
                return (attributes = {}, children = []) => {
                    const ele = document.createElement(prop);

                    if (window.__HYTEXT_COLLECTOR__) window.__HYTEXT_COLLECTOR__.push(ele);

                    for (let key in attributes) {
                        const val = attributes[key];

                        if (key === "className") ele.className = val;
                        else if (key === "content") ele.textContent = val;
                        else if (key.startsWith("on") && typeof val === "function") ele.addEventListener(key.slice(2).toLowerCase(), val);
                        else if (key === "style" && typeof val === "object") Object.assign(ele.style, val);
                        else if (key in ele) ele[key] = val;
                        else ele.setAttribute(key, val);
                    }

                    const childList = Array.isArray(children) ? children : [children];

                    childList.forEach(child => {
                        if (child instanceof Node) ele.appendChild(child);
                        else if (typeof child === "string" || typeof child === "number") ele.appendChild(document.createTextNode(child));
                    });

                    Object.defineProperty(ele, "content", {
                        get() { return ele.textContent; },
                        set(value) { ele.textContent = value; },
                        configurable: true,
                        enumerable: true
                    });

                    return ele;
                };
            }
        });
    }
}