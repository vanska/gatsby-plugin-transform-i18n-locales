# gatsby-plugin-transform-i18n-locales

Creates GraphQL nodes from i18n locale files. Uses `gatsby-source-filesystem` to enable HMR for development.

## How to use

1. Add `gatsby-local-plugin-transform-i18n-locales` as a plugin entry inside `gatsby-config.js`.
1. Add a new entry for `gatsby-source-filesystem` inside `gatsby-config.js`. Point the `path` entry to a folder that contains your i18n locale files.
1. Query nodes from Gatsby pages.
1. You can either manually enter language per page query or create pages programatically with Gatsby's `createPages` API and pass a `lang` key for `pageContext` that you can then use to query the correct locale for the current page.

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

## Querying locale data from Gatsby pages

```js
export const TranslationsQuery = graphql`
  query($lang: String!, $namespaces: [String!]) {
    i18n: allI18NNamespaces(
      filter: { lang: { eq: $lang }, namespace: { in: $namespaces } }
    ) {
      nodes {
        namespace
        allTranslations
      }
    }
    i18nAdditions: allI18NNamespaces(
      filter: {
        lang: { eq: $lang }
        # Query additional translation strings here
        namespace: { in: ["workday-services", "pre-deployment"] }
      }
    ) {
      nodes {
        namespace
        singleTranslations {
          title
        }
      }
    }
    i18nStatic: allI18NNamespaces(
      filter: { namespace: { in: ["common", "privacy-notice"] } }
    ) {
      nodes {
        lang
        namespace
        allTranslations
      }
    }
  }
`
```
