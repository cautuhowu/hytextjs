# API Reference For Hytext.js

## **> `new Hytext()`**

Creates a new Hytext application instance.

## **> `Hytext.head(config)`**

Configures the document `<head>`.

- **Parameters:**
    - `config` (*Object*) - Head configuration
- **Returns:** *`undefined`*

**Supported properties:**

| Property | Type | Description |
|---|---|---|
| `lang` | `String` | 	Sets the document language. |
| `title` | `String` | Sets the document title. |
| `meta` | `Object` | 	Defines `<meta>` elements. |
| `style` | `Object` | Defines inline styles. |
| `links` | `Object` | Defines `<link>` elements. |
| `css` | `String \| String[]` | Loads external stylesheets. |
| `favicon` | `String` | Sets the favicon URL. |
| `base` | `String` | 	Sets the document base URL. |

### **`[!]` Recommendation**
For styling, it is recommended to use an external CSS file. Hytext.js's current styling features do not yet support all CSS features available in native CSS.

### **Meta configuration:**

- meta uses the object key as the attribute name.

```js
const app = new Hytext();

app.head({
    lang: "en",
    title: "Hytext",
    meta: {
        "charset": "UTF-8"
    }
});
```

This produces:

```html
<meta charset="UTF-8">
```

---

- For attributes that require additional attributes, use **`_`** as the primary value.

```js
const app = new Hytext();

app.head({
    lang: "en",
    title: "Hytext",
    meta: {
        "name": {
            _: "description",
            "content": "Hytext application"
        }
    }
});
```
This produces:

```html
<meta name="description" content="Hytext application">
```

### **Notes**

- `head()` can only be configured once.

- Calling `head()` more than once throws an Error.

- An invalid configuration throws a TypeError.

***

## **> `Hytext.body(callback)`**

Configures the document `<body>` by executing a callback that creates and collects Hytext elements.

- **Parameters:**
    - `callback` (*Function*) - A function that receives an *Elements* instance and defines the contents of the document body.
- **Returns:** *`undefined`*

## **> `Hytext.Elements.[tag](attributes, value)`**

Creates an HTML element using a dynamic tag name.

The **[tag]** syntax represents any valid HTML element name. Underscores in the tag name are converted to hyphens, allowing custom element and hyphenated tag names to be created.

- **Parameters:**
    - `attributes` (*Object*) - Element attributes, properties, event handlers or styles.
    - `value` ( *String* | *Number* | *Function* ) - The element content.
- **Returns:** *`HTMLElement`*

### **Attributes**

Attributes are passed as an object.

```js
body.div({
    "id" : "app",
    "className" : "container"
}, "Hello") ;
```

Properties that exist on the DOM element are assigned directly. Otherwise, the value is set using  *`setAttribute()`*

```html
<div id="app" class="container">Hello</div>
```

#### **Event Handlers**
Attributes whose names start with *`on`* and whose values are functions are registered as DOM event listeners.

The *`on`* prefix is removed and the remaining event name is converted to lowercase.

```html
<button onclick="console.log('Clicked');">Click me</button>
```

### **Text Content**

A *`String`* or *`Number`* value is converted to text content.

```js
body.h1({}, "Hello");
body.p({}, 123);
```

This produces:

```html
<h1>Hello</h1>
<p>123</p>
```

#### **Nested Elements**

A function value creates a container for child elements.

This function receives the same Elements instance used by the parent.

```js
body.div({}, body => {
    body.h1({}, "Title");
    body.p({}, "Content");
});
```

This produces:

```html
<div>
    <h1>Title</h1>
    <p>Content</p>
</div>
```

#### **Custom And Hyphenated Elements**

Underscores in a tag name are converted to hyphens.

```js
body.my_component({}, "Hello");
```

This produces:
```html
<my-component>Hello</my-component>
```

### **Notes**
- `attributes` must be an object when provided.

- `null`, arrays and primitive values are invalid for `attributes`.

- `value` may be a `String`, `Number` or `Function`.

- Elements created inside a `body()` callback are automatically collected and appended to the document body.

- Elements created inside a container function are automatically appended to their parent element.

- The generated element is returned by the tag function.