export function css(styleObj) {
    let cssString = "";

    for (const [selector, rules] of Object.entries(styleObj)) {
        cssString += `${selector} {\n`;

        for (const [property, value] of Object.entries(rules)) {
            const cssProperty = property.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
            cssString += `    ${cssProperty}: ${value};\n`;
        }
        cssString += "}\n";
    }

    return cssString;
}