# EN Simple Form

Making Engaging Networks forms simple by hiding some field blocks when a supporter is found.

## How to use

1. Add the project's JS file to your Engaging Networks Page Template or Donation Form.

```html
<script defer src="{MY_EN_URL}/en-simple-form.js"></script>
```

2. Then, you need to add a Code Block to your Engaging Networks form, creating the `enSimpleForm` variable. That variable will be used to define the fields that will be checked on the page load, and the containers that will be hidden when a supporter is found.

Example:

```javascript
var enSimpleForm = {
  fields: [
    "supporter.firstName",
    "supporter.lastName",
    "supporter.emailAddress",
  ],
  containers: [".en__donation--billing--info", ".rememberme-wrapper"],
};
```

In the example above, all elements with the class `en__donation--billing--info` and `rememberme-wrapper` will be hidden if the fields `supporter.firstName`, `supporter.lastName` and `supporter.emailAddress` have a value.

## CSS Classes

When adding the project's JS file to your Engaging Networks Page Template or Donation Form, you can add the following CSS classes to any element:

- `en-simple-form-on`: Will show the element only the supporter data was found (all fields are filled).
- `en-simple-form-off`: Will show the element only the supporter data was not found (at least one field is empty).

## Merge tags & link on en-simple-form-on

On the elements with the class `en-simple-form-on`, you can use merge tags with the supporter fields. For example, if you have a supporter with the first name "John", the following element will be rendered as "Givin as John":

```html
<h2 class="en-simple-form-on">Giving as {supporter.firstName}</h2>
```

You can also add a link to turn off the supporter data. For example, if you have a supporter with the first name "John", the following element will be rendered as "Givin as John (change)" and the link will be rendered as "change":

```html
<h2 class="en-simple-form-on">
  Giving as {supporter.firstName} (<a href="#">change</a>)
</h2>
```

When the link is clicked, the supporter data will be removed and the elements with the class `en-simple-form-on` will be hidden. The elements with the class `en-simple-form-off` will be shown.

## Development

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Add your changes to the `src` folder
4. Build the project

```bash
npm run build
```

5. Commit and push your changes
6. Publish the generated `dist/en-simple-form.js` file to your Engaging Networks account.
