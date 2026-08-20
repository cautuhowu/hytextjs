export function stylesheet(styles) {
    let cssText = "";

    for (const [selector, rules] of Object.entries(styles)) {
        cssText += `${selector} {\n`;

        for (const [property, value] of Object.entries(rules)) {
            const cssProperty = property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
            cssText += `    ${cssProperty}: ${value};\n`;
        }
        cssText += "}\n";
    }

    return cssText;
}