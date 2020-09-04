# gatsby-plugin-transform-i18n-locales

## How to use

1. Add `gatsby-local-plugin-transform-i18n-locales` as a plugin entry inside `gatsby-config.js`.
1. Add a new entry for `gatsby-source-filesystem` inside `gatsby-config.js`. Point the `path` entry to a folder that contains your i18n locale files.

```js
plugins: [
  `gatsby-local-plugin-transform-i18n-locales`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `i18n-locales`,
      path: `${__dirname}/locales/`
    }
  }
]
```

## i18n locales format

Create a file per language locale inside your locales folder.

- `locales/en.json`
- `locales/de.json`
- ...

```js
{
  "namespace": {
    "someKey": "This is some value",
    "keyWithStringInterpolation": "This is a value with a variable of {{variable}}",
    "variable": 3
  },
  "anotherNamespace": {
    "someKey": "This is some key",
    "keyWithStringInterpolation": "This is a value with a variable of {{variable}}"
  }
}
```
